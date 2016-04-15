var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/views/*', function (req, res) {
    res.render(req.params[0]);
});

module.exports = router;