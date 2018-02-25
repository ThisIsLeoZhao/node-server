const mongoose = require('./db.js');

const favoriteSchema = mongoose.Schema({
    username: String,
    movieId: Number
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;