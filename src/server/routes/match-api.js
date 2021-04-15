const express = require("express");
const { reportEndOfMatch } = require("../db/users");
const { removeMatch } = require("../db/match");
const { getMatch, createMatch } = require("../db/match");

const router = express.Router();

const getPayload = (match) => {
  const shallowCopy = Object.assign({}, match.quizzes[match.current]);
  shallowCopy.correct = undefined;

  return {
    id: match.id,
    currentIndex: match.current,
    currentQuiz: shallowCopy,
    victory: match.victory,
    defeat: match.defeat,
    numberOfQuizzes: match.quizzes.length,
  };
};
const endGame = (req, match, victory) => {
  victory ? (match.victory = true) : (match.defeat = true);
  reportEndOfMatch(req.user.id, victory);
  removeMatch(req.user.id);
};

router.post("/matches", (req, res) => {
  if (!req.user) return res.status(401).send();

  const match = createMatch(req.user.id, 3);
  const payload = getPayload(match);

  res.status(201).json(payload);
});

router.get("/matches/ongoing", (req, res) => {
  if (!req.user) return res.status(401).send();

  const match = getMatch(req.user.id);
  if (!match) return res.status(404).send();

  const payload = getPayload(match);
  res.status(200).json(payload);
});

router.post("/matches/ongoing", (req, res) => {
  if (!req.user) return res.status(401).send();

  const match = getMatch(req.user.id);
  if (!match || match.victory || match.defeat) return res.status(400).send();

  const { correct } = match.quizzes[match.current];
  const { answer } = req.body;

  if (answer === correct) {
    match.current++;
    if (match.current === match.quizzes.length) endGame(req, match, true);
  } else {
    endGame(req, match, false);
  }

  const payload = getPayload(match);

  res.status(201).json(payload);
});

module.exports = router;
