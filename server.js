var bodyParser = require('body-parser');
var store = require('./store.js');
var express = require('express');
var h5 = require('../h5js');
require('../h5js/examples/functions');

h5.debug(true);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/action/store', function(req, res) {
  storeAction(req.body);
  res.json(req.body);
});

app.get('/action/store/:id', function(req, res) {
  var id = req.param('id');
  if (id in store) {
    var action = getAction(id);
    res.json(action);
  } else {
    res.status(404).json({error: 'Not found'});
  }
});

app.all('/action/run/:id', function(req, res) {
  var id = req.param('id');
  if (id in store) {
    var action = getAction(id);
    h5.run(action, req.query).
      then(function(result) {
        res.json(result);
      }, function(err) {
        res.status(500).json({error: err});
      });
  } else {
    res.status(404).json({error: 'Not found'});
  }
});

console.log('Listening');
app.listen(6090);
