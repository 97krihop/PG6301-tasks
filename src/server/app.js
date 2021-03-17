const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const matchApi = require('./routes/match-api')

const app = express();

app.use(bodyParser.json());

app.use('/api',matchApi);

app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')));

app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
  res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
});

module.exports = app;
