<?php
$conn = new mysqli("localhost", "root", "", "chatbot_db", 3307);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sender = $_POST['sender'];
$message = $_POST['message'];

$stmt = $conn->prepare("INSERT INTO messages (sender, message) VALUES (?, ?)");
$stmt->bind_param("ss", $sender, $message);
$stmt->execute();
$stmt->close();
$conn->close();
?>
