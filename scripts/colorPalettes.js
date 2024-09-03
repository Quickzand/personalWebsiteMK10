function toggleColorPalettes() {
	$("#colorPalettes").toggleClass("open");
}

const colorPalettes = [
	{
		name: "Default",
		colors: {
			mainBackgroundColor: "#121212",
			outsetBackgroundColor: "#222222",
			secondaryBackgroundColor: "#010101",
			firstAccentColor: "#23d183",
			secondAccentColor: "#06ace8",
			mainFontColor: "#fdfdfd",
			mainTextShadowColor: "rgba(0, 0, 0, 0.5)",
			mainGlassyBackgroundColor: "rgba(18, 18, 18, 0.5)",
		},
		previewColors: ["#23d183", "#06ace8"],
	},
	{
		name: "Glow Wave",
		colors: {
			mainBackgroundColor: "#101010",
			outsetBackgroundColor: "#111111",
			secondaryBackgroundColor: "#010101",
			firstAccentColor: "#FF2F2F",
			secondAccentColor: "#06ace8",
			mainFontColor: "#fdfdfd",
			mainTextShadowColor: "rgba(0, 0, 0, 0.5)",
			mainGlassyBackgroundColor: "rgba(0, 0, 0, 0.5)",
		},
		previewColors: ["#FF2F2F", "#06ace8"],
	},
	{
		name: "Ocean Breeze",
		colors: {
			mainBackgroundColor: "#1e3a5f",
			outsetBackgroundColor: "#244e74",
			secondaryBackgroundColor: "#122942",
			firstAccentColor: "#20b2aa",
			secondAccentColor: "#ffdd59",
			mainFontColor: "#e0f7fa",
			mainTextShadowColor: "rgba(0, 0, 0, 0.3)",
			mainGlassyBackgroundColor: "rgba(30, 58, 95, 0.5)",
		},
		previewColors: ["#20b2aa", "#ffdd59"],
	},
	{
		name: "Sunset Glow",
		colors: {
			mainBackgroundColor: "#3e1f47",
			outsetBackgroundColor: "#4c2e59",
			secondaryBackgroundColor: "#2a1431",
			firstAccentColor: "#ff8c42",
			secondAccentColor: "#ffd700",
			mainFontColor: "#ffefd5",
			mainTextShadowColor: "rgba(0, 0, 0, 0.4)",
			mainGlassyBackgroundColor: "rgba(62, 31, 71, 0.5)",
		},
		previewColors: ["#ff8c42", "#ffd700"],
	},
	{
		name: "Forest Mist",
		colors: {
			mainBackgroundColor: "#2b3a34",
			outsetBackgroundColor: "#374f45",
			secondaryBackgroundColor: "#1c2520",
			firstAccentColor: "#76c7c0",
			secondAccentColor: "#8fbc8f",
			mainFontColor: "#e8f5e9",
			mainTextShadowColor: "rgba(0, 0, 0, 0.3)",
			mainGlassyBackgroundColor: "rgba(43, 58, 52, 0.5)",
		},
		previewColors: ["#76c7c0", "#8fbc8f"],
	},
];

var colorPalettesList = $("#colorPalettesList");
function buildColorPalettes() {
	colorPalettesList.empty();
	var index = 0;
	colorPalettes.forEach((palette) => {
		var paletteElement = $("<div></div>");
		paletteElement.addClass("colorPalette");
		paletteElement.css("--preview-color-1", palette.previewColors[0]);
		paletteElement.css("--preview-color-2", palette.previewColors[1]);
		paletteElement.attr("data-palette-name", palette.name);
		paletteElement.click(() => {
			applyColorPalette(palette);
		});
		paletteElement.css("--index", index);
		index++;
		colorPalettesList.append(paletteElement);
	});

	// set the color palette to the one stored in the cookie
	var colorPalette = $.cookie("colorPalette");
	if (colorPalette) {
		applyColorPalette(
			colorPalettes.find((palette) => palette.name == colorPalette)
		);
	} else {
		applyColorPalette(colorPalettes[0]);
	}
}

function applyColorPalette(palette) {
	var root = $(":root");
	root.css("--main-background-color", palette.colors.mainBackgroundColor);
	root.css("--outset-background-color", palette.colors.outsetBackgroundColor);
	root.css(
		"--secondary-background-color",
		palette.colors.secondaryBackgroundColor
	);
	root.css("--first-accent-color", palette.colors.firstAccentColor);
	root.css("--second-accent-color", palette.colors.secondAccentColor);
	root.css("--main-font-color", palette.colors.mainFontColor);
	root.css("--main-text-shadow-color", palette.colors.mainTextShadowColor);
	root.css(
		"--main-glassy-background-color",
		palette.colors.mainGlassyBackgroundColor
	);

	$(".colorPalette").removeClass("active");

	// find the color palette element with the same name as the palette
	// and add the active class to it
	$(".colorPalette").each((index, element) => {
		if ($(element).attr("data-palette-name") == palette.name) {
			$(element).addClass("active");
		}
	});

	// set the color pallette cookie
	$.cookie("colorPalette", palette.name, { expires: 365 });
}

buildColorPalettes();
