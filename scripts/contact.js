function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

$("#email").on("input", function () {
	var email = $("#email").val();
	if (validateEmail(email) || email == "") {
		$("#email").removeClass("invalid");
	} else {
		$("#email").addClass("invalid");
	}
});

$("#message").on("input", function () {
	var message = $("#message").val();
	if (message != "") {
		$("#message").removeClass("invalid");
	}
});

$("#name").on("input", function () {
	var name = $("#name").val();
	if (name != "") {
		$("#name").removeClass("invalid");
	}
});

function attemptSubmission() {
	var email = $("#email").val();
	var message = $("#message").val();
	var name = $("#name").val();
	var invalid = false;

	if (!validateEmail(email)) {
		$("#email").addClass("invalid");
		invalid = true;
	}

	if (message == "") {
		$("#message").addClass("invalid");
		invalid = true;
	}

	if (name == "") {
		$("#name").addClass("invalid");
		invalid = true;
	}

	if (invalid) {
		return;
	}

	$("#submit").prop("disabled", true);
	$.ajax({
		type: "POST",
		url: "./scripts/email.php",
		data: {
			email: email,
			message: message,
			name: name,
		},
		success: function (data) {
			console.log(data);
			$("#email").val("");
			$("#message").val("");
			$("#name").val("");
			$("#submit").prop("disabled", false);
			$("#email").removeClass("invalid");
			$("#message").removeClass("invalid");
			$("#name").removeClass("invalid");
			$("#contactSubmit button").text("Message Sent!");
			setTimeout(function () {
				$("#contactSubmit button").text("Send");
			}, 3000);
		},
		error: function (data) {
			console.log("ERROR: ", data);
			$("#submit").prop("disabled", false);
		},
	});
}
