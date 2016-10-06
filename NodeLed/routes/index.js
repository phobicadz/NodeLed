var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var ledfunc = require('../routes/ledfunc');

var client = mqtt.connect('mqtt://adamandlindsey.co.uk');

client.on('connect', function () {
  console.log('connected')
})

client.on('error', function () {
  console.log('Could not connect');
})

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

router.post('/send/strip/rainbow', function (req,res){
    ledfunc.rainbowStrip();
    res.end();
    console.log('Write to strip with a rainbow');
});

module.exports = router;
