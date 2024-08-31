// Get any element thats .inFromLeft or .inFromRight and add the .appear class to it when the scroll position is greater than the top of the element minus the window height

$(window).scroll(updateIntroAnimation);
// On load do the same
$(document).ready(updateIntroAnimation);

function updateIntroAnimation() {
	$(".inFromLeft, .inFromRight").each(function () {
		if (
			$(this).offset().top - $(window).scrollTop() <=
			$(window).height() - 100
		) {
			$(this).addClass("appear");
		}
	});
}

// Add in from left to every h3
$("h2").addClass("inFromLeft");
