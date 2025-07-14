// Get elements
const chatButton = document.getElementById("chat-btn");
const chatBox = document.getElementById("chat-box");
const chatArea = document.getElementById("chat-area");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const closeBtn = document.getElementById("close-btn");

// Show chat popup when chat button is clicked
chatButton.addEventListener("click", () => {
  chatBox.style.display = "flex";
  loadMessages();
});

// Hide chat popup when close button is clicked
closeBtn.addEventListener("click", () => {
  chatBox.style.display = "none";
});

// Load messages from database
function loadMessages() {
  fetch("get_messages.php")
    .then((res) => res.json())
    .then((data) => {
      chatArea.innerHTML = ""; // Clear chat
      data.forEach(msg => {
        appendMessage(msg.sender, msg.message);
      });
      chatArea.scrollTop = chatArea.scrollHeight;
    })
    .catch((err) => {
      chatArea.innerHTML = "<div style='color:red;'>Failed to load messages.</div>";
    });
}

// Send message when send button is clicked
sendBtn.addEventListener("click", sendMessage);

// Also send message on Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  // Save user's message to backend
  fetch("save_message.php", {
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `sender=You&message=${encodeURIComponent(message)}`
  });

  appendMessage("You", message);
  userInput.value = "";

  // Get bot reply
  let reply = getBotReply(message);

  // Save bot reply to backend
  fetch("save_message.php", {
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `sender=Bot&message=${encodeURIComponent(reply)}`
  });

  appendMessage("Bot", reply);

  chatArea.scrollTop = chatArea.scrollHeight;
}

// Append a message with sender label
function appendMessage(sender, message) {
  const div = document.createElement("div");
  div.className = "chat-message " +
    (sender === "You" ? "user-message" :
     sender === "Admin" ? "admin-message" : "bot-message");

  // Add sender label
  const senderSpan = document.createElement("span");
  senderSpan.className = "sender-label";
  senderSpan.textContent = (sender === "You" ? "User" : sender) + ": ";
  div.appendChild(senderSpan);

  // Add message text
  const messageSpan = document.createElement("span");
  messageSpan.className = "message-text";
  messageSpan.textContent = message;
  div.appendChild(messageSpan);

  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Basic bot replies
function getBotReply(userMsg) {
  userMsg = userMsg.toLowerCase();
  if (userMsg.includes("hi") || userMsg.includes("hello")) {
    return "Hello! How can I assist you today?";
  } else if (userMsg.includes("working hours")) {
    return "We’re available from 9 AM to 6 PM, Monday to Friday.";
  } else {
    return "Thank you for your message. Our team will get back to you shortly.";
  }
}
