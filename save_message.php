<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "chatbot_db";
$port = 3307; // Make sure this is your MySQL port from XAMPP

$conn = new mysqli($host, $user, $password, $database, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sender = $_POST['sender'];
$message = $_POST['message'];

$sql = "INSERT INTO messages (sender, message) VALUES ('$sender', '$message')";
$conn->query($sql);

$conn->close();
?>
