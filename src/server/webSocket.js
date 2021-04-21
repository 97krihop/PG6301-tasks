const WebSocket = require("ws");
const wss = new WebSocket.Server({ noServer: true });

function broadcast() {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({ userCount: wss.clients.size }));
  });
}

const init = (server) => {
  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", (ws) => {
    broadcast();

    ws.on("close", () => {
      broadcast();
    });
  });
};
module.exports = { init };
