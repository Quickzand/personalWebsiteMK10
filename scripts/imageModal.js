var imageModal = $("#imageModal");
var imageModalImg = $("#imageModal img");

function openImageModal(imageSrc) {
	imageModalImg.attr("src", imageSrc);
	imageModal.addClass("open");
}

function closeImageModal() {
	imageModal.removeClass("open");
}

$("#imageModalClose").click(closeImageModal);
$("#imageModal").click(closeImageModal);
