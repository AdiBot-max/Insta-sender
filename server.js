const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

// Create HTTP server (required by Render)
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WebSocket server is running");
});

// Attach WebSocket to HTTP server
const wss = new WebSocket.Server({ server });
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

server.listen(PORT, () => {
  console.log("🚀 WebSocket running on port", PORT);
});
