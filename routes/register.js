const express = require('express');
const User = require('../models/user.js');
const auth = require('../auth/auth.js');

const router = express.Router();

// Register page
router.get('/', function (req, res, next) {
    res.locals.success_messages = req.flash('success_messages')[0];
    res.locals.error_messages = req.flash('error_messages')[0];
    res.render('reg', { title: 'Register' });
});

// Post register request
router.post('/', function (req, res, next) {
    if (req.body['password'] != req.body['repeat-password']) {
        req.flash('error_messages', 'Password is different with the repeat password');
        return res.redirect('/register');
    }

    auth.registerUser(new User({
        username: req.body.username,
        password: req.body.password
    }), function (userToken) {
        req.session.user = userToken;
        req.flash('success_messages', 'Register succeed!');
        res.redirect('/');
    }, function (err) {
        req.flash('error_messages', err);
        res.redirect('/register');
    });
});

module.exports = router;
