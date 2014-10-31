var express = require('express');
var router = express.Router();
var msgResponse = require('../modules/public/msgResponse.js');
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res) {
    msgResponse.doError(0,res);
    //session.Session
});

module.exports = router;
