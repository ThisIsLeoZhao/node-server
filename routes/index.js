const express = require('express');

const router = express.Router();

// Homepage
router.get('/', function (req, res, next) {
    res.sendFile('index.html', {root: './weibo/views'});
});

module.exports = router;
