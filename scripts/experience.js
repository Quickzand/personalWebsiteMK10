const experienceData = [
	{
		name: "Amazon",
		timeline: "June 2023 - August 2023",
		description: "Software Development Engineer Intern",
		shortDescription:
			"Created react-based app to collect audio data from users",
		logo: "images/amazon.png",
		image: "images/experienceCards/bellevue.jpg",

		tags: ["CloudFormation", "AWS", "NodeJS", "Bash", "Lambda", "EC2"],
	},
	{
		name: "SightPlan",
		timeline: "October 2022 - Present",
		description: "IOS Development Intern",
		logo: "images/sightplan.png",
		image: "images/experienceCards/downtownOrlando.jpeg",

		tags: ["Swift", "AWS", "xCode", "objectiveC", "swiftui"],
	},
	{
		name: "Amazon",
		timeline: "June 2022 - August 2022",
		description: "Software Development Engineer Intern",
		shortDescription:
			"Created react-based app to collect audio data from users",
		logo: "images/amazon.png",
		image: "images/experienceCards/spheres.jpeg",

		tags: ["React", "AWS"],
	},
];

// Creates a card for each experience in the experienceData array and appends it to #experiencesContainer
function generateExperienceCard(cardData) {
	const card = $("<div>").addClass("experienceCard");
	const cardImage = $("<img>")
		.attr("src", cardData.image)
		.addClass("aboutCardImage");
	const cardContent = $("<div>").addClass("experienceCardContent");
	const cardTitle = $("<h3>").text(cardData.name).addClass("aboutCardTitle");
	const cardTimeline = $("<p>")
		.text(cardData.timeline)
		.addClass("aboutCardSubtitle");
	const cardDescription = $("<p>")
		.text(cardData.description)
		.addClass("aboutCardDescription");
	const cardTags = $("<div>").addClass("aboutCardTags");

	cardData.tags.forEach((tag) => {
		const tagElement = $("<span>").text(tag).addClass("aboutCardTag");
		cardTags.append(tagElement);
	});

	cardContent.append(cardTitle, cardTimeline, cardDescription, cardTags);
	card.append(cardImage, cardContent);
	return card;
}

const $experiencesContainer = $("#experiencesContainer");
experienceData.forEach((experience) => {
	const card = generateExperienceCard(experience);
	$experiencesContainer.append(card);
});
