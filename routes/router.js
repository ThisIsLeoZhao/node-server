const express = require('express');

const index = require('./index.js');
const login = require('./login.js');
const logout = require('./logout.js');
const post = require('./post.js');
const register = require('./register.js');
const users = require('./users.js');
const auth = require('../auth/auth.js');
const posts = require('./posts.js');
const favorite = require('./favorite.js');

const router = express.Router();

router.all('/login', checkNotLogin);
router.all('/register', checkNotLogin);
router.all('/logout', checkLogin);
router.all('/post', checkLogin);
router.all('/u/*', checkLogin);
// router.all('/favorite', checkLogin);

router.use('/', index);
router.use('/login', login);
router.use('/logout', logout);
router.use('/post', post);
router.use('/register', register);
router.use('/u', users);
router.use('/posts', posts);
router.use('/favorite', favorite);

function checkNotLogin(req, res, next) {
    auth.verifyToken(req, res, function (result) {
        if (result.tokenValid) {
            return res.send(JSON.stringify({ 'error': 'Already logged in' }));
        } else {
            console.error(result.err);
        }
        next();
    });
}

function checkLogin(req, res, next) {
    auth.verifyToken(req, res, function (result) {
        if (!result.tokenValid) {
            console.error(result.err);
            return res.send(JSON.stringify({ 'error': 'Log in before continue' }));
        }
        next();
    });
}

module.exports = router;