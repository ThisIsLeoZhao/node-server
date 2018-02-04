const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const settings = require('../models/settings.js');

module.exports = {
    registerUser: function (user, onRegister, onError) {
        user.password = bcrypt.hashSync(user.password, 8);

        User.findOne({ username: user.username }, function (err, foundUser) {
            if (foundUser) {
                onError('User already exists');
            } else {
                user.save(function (err, user) {
                    if (err) {
                        onError(err);
                    }

                    const token = jwt.sign({ id: user.username }, settings.secret, {
                        expiresIn: 60
                    });
                    onRegister(token);
                });
            }
        });
    },

    loginUser: function (user, onLogin, onError) {
        User.findOne({ username: user.username }, function (err, foundUser) {
            if (err) {
                onError(err);
            }

            if (!foundUser) {
                onError('User does not exist');
            } else if (!bcrypt.compareSync(user.password, foundUser.password)) {
                onError('Password does not match');
            } else {
                const token = jwt.sign({ id: foundUser.username }, settings.secret, {
                    expiresIn: 60
                });

                onLogin(token);
            }
        });
    },

    verifyToken: function (req, res, next) {
        const token = (req.body && req.body.access_token) ||
            (req.query && req.query.access_token) ||
            req.headers['x-access-token'];

        jwt.verify(token, settings.secret, function (err, decoded) {
            if (err) {
                return next({tokenValid: false, err: err.message});
            }

            User.findOne({ username: decoded.id }, function (err, user) {
                if (err) {
                    return next({tokenValid: false, err: err});
                }
                if (!user) {
                    return next({tokenValid: false, err: 'User does not exist'});
                }

                req.username = decoded.id;
                next({tokenValid: true});
            });
        });
    }
};

