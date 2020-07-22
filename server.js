var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  twitter = require('ntwitter'),
  routes = require('./routes'),
  config = require('./config'),
  streamHandler = require('./util/streamHandler');

var app = express();
var port = process.env.PORT || 8080;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.engine('view engine', 'handlebars');

app.disable('etag');

mongoose.connect('mongod://localhost/react-tweets');

var twit = new twitter(config.twitter);

app.get('/', routes.index);

app.post('/page/:page/:skip', routes.page);

app.use('/', express.static(__dirname + '/public'));

var server = http.createServer(app).listen(port, function () {
  console.log('Express server listening on port ' + port);
});

var io = require('socket.io').listen(server);

twit.stream('statuses/filter',{ track: 'scotch_io, #scotchio'}, function(stream){
  streamHandler(stream,io);
});