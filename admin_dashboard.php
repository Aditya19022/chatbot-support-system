<?php
// Start session and connect to database
session_start();
$conn = new mysqli("localhost", "root", "", "chatbot_db", 3307);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all messages
$result = $conn->query("SELECT * FROM messages ORDER BY id DESC");
?>

<!DOCTYPE html>
<html>
<head>
  <title>Admin Dashboard</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      padding: 20px;
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
      border: 1px solid #ddd;
      padding: 10px;
    }
    .reply-form input[type="text"] {
      width: 70%;
      padding: 8px;
    }
    .reply-form input[type="submit"] {
      padding: 8px 15px;
      background: green;
      color: white;
      border: none;
      cursor: pointer;
    }
    .logout-btn {
      position: absolute;
      top: 20px;
      left: 20px;
      background: red;
      color: white;
      padding: 10px;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>

<a class="logout-btn" href="logout.php">Logout</a>
<h1>Admin Dashboard</h1>

<table>
  <tr>
    <th>ID</th>
    <th>Sender</th>
    <th>Message</th>
    <th>Timestamp</th>
    <th>Reply</th>
  </tr>

  <?php while ($row = $result->fetch_assoc()) { ?>
  <tr>
    <td><?php echo $row['id']; ?></td>
    <td><?php echo $row['sender']; ?></td>
    <td><?php echo $row['message']; ?></td>
    <td><?php echo $row['timestamp']; ?></td>
    <td>
      <?php if ($row['sender'] !== 'Admin') { ?>
        <form class="reply-form" action="send_reply.php" method="post">
          <input type="hidden" name="reply_to_id" value="<?php echo $row['id']; ?>">
          <input type="text" name="reply" placeholder="Type your reply" required>
          <input type="submit" value="Send">
        </form>
      <?php } else { echo "-"; } ?>
    </td>
  </tr>
  <?php } ?>
</table>

</body>
</html>

