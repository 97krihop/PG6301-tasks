const express = require("express");
const { getRandomQuizzes } = require("../db/quizzes");

const router = express.Router();

router.post("/matches", (req, res) => {
  if (!req.session.username) return res.status(401).send();
  const payload = getRandomQuizzes(3);

  res.status(201).json(payload);
});

module.exports = router;
