const missionStatement =
	"Hey, I'm Matthew! I am a Computer Science student at the University of Central Florida, with an extensive background in Fullstack Web Development. My goal as a Software Engineer is to create code with perspective and purpose - and to ultimately, make the world a more human friendly place. Here's how I've been working towards that goal:";

const gradientTexts = [
	"Fullstack Web Development",
	"Software Engineer",
	"Computer Science",
];
const normalCharacterDelay = 40;
const longCharacterDelay = 250;
const veryLongCharacterDelay = 500;
const longDelayCharacters = [".", "!", "?", ":", ";", ","];
const veryLongDelayCharacters = ["-"];

function getDelay(char) {
	if (veryLongDelayCharacters.includes(char)) {
		return veryLongCharacterDelay;
	} else if (longDelayCharacters.includes(char)) {
		return longCharacterDelay;
	} else {
		return normalCharacterDelay;
	}
}

let isTyping = true; // Global flag to control typing

function displayText($cursor, text, index = 0) {
	if (!isTyping || index >= text.length) {
		return; // Stop typing if isTyping is false or text is complete
	}

	let matchedPhrase = gradientTexts.find(
		(phrase) => text.substr(index, phrase.length) === phrase
	);
	if (matchedPhrase) {
		// Add each character of the gradient text with a delay
		for (let i = 0; i < matchedPhrase.length; i++) {
			setTimeout(() => {
				if (!isTyping) return; // Check flag before updating the DOM
				const charSpan = $("<span>")
					.addClass("gradientText")
					.text(matchedPhrase[i]);
				$cursor.before(charSpan);
			}, i * normalCharacterDelay);
		}
		setTimeout(
			() => displayText($cursor, text, index + matchedPhrase.length),
			matchedPhrase.length * normalCharacterDelay
		);
	} else {
		const charSpan = $("<span>").text(text[index]);
		$cursor.before(charSpan);
		setTimeout(
			() => displayText($cursor, text, index + 1),
			getDelay(text[index])
		);
	}
}

function stopTypingText() {
	isTyping = false; // Set the flag to false to stop any ongoing typing
	const $container = $("#missionStatementDisplay"); // Assuming the container's ID

	// Clear the entire contents of the container
	$container.empty();

	// Render the full mission statement with appropriate styling
	let renderedText = "";
	let lastIndex = 0;
	missionStatement.split("").forEach((char, index) => {
		let match = gradientTexts.find(
			(phrase) => missionStatement.substr(index, phrase.length) === phrase
		);
		if (match && index >= lastIndex) {
			if (index > lastIndex) {
				renderedText += missionStatement.substring(lastIndex, index);
			}
			renderedText += `<span class="gradientText">${match}</span>`;
			lastIndex = index + match.length;
		}
	});
	if (lastIndex < missionStatement.length) {
		renderedText += missionStatement.substr(lastIndex);
	}

	// Reinsert the cursor and the full mission statement
	$container.append(renderedText);
	$container.append('<span id="missionStatementCursor"></span>');
}

$(document).ready(function () {
	const $cursor = $("#missionStatementCursor");
	displayText($cursor, missionStatement);
});

$("#missionStatement").on("click", stopTypingText);

// After the user scrolls past the mission statement, stop typing and display the full text
$(window).scroll(function () {
	if ($(window).scrollTop() > $("#missionStatement").offset().top + 300) {
		stopTypingText();
	}
});

$("#missionStatementPlaceholder").text(missionStatement);
