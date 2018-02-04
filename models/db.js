const settings = require('./settings.js');
const mongoose = require('mongoose');

mongoose.connect(settings.mongoUrl);
