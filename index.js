const chatDisplay = document.getElementById('chat-display');
const messageInput = document.getElementById('message');
const sendButton = document.querySelector('button');

let ws;

function appendMessageToChat(message, sender = 'You') {
  chatDisplay.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
}

function initWebSocket() {
  ws = new WebSocket('wss://echo.websocket.org');

  ws.onmessage = (event) => {
    const message = event.data;
    appendMessageToChat(message, 'Stranger');
  };

  ws.onopen = () => {
    appendMessageToChat('Connected to the chat server!', 'System');
  };

  ws.onclose = () => {
    appendMessageToChat('Connection closed.', 'System');
  };
}

function sendMessage() {
  const message = messageInput.value.trim();

  if (message !== '') {
    appendMessageToChat(message, 'You');
    ws.send(message);
    messageInput.value = '';
  }
}

messageInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

sendButton.addEventListener('click', sendMessage);

initWebSocket();
