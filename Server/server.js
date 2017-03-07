var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var Q = require('q');


var app = express();

var port = process.env.PORT || 8080;


mongoose.connect('mongodb://favlinks:favlinks@ds119210.mlab.com:19210/favlinks');

app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.use(express.static(path.join(__dirname, '../client')));



//INITIALIZE

// app.get('/', function(req, res) {
//     res.sendfile(path.join(__dirname, '/../client/index.html'));
// });



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
    Post.create(req.body.post, function(err, post) {
        if (err) { return next(err); }
        console.log('CREATING POST', post)
        res.json(post);
    });
});



app.get('/posts', function(req, res, next) {
    var promisePosts = Q.nbind(Post.find, Post);
    console.log('GETTING REQD');
    promisePosts({})
    .then(function(posts){
        res.json(posts)
      })
      .fail(function(error){
        next(error);
      });
})


app.listen(port, function() {console.log ('Check out the party on port ' + port)});


exports = module.exports = app;