const experienceData = [
	{
		name: "Amazon | AGI Team",
		timeline: "May 2024 - August 2024",
		description: "Software Development Engineer Intern",
		logo: "images/amazon.png",
		image: "images/experienceCards/bellevue2.png",
		type: "internship",
		tags: ["CloudFormation", "AWS", "NodeJS", "Bash", "Lambda", "EC2"],
	},
	{
		name: "Amazon | Alexa AI Team",
		timeline: "June 2023 - August 2023",
		description: "Software Development Engineer Intern",
		shortDescription:
			"Created react-based app to collect audio data from users",
		logo: "images/amazon.png",
		image: "images/experienceCards/bellevue.jpg",
		type: "internship",
		tags: ["CloudFormation", "AWS", "NodeJS", "Bash", "Lambda", "EC2"],
	},
	{
		name: "ShellHacks Hackathon",
		timeline: "September 2023",
		logo: "images/sightplan.png",
		image: "images/experienceCards/shellHacks.webp",
		type: "competition",
	},
	{
		name: "SightPlan",
		timeline: "October 2022 - May 2023",
		description: "IOS Development Intern",
		image: "images/experienceCards/downtownOrlando.jpeg",
		type: "internship",
		tags: ["Swift", "AWS", "xCode", "objectiveC", "swiftui"],
	},
	{
		name: "KnightHacks Project Competition",
		timeline: "November 2022",
		description: "2nd Place Winners",
		image: "images/experienceCards/knightHacks.jpeg",
		type: "competition",
	},
	{
		name: "GMTK Game Jam",
		timeline: "July 2022",
		image: "images/experienceCards/gmtk.jpg",
		type: "competition",
	},
	{
		name: "Amazon | Astro Team",
		timeline: "June 2022 - August 2022",
		description: "Software Development Engineer Intern",
		image: "images/experienceCards/spheres.jpeg",
		type: "internship",
		tags: ["React", "AWS"],
	},
	{
		name: "Game Dev Knights Game Jam",
		timeline: "October 2021",
		type: "competition",
		image: "images/experienceCards/gameDevKnights.webp",
	},
	{
		name: "UCF",
		timeline: "Fall 2021 - Fall 2023",
		description: "College Of Engineering And Computer Science",
		logo: "images/amazon.png",
		type: "education",
		image: "images/experienceCards/reflectionPond.jpeg",
	},
	{
		name: "Blueprint Hackathon",
		timeline: "February 2021",
		type: "competition",
		image: "images/experienceCards/blueprint.jpg",
	},
	{
		name: "Palm Beach Tech Hackathon",
		timeline: "October 2020",
		type: "competition",
		image: "images/experienceCards/palmBeachTech.png",
	},
	{
		name: "Suncoast High School",
		timeline: "Fall 2017 - Spring 2021",
		description: "MSE and CS Programs",
		logo: "images/amazon.png",
		type: "education",
		image: "images/experienceCards/suncoastCampus.jpg",
	},
];

var experienceTypes = [];

var selectedExperienceTypes = [];

// Creates a card for each experience in the experienceData array and appends it to #experiencesContainer
function generateExperienceCard(cardData) {
	const card = $("<div>").addClass("experienceCard");
	const cardImage = $("<img>")
		.attr("src", cardData.image)
		.addClass("experienceCardImage");
	const cardContent = $("<div>").addClass("experienceCardContent");
	const cardTitle = $("<h3>")
		.text(cardData.name)
		.addClass("experienceCardTitle");
	const cardDescription = $("<p>")
		.text(cardData.description)
		.addClass("experienceCardDescription");

	cardContent.append(cardTitle);

	if (cardData.description) {
		cardContent.append(cardDescription);
	}

	if (cardData.tags) {
		const cardTags = $("<div>").addClass("experienceCardTags");
		cardData.tags.forEach((tag) => {
			const tagElement = $("<span>").text(tag).addClass("experienceCardTag");
			cardTags.append(tagElement);
		});
		cardContent.append(cardTags);
	}

	var cardType = $("<div>").addClass("experienceCardType");
	cardType.text(formatExperienceTypeText(cardData.type));

	card.append(cardImage, cardContent, cardType);

	// If the experience type is not already in the experienceTypes array, add it
	if (!experienceTypes.includes(cardData.type)) {
		experienceTypes.push(cardData.type);
	}

	return card;
}

