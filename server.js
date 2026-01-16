const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });
const clients = new Set();

wss.on("connection", ws => {
  clients.add(ws);

  ws.on("message", msg => {
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    }
  });

  ws.on("close", () => clients.delete(ws));
});

console.log("🚀 WebSocket running on port", PORT);
