// Get any element thats .inFromLeft or .inFromRight and add the .appear class to it when the scroll position is greater than the top of the element minus the window height

$(window).scroll(updateIntroAnimation);
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

$("h2").addClass("inFromLeft");
$("#skillsContainer h3").addClass("inFromLeft");
