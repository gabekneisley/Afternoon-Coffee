//dependencies
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var less = require('less-middleware');

var app = express();

/*
  environment stuff that should be moved somewhere else soon
*/
var port = process.env.PORT || 3000;
var datapath = 'mongodb://localhost/norum';

mongoose.connect(datapath);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('DB Connected!');
});

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  
  //code to properly use bootstrap
  var bootstrapPath = path.join(__dirname, 'node_modules', 'bootstrap');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use('/img', express.static(path.join(bootstrapPath, 'img')));
  app.use(app.router);
  
  //set up less to auto-compile
  app.use(less({
    src: path.join(__dirname, 'assets', 'less'),
    paths: [path.join(bootstrapPath, 'less')],
    dest: path.join(__dirname, 'public', 'stylesheets'),
    prefix: '/stylesheets'
  }));
  
  app.use(express.static(path.join(__dirname, 'public')));
});

//set up the api
var api = require('./controllers/api.js');
app.post('/topic', api.post);
app.get('/topic/:title', api.show);
app.get('/topic', api.list);

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Home'
  })
});

app.listen(port);
console.log('Listening on port ' + port);

/*
var http = require('http');
var port = '8124';
var root = "127.0.0.1"
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, root);
console.log('Server running at http://' + root + ':' + port + '/');
*/