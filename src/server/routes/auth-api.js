const express = require("express");
const userDb = require("../db/users");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (userDb.verifyUser(username, password)) {
    req.session.username = username;
    res.end();
  } else res.status(401).send();
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (username.length > 4 && password.length > 6) {
    const success = userDb.createUser(username, password);
    if (!success) res.status(400).send();
    res.status(201).send();
  } else res.status(400).send();
});

router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    return res.status(200).send();
  }
  res.status(400).send();
});

router.get("/user", (req, res) => {
  if (!req.session) return res.status(401).send();
  const user = userDb.getUser(req.session.username);
  res.status(200).json({
    id: user.id,
    victories: user.victories,
    defeats: user.defeats,
  });
});

module.exports = router;
