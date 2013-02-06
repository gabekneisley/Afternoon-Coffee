/*
  The API controller exports some methods.
  Describe them here!
*/

var Topic = require('../models/topic.js');

exports.post = function(req, res) {
  console.log(req.body.topic.title);
  console.log(req.body.topic.description);
  var topic = new Topic({
    title: req.body.topic.title, 
    description: req.body.topic.description,
  });
  console.log(topic._id);
  topic.save();
  res.redirect('/topic');
}

exports.list = function(req, res) {
  Topic.find(function(err, topics) {
    res.render('topics', {
      title: 'All Topics',
      topics: topics
    });
  });
}

exports.show = function(req, res) {
  Topic.findOne({title: req.params.title}, function(error, topic) {
    res.send(topic);
  });
}