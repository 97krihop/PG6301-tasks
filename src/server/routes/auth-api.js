const express = require("express");
const userDb = require("../db/users");
const passport = require("passport");

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(204).send();
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const success = userDb.createUser(username, password);

  if (!success) return res.status(400).send();

  passport.authenticate("local")(req, res, () => {
    req.session.save((err) => {
      if (err) res.status(400).send();
      else res.status(201).send();
    });
  });
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(204).send();
});

router.get("/user", (req, res) => {
  if (!req.user) return res.status(401).send();
  res.status(200).json({
    id: req.user.id,
    victories: req.user.victories,
    defeats: req.user.defeats,
  });
});

module.exports = router;
