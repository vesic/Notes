var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
  title:  String,
  content: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);
