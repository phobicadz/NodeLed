var express = require('express');
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

router.get('/send/:key', function (req,res) {
//    res.render(req.params[0]);
    console.log("send to leds here");
    ledfunc.writeToConsole(req.params.key);
    res.end('send to leds here:' + req.params.key);
  
});

module.exports = router;