const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = require('./routes/router.js');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev', { stream: process.stdout }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const key = fs.readFileSync(path.join(__dirname, 'auth/private.key'));
const cert = fs.readFileSync(path.join(__dirname, 'auth/server.crt'));

app.set('sslOptions', {
    key: key,
    cert: cert
});

module.exports = app;
