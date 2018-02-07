const express = require('express');
const Post = require('../models/post.js');
const router = express.Router();

// User homepage
router.get('/:username', function (req, res, next) {
    res.sendFile('index.html', {root: './weibo/views'});
});

module.exports = router;
