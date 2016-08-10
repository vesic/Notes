'use strict'
var express = require('express');
var app = express();

const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/notes', (req, res) => {
  res.send(['note1', 'note2', 'note3']);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
