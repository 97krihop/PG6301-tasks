const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const matchApi = require("./routes/match-api");
const authApi = require("./routes/auth-api");
const { verifyUser, getUser } = require("./db/users");

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: "1a230192419213",
    resave: false,
    saveUninitialized: false,
  })
);

//passport
passport.use(
  new LocalStrategy((username, password, done) => {
    if (verifyUser(username, password)) {
      done(null, getUser(username));
    } else {
      done(null, false, { message: "Invalid username/password" });
    }
  })
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = getUser(id);
  done(null, user ? user : null);
});
app.use(passport.initialize());
app.use(passport.session());

//routs
app.use("/api", matchApi);
app.use("/api", authApi);

//static assets
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

//react
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) return next();
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

module.exports = app;
