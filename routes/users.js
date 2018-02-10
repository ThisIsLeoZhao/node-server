const express = require('express');
const Post = require('../models/post.js');
const router = express.Router();

// User homepage
router.get('/:username', function (req, res, next) {
    res.sendFile('index.html', {root: './weibo/public/views'});
});

module.exports = router;
