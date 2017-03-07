var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    url: String,
    title: String,
    description: String,
    upvotes: Number
    timestamp: {type: Date, default: Date.now}
})

var posts = mongoose.model('posts', postSchema);