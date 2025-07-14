// Get elements using correct IDs as per index.html
const chatButton = document.getElementById("chat-btn");    // Button to open chat
const chatBox = document.getElementById("chat-box");       // Full chat popup
const chatArea = document.getElementById("chat-area");     // Area where messages are shown
const userInput = document.getElementById("user-input");   // Input for user message
const sendBtn = document.getElementById("send-btn");       // Send button
const closeBtn = document.getElementById("close-btn");     // Close button

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
        const div = document.createElement("div");
        div.className = msg.sender === "You" ? "user-message" : "bot-message";
        div.textContent = msg.message;
        chatArea.appendChild(div);
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

  // Show user's message
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = message;
  chatArea.appendChild(userMsg);
  userInput.value = "";

  // Get bot reply
  let reply = getBotReply(message);

  // Save bot reply to backend
  fetch("save_message.php", {
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `sender=Bot&message=${encodeURIComponent(reply)}`
  });

  // Show bot reply
  const botMsg = document.createElement("div");
  botMsg.className = "bot-message";
  botMsg.textContent = reply;
  chatArea.appendChild(botMsg);

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
