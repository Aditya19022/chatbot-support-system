const chatButton = document.getElementById("chat-button");
const chatPopup = document.getElementById("chat-popup");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Toggle chat popup
chatButton.addEventListener("click", () => {
  chatPopup.style.display = chatPopup.style.display === "none" ? "flex" : "none";
  loadMessages(); // Load old messages
});

// Load messages from database
function loadMessages() {
  fetch("get_messages.php")
    .then((res) => res.json())
    .then((data) => {
      chatBox.innerHTML = ""; // Clear chat
      data.forEach(msg => {
        const div = document.createElement("div");
        div.className = msg.sender === "You" ? "user-message" : "bot-message";
        div.textContent = msg.message;
        chatBox.appendChild(div);
      });
      chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  // Save user's message
  fetch("save_message.php", {
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `sender=You&message=${encodeURIComponent(message)}`
  });

  // Show user's message
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);
  userInput.value = "";

  // Get bot reply
  let reply = getBotReply(message);

  // Save bot reply
  fetch("save_message.php", {
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `sender=Bot&message=${encodeURIComponent(reply)}`
  });

  // Show bot reply
  const botMsg = document.createElement("div");
  botMsg.className = "bot-message";
  botMsg.textContent = reply;
  chatBox.appendChild(botMsg);

  chatBox.scrollTop = chatBox.scrollHeight;
}

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
