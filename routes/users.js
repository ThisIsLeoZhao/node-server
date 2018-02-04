const express = require('express');
const Post = require('../models/post.js');
const router = express.Router();

// User homepage
router.get('/:username', function (req, res, next) {
    const user = req.session ? req.session.user : null;

    Post.find({username: req.params.username}, function (err, posts) {
        res.locals.user = user;
        res.locals.posts = posts;
        res.locals.success_messages = req.flash('success_messages')[0];
        res.locals.error_messages = req.flash('error_messages')[0];
    
        console.log(res.locals);
    
        res.render('index', { title: 'Express' });
    });
});

module.exports = router;
