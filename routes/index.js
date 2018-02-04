const express = require('express');
const Post = require('../models/post.js');

const router = express.Router();

// Homepage
router.get('/', function (req, res, next) {
    Post.find(function(err, posts) {
        res.send(JSON.stringify({ posts: posts }));
    });
});

module.exports = router;
