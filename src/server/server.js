const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Started on http://localhost:3000");
});
