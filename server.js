'use strict'
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var chance = require('chance').Chance();
var Note = require('./models/Note');
var _ = require('lodash');
var bodyParser = require('body-parser')

mongoose.connect('mongodb://vesic:vesic@ds037155.mlab.com:37155/my');

var db = mongoose.connection;
db.on('error', (e) => console.log('error', e));
db.once('open', () => console.log('success'))

const port = process.env.PORT || 3333;

app.use(require('morgan')('short'));
app.use(require('cors')());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/notes', (req, res) => {
  Note.find({})
    .exec((err, data) => res.send(data));
});

app.post('/notes/:id/delete', (req, res) => {
  let id = req.params.id;
  if (!id) res.status(404).send('Not found');
  Note.findByIdAndRemove(id, (note) => {
    res.status(204).send('ok');
  })
});

app.post('/notes/add', (req, res) => {
    console.log(req.body);
    new Note(req.body)
      .save(() => res.status(201).send('save success'));
});

app.get('/seed', (req, res) => {
  let notes = [];
  _.times(20, () => {
    notes.push(new Note({
      title: chance.sentence({words: 2}),
      content: chance.paragraph()
    }))
  })

  Note.create(notes, () => res.send('db seed success!'));
});

app.get('*', (req, res) => {
  res.send('Not found!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
