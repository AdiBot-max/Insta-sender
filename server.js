// npm i ws
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
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

console.log("🚀 Chat server running on ws://localhost:8080");
