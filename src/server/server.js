const https = require("https");
const fs = require("fs");
const app = require("./app");

const server = https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.crt"),
    },
    app
  )
  .listen(3000, () => {
    console.log(
      `server started on https://localhost:${
        server.address().port
      } or https://webapps.kristiania.no:${server.address().port}`
    );
  });
