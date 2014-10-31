/**
 * Created by Just.YY on 2014/10/28.
 */
var express = require('express');
var router = express.Router();
var msgResponse = require('../modules/public/msgResponse.js');
var doLogin = require('../modules/user/doLogin');
var doRegister =require('../modules/user/doRegister');

router.use('/login', function (req, res) {
   doLogin.byDb(req.param('username'),req.param('password'),function(result){

   });
});

router.use('/register',function(req,res){
    doRegister
})

module.exports = router;