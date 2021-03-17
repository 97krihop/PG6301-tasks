const express = require("express");
const { getRandomQuizzes } = require("../db/quizzes");

const router = express.Router();

router.post("/login", (req, res) => {
  res.status(204).send();
});

router.post("/signup", (req, res) => {
  res.status(204).send();
});

router.post("/logout", (req, res) => {
  res.status(204).send();
});

router.get("/user", (req, res) => {
  if (!req.user) {
    res.status(401).send();
    return;
  }
  res.status(200).json({
    id: req.user.id,
    victories: req.user.victories,
    defeats: req.user.defeats,
  });
});

module.exports = router;
