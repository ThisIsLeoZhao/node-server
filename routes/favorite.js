const express = require('express');
const Favorite = require('../models/favorite.js');

const router = express.Router();

router.get('/:username', function (req, res) {
    Favorite.find({
        username: req.params.username
    }).then(function (movies) {
        res.send({favorites: movies ? movies.map(movie => movie.movieId) : []});
    }).catch(function (err) {
        res.status(404).send({message: err});
    });
});

router.post('/', function (req, res) {
    new Favorite({
        username: req.body.username,
        movieId: req.body.movieId
    }).save().then(function () {
        res.status(201).send();
    }).catch(function (err) {
        res.status(500).send({message: err});
    });
});

router.delete('/:username/:movieId', function (req, res) {
    Favorite.remove({
        username: req.params.username, 
        movieId: req.params.movieId
    }).then(function () {
        res.send();
    }).catch(function (err) {
        res.status(404).send({message: err});
    });
});

module.exports = router;