<?php
$conn = new mysqli("localhost", "root", "", "chatbot_db", 3307);
if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }

$result = $conn->query("SELECT * FROM messages ORDER BY id ASC");
$messages = [];
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}
echo json_encode($messages);
$conn->close();
?>