function formatExperienceTypeText(type) {
	return type
		.toLowerCase()
		.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

function generateExperienceRow(experienceData) {
	const row = $("<div>").addClass("experienceRow").addClass("shown");
	// add the date range to the row
	const date = $("<div>").addClass("experienceDate");
	date.text(experienceData.timeline);
	row.append(date);

	date.text(experienceData.timeline);
	const card = generateExperienceCard(experienceData);

	const cardContainer = $("<div>").addClass("experienceCardContainer");
	cardContainer.append(card);

	row.append(date, cardContainer);

	return row;
}

function experienceFilter() {
	const $experienceCards = $(".experienceCard");
	$experienceCards.each(function () {
		const $experienceCard = $(this);
		const experienceType = $experienceCard
			.find(".experienceCardType")
			.text()
			.toLowerCase();
		const match =
			selectedExperienceTypes.includes(experienceType) ||
			selectedExperienceTypes.length === 0;
		if (match) {
			$experienceCard.parent().parent().fadeIn(300);
			$experienceCard.parent().parent().addClass("shown");
		} else {
			$experienceCard.parent().parent().fadeOut(300);
			$experienceCard.parent().parent().removeClass("shown");
		}
	});

	updateRowPositions();
}

function toggleExperienceType(type) {
	if (selectedExperienceTypes.includes(type)) {
		selectedExperienceTypes.splice(selectedExperienceTypes.indexOf(type), 1);
		$("." + type).removeClass("selected");
	} else {
		selectedExperienceTypes = [];
		selectedExperienceTypes.push(type);
		$(".experienceType.selected").removeClass("selected");
		$("." + type).addClass("selected");
	}
	experienceFilter();
}

function generateExperienceTypeFilters() {
	const experienceTypesContainer = $("#experienceTypes");
	experienceTypesContainer.empty();
	experienceTypes.forEach((type) => {
		var countOfType = 0;
		$(".experienceCardType").each(function () {
			if ($(this).text().toLowerCase() === type) {
				countOfType++;
			}
		});
		const typeElement = $("<span>")
			.text(formatExperienceTypeText(type) + " (" + countOfType + ")")
			.addClass("experienceType")
			.addClass(type)

			.click(() => toggleExperienceType(type));
		experienceTypesContainer.append(typeElement);
	});
}

const $experiencesContainer = $("#experiencesContainer");
experienceData.forEach((experience) => {
	const row = generateExperienceRow(experience);
	// Add a css variable for index to the row
	row.css("--index", experienceData.indexOf(experience));
	$experiencesContainer.append(row);
	generateExperienceTypeFilters();
	updateRowPositions();
});

function updateRowPositions() {
	$(".experienceRow.shown").each(function (index) {
		if (index % 2 === 0) {
			// Checks if the index is even, which is odd in 0-based index (0, 2, 4...)
			$(this).addClass("odd-shown");
		} else {
			$(this).removeClass("odd-shown");
		}
	});
}
toggleExperienceType("internship");
// MARK: - Work Experience

const workExperienceData = [
	{
		name: "Amazon | AGI Team",
		timeline: "May 2024 - August 2024",
		description: "Software Development Engineer Intern",
		logo: "images/amazon.png",
		image: "images/experienceCards/bellevue2.png",
		type: "internship",
		tags: ["CloudFormation", "AWS", "NodeJS", "Bash", "Lambda", "EC2"],
	},
	{
		name: "Amazon | Alexa AI Team",
		timeline: "June 2023 - August 2023",
		description: "Software Development Engineer Intern",
		shortDescription:
			"Created react-based app to collect audio data from users",
		logo: "images/amazon.png",
		image: "images/experienceCards/bellevue.jpg",
		type: "internship",
		tags: ["CloudFormation", "AWS", "NodeJS", "Bash", "Lambda", "EC2"],
	},
	{
		name: "SightPlan",
		timeline: "October 2022 - May 2023",
		description: "IOS Development Intern",
		image: "images/experienceCards/downtownOrlando.jpeg",
		type: "internship",
		tags: ["Swift", "AWS", "xCode", "objectiveC", "swiftui"],
	},
	{
		name: "Amazon | Astro Team",
		timeline: "June 2022 - August 2022",
		description: "Software Development Engineer Intern",
		image: "images/experienceCards/spheres.jpeg",
		type: "internship",
		tags: ["React", "AWS"],
	},
];

// function populateWorkExperience() {
// 	const $workExperienceContainer = $("#workExperienceContainer");
// 	workExperienceData.forEach((experience) => {
// 		const card = generateExperienceCard(experience);
// 		$workExperienceContainer.append(card);
// 	});
// }

// // populateWorkExperience();

// const $workExperience = $("#workExperienceContainer");

// $(document).on("scroll", function () {
// 	// Get the position of #workExperience and see how close it is vertically to the center of the viewport. Then, create a percantage (where 0% is at center), and add this as a variable to the css
// 	const workExperiencePosition = $workExperience.offset().top;
// 	const workExperienceHeight = $workExperience.height();
// 	const windowHeight = $(window).height();
// 	const scrollPosition = $(document).scrollTop();
// 	const scrollCenter = scrollPosition + windowHeight / 2;
// 	const workExperienceCenter =
// 		workExperiencePosition + workExperienceHeight / 2;
// 	const distance = scrollCenter - workExperienceCenter;
// 	const percentage = (distance / windowHeight) * 100;
// 	$workExperience.css("--scroll-percentage", percentage);
// });
