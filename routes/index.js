const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    console.log("Index Page was rendered");
    res.render('index');
});

module.exports = router;