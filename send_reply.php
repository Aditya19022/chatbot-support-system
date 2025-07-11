<?php
$conn = new mysqli("localhost", "root", "", "chatbot_db", 3307);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $reply = $conn->real_escape_string($_POST['reply']);
    $timestamp = date('Y-m-d H:i:s');

    $sql = "INSERT INTO messages (sender, message, timestamp) VALUES ('Admin', '$reply', '$timestamp')";
    $conn->query($sql);
}

header("Location: admin_dashboard.php");
exit();
?>
