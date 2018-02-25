const express = require('express');
const User = require('../models/user.js');
const auth = require('../auth/auth.js');

const router = express.Router();

// Get login page
router.get('/', function (req, res) {
    res.sendFile('auth.html', {root: './weibo/public/views'});
});

// Post login request
router.post('/', function (req, res) {
    auth.loginUser(new User({
        username: req.body.username,
        password: req.body.password
    })).then(function (authToken) {
        res.send(JSON.stringify({auth: true, token: authToken, message: 'Login succeed'}));
    }).catch(function (err) {
        res.status(401).send(JSON.stringify({auth: false, message: err || err.message}));
    });
});

module.exports = router;
