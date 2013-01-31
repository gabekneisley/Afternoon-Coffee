//the topic model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
  title: String,
  description: String,
  creationdate: {type: Date, default: Date.now},
  origin: {type: String, default: 'gabe'}
});

module.exports = mongoose.model('Topic', topicSchema);