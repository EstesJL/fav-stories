var express = require('express');
var bodyParser = require('body-parser');
var db = require('./config/db');
var mongoose = require('mongoose');
var morgan = require('morgan')
var path = require('path')
var request = require('request');


var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/client'));

require('./routes')(app, express);
require('./models/Posts');





app.listen(port);
console.log('Check out the party on port ' + port);

exports = module.exports = app;