const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const settings = require('../models/settings.js');

module.exports = {
    registerUser: function (user) {
        user.password = bcrypt.hashSync(user.password, 8);

        return User.findOne({ username: user.username }).then(function (foundUser) {
            if (foundUser) {
                throw 'User already exists';
            }
            user.save().then(function (user) {
                const token = jwt.sign({ id: user.username }, settings.secret, {
                    expiresIn: 60
                });
                return token;
            }).catch(function (err) {
                throw err;
            });

        }).catch(function (err) {
            throw err;
        });
    },

    loginUser: function (user) {
        return User.findOne({ username: user.username }).then(function (foundUser) {
            if (!foundUser) {
                throw 'User does not exist';
            } else if (!bcrypt.compareSync(user.password, foundUser.password)) {
                throw 'Password does not match';
            } else {
                const token = jwt.sign({ id: foundUser.username }, settings.secret, {
                    expiresIn: 60
                });

                return token;
            }
        }).catch(function (err) {
            throw err;
        });
    },

    verifyToken: function (req, res, next) {
        const token = (req.body && req.body.access_token) ||
            (req.query && req.query.access_token) ||
            req.headers['x-access-token'];

        jwt.verify(token, settings.secret, function (err, decoded) {
            if (err) {
                return next({ tokenValid: false, err: err.message });
            }

            User.findOne({ username: decoded.id }).then(function (user) {
                if (!user) {
                    throw 'User does not exist';
                }

                req.username = decoded.id;
                next({ tokenValid: true });
            }).catch(function (err) {
                next({tokenValid: false, err: err});
            });
        });
    }
};

