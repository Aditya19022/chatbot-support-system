<?php
// Simple admin username and password
$admin_user = "admin";
$admin_pass = "admin123";

// Get data from login form
$username = $_POST['username'];
$password = $_POST['password'];

// If correct, redirect to dashboard
if ($username === $admin_user && $password === $admin_pass) {
    header("Location: admin_dashboard.php");
    exit();
} else {
    // If wrong, redirect back with error
    header("Location: admin_login.html?error=1");
    exit();
}
?>
