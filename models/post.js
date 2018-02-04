const settings = require('./settings.js');
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    username: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;