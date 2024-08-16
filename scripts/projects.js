// Load in projects from getProjectCardInfo.php
var projects = [];

var searchableTags = [];

var selectedTags = [];

var isProjectScreenOpen = false;

$.ajax({
	url: "projectInfo.json",
	type: "GET",
	success: function (data) {
		console.log("SUCCESS: ", data);
		// Convert from object to array
		projects = Object.values(data);
		projectsConstructor(projects);
	},
	error: function (data) {
		console.log("ERROR: ", data);
	},
});

function projectsConstructor(projects) {
	var projectsContainer = $("#projectsContainer");
	projectsContainer.empty();
	for (var i = 0; i < projects.length; i++) {
		if (!projects[i]) continue;
		var projectPreview = projectPreviewBuilder(projects[i]);
		projectPreview.css("--index", i);
		projectsContainer.append(projectPreview);
	}
}

function updateSearchableTags() {
	// Put the tags in alphabetical order
	searchableTags.sort();
	var projectsTagsSelection = $("#projectsTagsSelection");
	projectsTagsSelection.empty();
	searchableTags.forEach(function (tag) {
		var tagElement = $("<div>").addClass("projectTag").text(tag);
		tagElement.addClass(generateTagClass(tag));
		tagElement.on("click", function () {
			toggleTag(tag);
		});
		projectsTagsSelection.append(tagElement);
	});
}

function toggleTag(tag) {
	if (selectedTags.includes(tag)) {
		selectedTags.splice(selectedTags.indexOf(tag), 1);
		$("." + generateTagClass(tag)).removeClass("selected");
	} else {
		selectedTags.push(tag);
		$("." + generateTagClass(tag)).addClass("selected");
	}
	projectsFilter();
}

function generateTagClass(tag) {
	return tag.toLowerCase().replaceAll(" ", "-").replaceAll(".", "") + "-tag";
}

function projectsFilter() {
	var projectsContainer = $("#projectsContainer");
	projectsContainer.children().each(function () {
		var projectPreview = $(this);
		var projectTags = projectPreview.data("projectTags");

		var match = selectedTags.every(function (tag) {
			return projectTags.includes(tag);
		});

		if (match) {
			projectPreview.fadeIn(300); // Animate show over 300 milliseconds
		} else {
			projectPreview.fadeOut(300); // Animate hide over 300 milliseconds
		}
	});
}

function projectPreviewBuilder(projectInfo) {
	if (!projectInfo) return;
	var projectPreview = $("<div>").addClass("projectPreview");
	var projectPreviewTopRow = $("<div>").addClass("projectPreviewTopRow");
	var projectPreviewImage = $("<img>")
		.attr("src", projectInfo.preview)
		.attr("alt", projectInfo.name + " preview image");
	var projectPreviewBody = $("<div>").addClass("projectPreviewBody");
	var projectPreviewName = $("<h3>")
		.text(projectInfo.name)
		.addClass("projectPreviewName");
	var projectPreviewDescription = $("<p>")
		.addClass("projectPreviewDescription")
		.text(projectInfo.sections[0].content);
	projectPreviewBody.append(projectPreviewName, projectPreviewDescription);
	projectPreviewTopRow.append(projectPreviewImage, projectPreviewBody);
	var projectPreviewTagContainer = $("<div>").addClass(
		"projectPreviewTagsContainer"
	);

	if (projectInfo.tags)
		projectInfo.tags.forEach(function (tag) {
			var projectPreviewTag = $("<div>").addClass("projectPreviewTag");
			projectPreviewTag.text(tag.name);
			if (tag.highlighted) {
				projectPreviewTag.addClass("highlighted");
			}

			projectPreviewTag.addClass(generateTagClass(tag.name));
			projectPreviewTagContainer.append(projectPreviewTag);
			if (!searchableTags.includes(tag.name)) {
				searchableTags.push(tag.name);
				updateSearchableTags();
			}
		});
	projectPreview.append(projectPreviewTopRow, projectPreviewTagContainer);
	// Add the data of tags to the projectPreview
	projectPreview.data(
		"projectTags",
		projectInfo.tags.map((tag) => tag.name)
	);
	projectPreview.attr("data-projectID", projectInfo.id);
	// Add a css variable called vertical-offset to the projectPreview which should be between -25 and 25 px randomly
	projectPreview.css(
		"--vertical-offset",
		Math.floor(Math.random() * 50) - 25 + "px"
	);

	projectPreview.on("click", () => {
		projectScreenOpen(projectInfo);
	});

	return projectPreview;
}

function projectScreenOpen(projectInfo) {
	populateProjectScreen(projectInfo);
	scrollTo(
		"#projects",
		() => {
			$("#projects").addClass("projectPreviewOpen");
			// Instnatly scroll to the top of the project screen
			$("#projectScreen").scrollTop(0);
			$("#projectScreen").addClass("open");
			$("#skills").addClass("hidden");
		},
		300
	);
	// Turn off scrolling on the body
	$("body").css("overflow", "hidden");
	isProjectScreenOpen = true;
}

function populateProjectScreen(projectInfo) {
	$("#projectName").text(projectInfo.name);
	var projectCarouselPhotos = $("#projectCarouselPhotos");
	projectCarouselPhotos.empty();
	console.log(projectInfo);
	projectInfo.images.forEach((image) => {
		var carouselImage = $("<img>")
			.attr("src", image)
			.attr("alt", projectInfo.name + " image");
		projectCarouselPhotos.append(carouselImage);
	});

	$("#projectSections").empty();

	for (var i = 0; i < projectInfo.sections.length; i++) {
		var section = projectInfo.sections[i];
		var sectionElement = $("<div>").addClass("projectSection");
		var sectionTitle = $("<h3>").text(section.title);
		var sectionContent = $("<p>").html(section.content);
		sectionElement.append(sectionTitle, sectionContent);
		sectionElement.addClass(i % 2 == 0 ? "leftSideSpread" : "rightSideSpread");
		$("#projectSections").append(sectionElement);
	}

	// Scroll to center of photos carousel after images are loaded
	$("#projectCarouselPhotos img").on("load", () => {
		$("#projectCarouselPhotos").scrollLeft(
			$("#projectCarouselPhotos").width() / 2
		);
	});

	// wait 0.5 seconds and resize images again
	setTimeout(function () {
		$("#projectCarouselPhotos").scrollLeft(
			$("#projectCarouselPhotos").width() / 2
		);
	}, 150);
}

$("#projectCarouselPhotos").on("scroll", resizeImages);

function resizeImages() {
	return;
	// Go through all images, depending on how far from the center is (center of the #projectScreen), give it a --distance variable that is between 0 and 1 (where 0 is the center and 1 is the edge on either side)
	$("#projectCarouselPhotos img").each(function () {
		var image = $(this);
		var distance = Math.abs(
			(image.offset().left + image.width() / 2 - $(window).width() / 2) /
				$(window).width()
		);
		image.css("--distance", distance);
	});
}
function projectScreenClose(callback) {
	$("#projects").removeClass("projectPreviewOpen");
	$("#projectScreen").removeClass("open");
	$("#skills").removeClass("hidden");
	// Turn scrolling back on
	$("body").css("overflow", "auto");
	isProjectScreenOpen = false;
	typeof callback === "function" ? callback() : null;
}

$("#projectClose").on("click", projectScreenClose);

// On window resize, if the project screen is open, scroll back to the top of the projects section
$(window).on("resize", function () {
	if (isProjectScreenOpen) {
		scrollTo("#projects", null, 0);
	}
});

// Project screen image carousel
