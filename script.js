// Wait for the DOM to load
window.addEventListener("DOMContentLoaded", function () {
  const chatBtn = document.getElementById("chat-btn");
  const chatBox = document.getElementById("chat-box");
  const closeBtn = document.getElementById("close-btn");
  const chatArea = document.getElementById("chat-area");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  // Session ID creation and storage
  let sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2);
    localStorage.setItem("session_id", sessionId);
  }

  // Open chat box
  chatBtn.addEventListener("click", () => {
    chatBox.style.display = "block";
  });

  // Close chat box
  closeBtn.addEventListener("click", () => {
    chatBox.style.display = "none";
  });

  // Send message on click
  sendBtn.addEventListener("click", handleUserMessage);

  // Send message on Enter key
  userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleUserMessage();
    }
  });

  // Handle user message and bot reply
  function handleUserMessage() {
    const message = userInput.value.trim();
    if (message !== "") {
      appendMessage("You", message);
      sendMessageToPHP("user", message);

      const botReply = getBotReply(message);
      setTimeout(() => {
        appendMessage("Bot", botReply);
        sendMessageToPHP("bot", botReply);
      }, 500);

      userInput.value = "";
    }
  }

  // Append message to chat area
  function appendMessage(sender, message) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatArea.appendChild(msgDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  // Define bot reply logic
  function getBotReply(userMessage) {
    const msg = userMessage.toLowerCase();
    if (msg.includes("hi") || msg.includes("hello")) {
      return "Hello! How can I assist you today?";
    } else if (msg.includes("working hours")) {
      return "We’re available from 9 AM to 6 PM, Monday to Friday.";
    } else if (msg.includes("bye")) {
      return "Goodbye! Have a great day!";
    } else {
      return "I'm sorry, I didn't understand that.";
    }
  }

  // Send message to PHP backend
  function sendMessageToPHP(sender, message) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "save_message.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(
      `session_id=${encodeURIComponent(sessionId)}&sender=${encodeURIComponent(sender)}&message=${encodeURIComponent(message)}`
    );
  }
});
