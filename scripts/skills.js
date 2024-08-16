const programmingLanguages = [
	{
		name: "HTML",
		level: 1,
		icon: "images/skills/html.png",
		accentColor: "#e0421e",
	},
	{
		name: "CSS",
		level: 1,
		icon: "images/skills/css.png",
		accentColor: "#1e8fe0",
	},
	{
		name: "Javascript",
		level: 1,
		icon: "images/skills/javascript.png",
		accentColor: "#ebba30",
	},
	{
		name: "SQL",
		level: 0.6,
		icon: "images/skills/sql.png",
		accentColor: "#1453a0",
	},
	{
		name: "PHP",
		level: 0.8,
		icon: "images/skills/php.png",
		accentColor: "#6874b9",
	},
	{
		name: "C",
		level: 0.8,
		icon: "images/skills/c.png",
		accentColor: "#0b478c",
	},
	{
		name: "Python",
		level: 1,
		icon: "images/skills/python.png",
		accentColor: "#fddf55",
	},
	{
		name: "Java",
		level: 0.95,
		icon: "images/skills/java.png",
		accentColor: "#4f6dbc",
	},
	{
		name: "GO",
		level: 0.25,
		icon: "images/skills/go.png",
		accentColor: "#00a8e0",
	},
];


const technologies = [
	{
		name: "Git",
		level: 0.9,
		icon: "images/skills/git.png",
		accentColor: "#f14e32",
	},
	{
		name: "Node.js",
		level: 0.8,
		icon: "images/skills/node.png",
		accentColor: "#8cc84b",
	},
	{
		name: "Electron",
		level: 0.8,
		icon: "images/skills/electron.png",
		accentColor: "#47848c",
	},
	{
		name: "React",
		level: 0.8,
		icon: "images/skills/react.png",
		accentColor: "#61dafb",
	},
	{
		name: "JQuery",
		level: 0.95,
		icon: "images/skills/jquery.png",
		accentColor: "#0769ad",
	},
	{
		name: "PWA",
		level: 0.5,
		icon: "images/skills/pwa.png",
		accentColor: "#4a00c5",
	},
	{
		name: "Web Sockets",
		level: 0.45,
		icon: "images/skills/websocket.png",
		accentColor: "#ef4b07",
	},
	{
		name: "AWS",
		level: 0.85,
		icon: "images/skills/aws.png",
		accentColor: "#f7941e",
	},
];

const profs = [
	{
		name: "MacOS",
		level: 1,
		icon: "images/skills/macos.png",
		accentColor: "#1f93f4",
	},
	{
		name: "Windows",
		level: 0.9,
		icon: "images/skills/windows.png",
		accentColor: "#209ceb",
	},
	{
		name: "Linux",
		level: 0.8,
		icon: "images/skills/linux.png",
		accentColor: "#ed9a0a",
	},
	{
		name: "Android",
		level: 0.3,
		icon: "images/skills/android.png",
		accentColor: "#95bd2c",
	},
	{
		name: "iOS",
		level: 0.95,
		icon: "images/skills/ios.png",
		accentColor: "#1f93f4",
	},
	{
		name: "Office Suite",
		level: 0.95,
		icon: "images/skills/office.png",
		accentColor: "#e42407",
	},
	{
		name: "Adobe Photoshop",
		level: 0.95,
		icon: "images/skills/photoshop.jpg",
		accentColor: "#43bae7",
	},
	{
		name: "Final Cut Pro X",
		level: 0.95,
		icon: "images/skills/finalcut.png",
		accentColor: "#fa55ae",
	},
	{
		name: "Slack",
		level: 0.75,
		icon: "images/skills/slack.png",
		accentColor: "#4a154b",
	},
	{
		name: "Unity",
		level: 0.5,
		icon: "images/skills/unity.svg",
		accentColor: "#ff7149",
	},
	{
		name: "Virtual Reality",
		level: 0.85,
		icon: "images/skills/vr.png",
		accentColor: "#0c64f1",
	},
];



function skillCardBuilder(skillData) {
    const card = $("<div>").addClass("skillCard");
    const cardIcon = $("<img>")
        .attr("src", skillData.icon)
        .addClass("skillCardIcon");
    const cardName = $("<h4>")
        .text(skillData.name)
        .addClass("skillCardName");
    const cardLevel = $("<div>")
        .addClass("skillCardLevel")
        .css("width", `${skillData.level * 100}%`)
        .css("background-color", skillData.accentColor);

    card.append(cardIcon, cardName, cardLevel);

    return card;
}



function buildSkills() {
    const programmingLanguagesContainer = $("#programmingLanguages");
    const technologiesContainer = $("#technologies");
    const profsContainer = $("#profs");
    var index = 0;
    programmingLanguages.forEach((skill) => {
        var temp = skillCardBuilder(skill); 
        temp.css("--index", index);
        temp.css("--random", Math.random() * 0.2 + 0.9);
        programmingLanguagesContainer.append(temp);
        index ++;
    });

    technologies.forEach((skill) => {
        var temp = skillCardBuilder(skill);
        temp.css("--index", index);
        temp.css("--random", Math.random() * 0.2 + 0.9);
        technologiesContainer.append(temp);
        index++;

    });

    profs.forEach((skill) => {
        var temp = skillCardBuilder(skill);
     temp.css("--index", index);
temp.css("--random", Math.random() * 0.2 + 0.9);
        profsContainer.append(temp);
        index++;
    });
}

buildSkills();

