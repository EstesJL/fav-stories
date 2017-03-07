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



//INITIALIZE

app.get('/home', function(req, res) {
    res.sendfile(path.join(__dirname, '/../client/index.html'));
});



//SET UP DATABASE

var postSchema = new mongoose.Schema({
    title: String,
    link: String,
    upvotes: Number,
    description: String,
    timestamp: {type: Date, default: Date.now}
});

var Post = mongoose.model('Post', postSchema);

//DATABASE FUNCTIONALITY

app.post('/posts', function(req, res, next) {
    console.log('REQ BODY POST', req.body.post);

    // var post = new Post(req.body.post);
    Post.create(req.body.post, function(err, post) {
        if (err) { return next(err); }
        console.log('CREATING POST', post)
        res.json(post);
    });
});

// var createPost = Q.nbind(postSchema.create, postSchema);


app.listen(port, function() {console.log ('Check out the party on port ' + port)});



// require('./routes')(app, express);
// require('./models/Posts');

exports = module.exports = app;