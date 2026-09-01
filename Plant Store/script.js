
function doAlert() {
    alert("Form submitted successfully!");
}

function hpAlert() {
    alert("Product Searching");
}

function toggleChat() {
    const chatBox = document.getElementById("chatBox");
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
    const userInput = document.getElementById("userInput");
    const messageText = userInput.value.trim();
    if (messageText === "") return;

    addMessage(messageText, "user-message");
    setTimeout(() => addMessage("Hello! How can I assist you?", "bot-message"), 1000);
    userInput.value = "";
}

function addMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;
    messageDiv.innerText = text;
    document.getElementById("chatMessages").appendChild(messageDiv);
    document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString(); // Formats date & time based on user's locale
    document.getElementById("datetime").innerText = formattedDateTime;
}

updateDateTime(); // Show date immediately
setInterval(updateDateTime, 1000); 