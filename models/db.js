const settings = require('./settings.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(settings.mongoUrl);

module.exports = mongoose;
