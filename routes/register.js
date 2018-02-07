const express = require('express');
const User = require('../models/user.js');
const auth = require('../auth/auth.js');

const router = express.Router();

// Register page
router.get('/', function (req, res, next) {
    res.sendFile('auth.html', {root: './weibo/views'});
});

// Post register request
router.post('/', function (req, res, next) {
    auth.registerUser(new User({
        username: req.body.username,
        password: req.body.password
    }), function (authToken) {
        res.send(JSON.stringify({auth: true, token: authToken, message: 'Register succeed'}));
    }, function (err) {
        res.send(JSON.stringify({auth: false, message: err}));
    });
});

module.exports = router;
