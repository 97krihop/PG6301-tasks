const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')));

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }
  res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('Started on http://localhost:3000');
});
