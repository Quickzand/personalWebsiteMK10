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
		name: "Light",
		colors: {
			mainBackgroundColor: "#f5f5f5",
			outsetBackgroundColor: "#e5e5e5",
			secondaryBackgroundColor: "#d5d5d5",
			firstAccentColor: "#23d183",
			secondAccentColor: "#06ace8",
			mainFontColor: "#121212",
			mainTextShadowColor: "rgba(255, 255, 255, 0.5)",
			mainGlassyBackgroundColor: "rgba(225, 225, 225, 0.25)",
		},
		previewColors: ["#23d183", "#f5f5f5"],
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
	{
		name: "Neon Night",
		colors: {
			mainBackgroundColor: "#0d0d0d",
			outsetBackgroundColor: "#1a1a1a",
			secondaryBackgroundColor: "#080808",
			firstAccentColor: "#39ff14",
			secondAccentColor: "#ff007f",
			mainFontColor: "#ffffff",
			mainTextShadowColor: "rgba(0, 0, 0, 0.7)",
			mainGlassyBackgroundColor: "rgba(13, 13, 13, 0.5)",
		},
		previewColors: ["#39ff14", "#ff007f"],
	},
	{
		name: "Vintage Chic",
		colors: {
			mainBackgroundColor: "#fcf4d9",
			outsetBackgroundColor: "#e8dcb9",
			secondaryBackgroundColor: "#d6c49b",
			firstAccentColor: "#b2967d",
			secondAccentColor: "#96715f",
			mainFontColor: "#50342c",
			mainTextShadowColor: "rgba(255, 255, 255, 0.6)",
			mainGlassyBackgroundColor: "rgba(252, 244, 217, 0.5)",
		},
		previewColors: ["#b2967d", "#96715f"],
	},
	{
		name: "Tech Blue",
		colors: {
			mainBackgroundColor: "#0a0f0d",
			outsetBackgroundColor: "#132327",
			secondaryBackgroundColor: "#253b3f",
			firstAccentColor: "#0078d7",
			secondAccentColor: "#30c7ec",
			mainFontColor: "#e1e1e1",
			mainTextShadowColor: "rgba(0, 0, 0, 0.4)",
			mainGlassyBackgroundColor: "rgba(10, 15, 13, 0.5)",
		},
		previewColors: ["#0078d7", "#30c7ec"],
	},
	{
		name: "Arctic White",
		colors: {
			mainBackgroundColor: "#ffffff",
			outsetBackgroundColor: "#f0f0f0",
			secondaryBackgroundColor: "#e0e0e0",
			firstAccentColor: "#a7d0e6",
			secondAccentColor: "#74a3c7",
			mainFontColor: "#333333",
			mainTextShadowColor: "rgba(0, 0, 0, 0.1)",
			mainGlassyBackgroundColor: "rgba(255, 255, 255, 0.4)",
		},
		previewColors: ["#a7d0e6", "#74a3c7"],
	},
	{
		name: "Desert Dusk",
		colors: {
			mainBackgroundColor: "#4e342e",
			outsetBackgroundColor: "#6d4c41",
			secondaryBackgroundColor: "#8d6e63",
			firstAccentColor: "#ffbb93",
			secondAccentColor: "#ffddc1",
			mainFontColor: "#fafafa",
			mainTextShadowColor: "rgba(0, 0, 0, 0.5)",
			mainGlassyBackgroundColor: "rgba(78, 52, 46, 0.5)",
		},
		previewColors: ["#ffbb93", "#ffddc1"],
	},
	{
		name: "Mystic Purple",
		colors: {
			mainBackgroundColor: "#1c1028",
			outsetBackgroundColor: "#2a1b3d",
			secondaryBackgroundColor: "#381f52",
			firstAccentColor: "#9457eb",
			secondAccentColor: "#ca8aff",
			mainFontColor: "#eaeaea",
			mainTextShadowColor: "rgba(0, 0, 0, 0.5)",
			mainGlassyBackgroundColor: "rgba(28, 16, 40, 0.5)",
		},
		previewColors: ["#9457eb", "#ca8aff"],
	},
	{
		name: "Herbal Green",
		colors: {
			mainBackgroundColor: "#162821",
			outsetBackgroundColor: "#224430",
			secondaryBackgroundColor: "#2f6039",
			firstAccentColor: "#4caf50",
			secondAccentColor: "#81c784",
			mainFontColor: "#e8f5e9",
			mainTextShadowColor: "rgba(0, 0, 0, 0.4)",
			mainGlassyBackgroundColor: "rgba(22, 40, 33, 0.5)",
		},
		previewColors: ["#4caf50", "#81c784"],
	},
	{
		name: "Sunset Coral",
		colors: {
			mainBackgroundColor: "#6e1d1d",
			outsetBackgroundColor: "#8b2727",
			secondaryBackgroundColor: "#a73131",
			firstAccentColor: "#ff8a65",
			secondAccentColor: "#ffccbc",
			mainFontColor: "#ffffff",
			mainTextShadowColor: "rgba(0, 0, 0, 0.5)",
			mainGlassyBackgroundColor: "rgba(110, 29, 29, 0.5)",
		},
		previewColors: ["#ff8a65", "#ffccbc"],
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
