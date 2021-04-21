const https = require("https");
const fs = require("fs");
const app = require("./app");
const { init } = require("./webSocket");
const port = process.env.PORT || "3000";

const server = https.createServer(
  {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
  },
  app
);
init(server);

server.listen(port, () => {
  console.log(
    `server started on https://localhost:${port} or https://webapps.kristiania.no:${port}`
  );
});
