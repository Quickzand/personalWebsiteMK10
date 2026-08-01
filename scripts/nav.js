function scrollToSection(section, callback, speed = 1000) {
	$("html, body").animate(
		{
			scrollTop: $(section).offset().top - 75,
		},
		speed
	);
	// After animation is done, call the callback function if it exists
	if (callback) {
		setTimeout(callback, speed);
	}
}

$(".navButton").click(function () {
	var section = $(this).attr("href");
	projectScreenClose(() => {
		scrollToSection(section);
	});
});

$(".mobileNavButton").click(function () {
	var section = $(this).attr("href");
	$("#mobileNav").removeClass("open");
	$("#mobileNavToggleButton").removeClass("open");
	scrollToSection(section);
});

$("#mobileNavToggleButton").click(function () {
	$("#mobileNav").toggleClass("open");
	$("#mobileNavToggleButton").toggleClass("open");
});

$("#resumeShare").click(function (event) {
	var url = new URL($(this).attr("href"), location.href).href;
	if (navigator.share) {
		event.preventDefault();
		navigator.share({ title: "Matthew Sand — Resume", url: url }).catch(() => {});
	} else if (navigator.clipboard) {
		event.preventDefault();
		var button = $(this);
		var original = button.text();
		navigator.clipboard.writeText(url).then(function () {
			button.text("Link copied!");
			setTimeout(function () {
				button.text(original);
			}, 2000);
		});
	}
	// No share or clipboard support: fall through and just open the PDF.
});

// Give each nav button an index so we can animate them in order, but have it be backwards

$(".navButton").each(function (index) {
	$(this).css("--index", $(".navButton").length - index);
});

$(".mobileNavButton").each(function (index) {
	$(this).css("--index", index);
});
