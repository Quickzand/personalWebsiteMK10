<?php 
// This is the email address that the form will send a message to.
$myEmail =  "matthewsand22@gmail.com";

// This is the subject of the email that the form sends.
$subject =  "Contact Form Submission";

$email = $_POST['email'];
$name = $_POST['name'];
$message = $_POST['message'];

// This line sends the e-mail to me.
mail($myEmail, $subject, $message);
echo "sent email to $myEmail with message $message from $name at $email";
?>