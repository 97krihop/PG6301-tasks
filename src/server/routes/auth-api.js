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

  if (!success) returnres.status(400).send();

  passport.authenticate("local")(req, res, () => {
    req.session.save((err) => {
      if (err) res.status(500).send();
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
  const user = userDb.getUser(req.user);
  res.status(200).json({
    id: user.id,
    victories: user.victories,
    defeats: user.defeats,
  });
});

module.exports = router;
