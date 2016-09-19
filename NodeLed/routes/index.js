﻿var express = require('express');
var router = express.Router();
var ledfunc = require('../routes/ledfunc');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'NodeLed', flip: 'MeOff' });
});

/* GET Views */
router.get('/views/*', function (req, res) {
    res.render(req.params[0]);
});

/* POST to leds */
router.post('/send/board', function (req,res){
    ledfunc.writeToBoard(req.body);
    res.end();
    console.log('Write to board');
});

router.post('/send/strip', function (req,res){
    ledfunc.writeToStrip(req.body);
    res.end();
    console.log('Write to strip');
});

router.post('/send/strip/:colour', function (req,res){
    ledfunc.colourStrip(req.params.colour);
    res.end();
    console.log('Write colour to strip');
});

module.exports = router;
