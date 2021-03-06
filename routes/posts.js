const express = require('express');
const Post = require('../models/post.js');

const router = express.Router();

// Get all posts
router.get('/', function (req, res, next) {
    Post.find().then(function (posts) {
        res.send(JSON.stringify({ posts: posts }));
    });
});

module.exports = router;