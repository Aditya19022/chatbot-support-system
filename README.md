# 💬 Chatbot Suppchatbot

## ✅ Project Overview

This is a basic chatbot-based customer support system.  
The project allows website visitors to chat with a bot, and an admin can log in to view all chat messages.

🗂️ Folder Structure:
chatbot/
├── index.html → Main chatbot interface
├── style.css → Styling for chatbot widget
├── script.js → JavaScript logic for chatbot
├── save_message.php → Backend script to save messages to MySQL
├── admin_login.php → Admin login form + login validation
├── login.php → (optional, if separated from admin_login.php)
├── admin_dashboard.php → Admin dashboard to view messages
├── logout.php → Ends admin session



## 🔧 Technologies Used

- HTML, CSS, JavaScript (Frontend)
- PHP (Backend)
- MySQL (Database)
- XAMPP (Local server)


## 📦 Features Implemented

- ✅ Floating chatbot icon
- ✅ Chat popup with bot replies
- ✅ Bot responds using basic logic (like “Hi” and working hours)
- ✅ Messages saved with timestamps in MySQL
- ✅ Admin login page (username/password hardcoded)
- ✅ Admin dashboard showing all chat messages
- ✅ Admin can reoly to all chat messages
- ✅ Logout button for admin


## 🔐 Admin Credentials

Username: admin
Password: admin123


## 💾 Database Info

**Database Name**: `chatbot_db`  
**Table Name**: `messages`

### Table Structure:
| Field     | Type         | Details                  |
|-----------|--------------|--------------------------|
| id        | INT          | Primary Key, Auto Increment |
| sender    | VARCHAR(100) | 'user' or 'bot'          |
| message   | TEXT         | Chat content             |
| timestamp | TIMESTAMP    | Default: CURRENT_TIMESTAMP |



## 🚀 How to Run the Project

1. Start Apache & MySQL from XAMPP Control Panel
2. Copy project folder into `C:\xampp\htdocs\chatbot`
3. Open your browser and go to:
   - Chatbot: `http://localhost/chatbot/index.html`
   - Admin: `http://localhost/chatbot/admin_login.php`
4. Make sure MySQL is on port `3307` if you've changed it



## 🙏 Acknowledgement

Made by Aditya Singh for internship evaluation.  
Basic, functional, and clean implementation using beginner-friendly tools.
