var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
// var request = require('request');


var app = express();

var port = process.env.PORT || 8080;


mongoose.connect('mongodb://favlinks:favlinks@ds119210.mlab.com:19210/favlinks');

app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/node_modules', express.static(__dirname + '/../node_modules'));
// console.log('path', path.join(__dirname, '/../client'));
app.use(express.static(path.join(__dirname, '../client')));



//ROUTER

app.get('/home', function(req, res) {
    res.sendfile(path.join(__dirname, '/../client/index.html'));
});



app.post('/posts', function(req, res, next) {
    console.log('REQ BODY', req.body);

    var post = new postSchema(req.body);
    post.save(function(err, post) {
        if (err) { return next(err); }
        console.log('SAVING POST', post)
        res.json(post);
    });
});



//SET UP DATABASE

var postSchema = new mongoose.Schema({
    title: String,
    link: String,
    upvotes: Number,
    description: String,
    timestamp: {type: Date, default: Date.now}
});

var posts = mongoose.model('posts', postSchema);

//DATABASE FUNCTIONALITY

// var createPost = Q.nbind(postSchema.create, postSchema);


app.listen(port, function() {console.log ('Check out the party on port ' + port)});



// require('./routes')(app, express);
// require('./models/Posts');

exports = module.exports = app;