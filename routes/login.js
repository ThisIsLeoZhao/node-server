const express = require('express');
const User = require('../models/user.js');
const auth = require('../auth/auth.js');

const router = express.Router();

// Get login page
router.get('/', function (req, res) {
    res.sendFile('login.html', {root: './weibo/views'});
});

// Post login request
router.post('/', function (req, res) {
    auth.loginUser(new User({
        username: req.body.username,
        password: req.body.password
    }), function (loginToken) {
        res.send(JSON.stringify({login: true, token: loginToken, message: 'Login succeed'}));
    }, function (err) {
        res.send(JSON.stringify({login: false, message: err}));
    });
});

module.exports = router;
