var githubSVG =
	'<svg viewBox="0 0 1024 1024"   xmlns="http://www.w3.org/2000/svg" class="contactIcon" id="Github"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" /></svg>';

var collaboratorSVG =
	'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/></svg>';

var devpostSVG =
	'<svg viewBox="0 0 280 242" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path id="Logo" fill-rule="evenodd"  d="M 70.099609 242 L 0 120.699219 L 70.099609 -0.699219 L 210.199219 -0.699219 L 280.300781 120.699219 L 210.199219 242 L 70.099609 242 Z M 88.699219 194.300781 L 132.699219 194.300781 C 170.599197 194.300781 208.099609 172.499161 208.099609 120.699219 C 208.099609 66.799271 176.900726 47 134.800781 47 L 88.699219 47 L 88.699219 194.300781 Z M 118.099609 165.699219 L 118.099609 75.599609 L 133.699219 75.599609 C 164.899185 75.599609 177.799225 90.59964 177.699219 120.599609 C 177.699219 147.599579 163.499573 165.699219 132.599609 165.699219 L 118.099609 165.699219 Z"/></svg>';

var documentSVG =
	'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"/></svg>';

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
	setTimeout(resizeImages, 750);
	setTimeout(setCorrectImageParagraphSectionMaxHeight, 750);
}

function projectImageClickFunctionality(imgElement) {
	// If it is 100px from the center, scroll to the center of the image
	if (
		Math.abs(
			imgElement.offset().left + imgElement.width() / 2 - $(window).width() / 2
		) > 100
	) {
		// Scroll to the element with a 300ms animation
		$("#projectCarouselPhotos").animate(
			{
				scrollLeft:
					$("#projectCarouselPhotos").scrollLeft() +
					imgElement.offset().left +
					imgElement.width() / 2 -
					$(window).width() / 2,
			},
			300
		);
	} else {
		// Open the image in a modal
		openImageModal(imgElement.attr("src"));
	}
}

function populateProjectScreen(projectInfo) {
	$("#projectName").text(projectInfo.name);
	var projectCarouselPhotos = $("#projectCarouselPhotos");
	projectCarouselPhotos.empty();
	console.log(projectInfo);
	projectInfo.images.forEach((image) => {
		var carouselImage = $("<img>")
			.attr("src", image)
			.attr("alt", projectInfo.name + " image")
			.on("click", function () {
				projectImageClickFunctionality($(this));
			});
		projectCarouselPhotos.append(carouselImage);
	});

	$("#projectSections").empty();

	for (
		var sectionIndex = 0;
		sectionIndex < projectInfo.sections.length;
		sectionIndex++
	) {
		var section = projectInfo.sections[sectionIndex];
		switch (section.type) {
			case "image":
				createImageSection(section, sectionIndex);
				break;
			case "imageParagraph":
				createImageParagraphSection(section, sectionIndex);
				break;
			case "code":
				createCodeSection(section, sectionIndex);
				break;
			case "header":
				createHeaderSection(section, sectionIndex);
				break;
			case "collaborators":
				createCollaboratorsSection(section, sectionIndex);
				break;
			case "paragraph":
			default:
				createParagraphSection(section, sectionIndex);
				break;
		}
	}

	createProjectLinks(projectInfo.links);
}

function createImageParagraphSection(section, sectionIndex) {
	var sectionElement = $("<div>")
		.addClass("projectSection")
		.addClass("imageParagraphSection");

	var sectionTitle = $("<h3>").text(section.title);

	var sectionContent = $("<p>").html(section.content);
	if (section.title) {
		sectionContent.prepend(sectionTitle);
	}
	var sectionImage = $("<img>")
		.attr("src", section.imgSrc)
		.on("click", function () {
			openImageModal($(this).attr("src"));
		});
	sectionElement.append(sectionContent, sectionImage);
	sectionElement.addClass(
		sectionIndex % 2 == 0 ? "leftSideSpread" : "rightSideSpread"
	);

	if (section.reverse == "true") {
		sectionElement.addClass("reverse");
	}

	$("#projectSections").append(sectionElement);
}

function createCollaboratorsSection(section, sectionIndex) {
	var sectionElement = $("<div>")
		.addClass("projectSection")
		.addClass("collaboratorsSection");
	var sectionContent = $("<div>").addClass("collaboratorsList");
	section.collaborators.forEach((collaborator) => {
		var collaboratorElement = $("<a>")
			.addClass("collaborator")
			.attr("href", collaborator.href);
		var collaboratorImage = $("<img>").attr("src", collaborator.imgSrc);
		var collaboratorName = $("<h4>").text(collaborator.name);

		collaboratorElement.append(collaboratorImage, collaboratorName);
		sectionContent.append(collaboratorElement);
	});
	sectionElement.append(sectionContent);
	sectionElement.addClass(
		sectionIndex % 2 == 0 ? "leftSideSpread" : "rightSideSpread"
	);

	var sectionTitle = $("<h3>").text("Collaborators").addClass("projectSection");

	$("#projectSections").append(sectionTitle, sectionElement);
}

function createProjectLinks(links) {
	var linksList = $("#projectLinks");
	linksList.empty();
	links = links || [];
	links.forEach((link) => {
		var linkElement = $("<a>").attr("href", link.href).addClass("projectLink");

		switch (link.type) {
			case "github":
				linkElement.text(link.name);
				linkElement.prepend(githubSVG);
				break;
			case "devpost":
				linkElement.text("Devpost");
				linkElement.prepend(devpostSVG);
				break;
			case "document":
				linkElement.prepend(documentSVG);
				break;
			case "website":
				linkElement.text("Website");
				linkElement.prepend(documentSVG);
				break;
			default:
				linkElement.text(link.name);
				linkElement.prepend(documentSVG);
				break;
		}
		linksList.append(linkElement);
	});
}

function createParagraphSection(section, sectionIndex) {
	var sectionElement = $("<div>").addClass("projectSection");
	var sectionTitle = $("<h3>").text(section.title);
	var sectionContent = $("<p>").html(section.content);
	sectionElement.append(sectionTitle, sectionContent);
	sectionElement.addClass(
		sectionIndex % 2 == 0 ? "leftSideSpread" : "rightSideSpread"
	);
	$("#projectSections").append(sectionElement);
}

function createHeaderSection(section, sectionIndex) {
	var sectionElement = $("<h3>").addClass("projectSection");
	sectionElement.text(section.content);
	sectionElement.addClass(
		sectionIndex % 2 == 0 ? "leftSideSpread" : "rightSideSpread"
	);
	$("#projectSections").append(sectionElement);
}

$("#projectCarouselPhotos").on("scroll", resizeImages);

function resizeImages() {
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
	setCorrectImageParagraphSectionMaxHeight();
});

function setCorrectImageParagraphSectionMaxHeight() {
	$(".projectSection.imageParagraphSection img").each(function () {
		$(this).css(
			"--text-height",
			$(this).parent().children("p").height() + "px"
		);
	});
}
