<?php
//get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "codingvoldemorts@gmail.com";
$subject = "Mail From Coding Voldemorts";
$txt ="Name = ". $name . "\r\n  Email = " . $email . "\r\n Message =" . $message;
$headers = "From: noreply@yoursite.com" . "\r\n" .
"CC: codingvoldemorts@gmail.com";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}
?>