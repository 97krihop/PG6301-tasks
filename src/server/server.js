const app = require("./app");

app.listen(process.env.PORT || 3000, () => {
  console.log("Started on http://localhost:3000");
});
