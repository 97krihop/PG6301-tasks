const express = require("express");
const { ongoingQuestion, nextQuestion, startMatches } = require("../db/match");

const router = express.Router();

router.post("/matches", (req, res) => {
  if (!req.session.username) return res.status(401).send();
  const payload = startMatches(req.session.username);
  res.status(201).json(payload);
});

router.get("/matches/ongoing", (req, res, next) => {
  if (!req.session.username) return res.status(401).send();
  try {
    const payload = ongoingQuestion(req.session.username);
    res.status(200).json(payload);
  } catch (e) {
    next(e);
  }
});

router.post("/matches/ongoing", (req, res, next) => {
  if (!req.session.username) return res.status(401).send();
  try {
    const { answer } = req.body;
    const { victory, question } = nextQuestion(req.session.username, answer);
    if (question) res.status(200).json(question);
    else if (victory) res.status(200).json({ victory: true });
    else res.status(200).json({ victory: false });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
