<a href="logout.php" style="position: absolute; top: 20px; left: 20px; background: red; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Logout</a>

<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "chatbot_db", 3307);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all chat messages
$result = $conn->query("SELECT * FROM messages ORDER BY id DESC");
?>

<!DOCTYPE html>
<html>
<head>
  <title>Admin Dashboard</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8f8f8;
      margin: 20px;
      transition: background 0.3s, color 0.3s;
    }
    h1 {
      text-align: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    tr:nth-child(even) {
      background: #f2f2f2;
    }
    .reply-form input[type="text"] {
      width: 80%;
      padding: 8px;
      margin-top: 8px;
      margin-right: 8px;
    }
    .reply-form input[type="submit"] {
      padding: 8px 15px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }
    .dark-mode {
      background-color: #121212;
      color: white;
    }
    .dark-mode table, .dark-mode th, .dark-mode td {
      border-color: #555;
    }
    .dark-mode tr:nth-child(even) {
      background-color: #1e1e1e;
    }
    .toggle-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: #333;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>

<h1>Admin Dashboard</h1>
<button class="toggle-btn" onclick="toggleDarkMode()">🌙 Toggle Dark Mode</button>

<table>
  <tr>
    <th>ID</th>
    <th>Sender</th>
    <th>Message</th>
    <th>Timestamp</th>
  </tr>

  <?php while ($row = $result->fetch_assoc()) { ?>
    <tr>
      <td><?php echo $row['id']; ?></td>
      <td><?php echo $row['sender']; ?></td>
      <td><?php echo $row['message']; ?></td>
      <td><?php echo $row['timestamp']; ?></td>
    </tr>
    <?php if ($row['sender'] === 'You') { ?>
    <tr>
      <td colspan="4">
        <form class="reply-form" method="post" action="send_reply.php">
          <input type="hidden" name="reply_to_id" value="<?php echo $row['id']; ?>">
          <input type="text" name="reply" placeholder="Type your reply" required>
          <input type="submit" value="Send Reply">
        </form>
      </td>
    </tr>
    <?php } ?>
  <?php } ?>
</table>

<script>
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
</script>

</body>
</html>
