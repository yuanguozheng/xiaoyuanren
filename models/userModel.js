/**
 * Created by Just.YY on 2014/10/31.
 */
var dbURL = 'mongodb://localhost/xiaoyuanren';
var mongoose = require('mongoose');
var db = mongoose.connect(dbURL);

var userSchema = new mongoose.Schema(
    {
        ID: String,
        Password: String,
        Name: String,
        Cls: String,
        Email: String
    },
    {
        collection: 'UserInfo'
    }
);

var userModel = mongoose.model('UserInfo', userSchema);

function getOneUserInfo(id, callback) {
    if (id == null || id == undefined || id == '') {
        callback('PARAM_ERROR');
        return;
    }
    userModel.findOne({ID: id}, function (err, result) {
        console.log(result);
    });
}

function insertUserInfo(info, callback) {

}


module.exports.getOneUserInfo = getOneUserInfo;