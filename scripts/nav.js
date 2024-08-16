function scrollTo(section, callback, speed = 1000) {
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
		scrollTo(section);
	});
});

$(".mobileNavButton").click(function () {
	var section = $(this).attr("href");
	$("#mobileNav").removeClass("open");
	scrollTo(section);
});

$("#mobileNavToggleButton").click(function () {
	$("#mobileNav").toggleClass("open");
	console.log("HERE");
});


// Give each nav button an index so we can animate them in order, but have it be backwards 

$(".navButton").each(function (index) {
	$(this).css("--index", $(".navButton").length - index);
});

$(".mobileNavButton").each(function (index) {
	$(this).css("--index", index);
});


