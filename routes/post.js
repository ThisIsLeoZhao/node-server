const express = require('express');
const Post = require('../models/post.js');

const router = express.Router();

// Post post request
router.post('/', function (req, res, next) {
    const postContent = req.body.post;
    
    new Post({username: req.username, content: postContent}).save(function (err, post) {
        res.send(JSON.stringify({message: 'Post succeeded'}));
    });
});

module.exports = router;
