const mongoose = require('./db.js');

const postSchema = mongoose.Schema({
    username: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;