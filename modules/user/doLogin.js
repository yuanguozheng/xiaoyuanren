/**
 * Created by Just.YY on 2014/10/28.
 */
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var request = require('request');
var userInfo = require('../../models/userModel');

function verifyByXiyouLib(userName, password, callback) {
    if (userName == NULL || userName == undefined || userName == '') {
        callback()
    }
    request(
        {
            url: 'http://222.24.3.7:8080/opac_two/include/login_app.jsp',
            method: 'POST',
            encoding: null,
            headers: {
                ContentType: 'application/x-www-form-urlencoded'
            },
            form: {
                login_type: 'barcode',
                barcode: username,
                password: password,
                _: ''
            }
        },
        function (err, res, body) {
            if (err) {
                callback(err);
                return;
            }
            body = iconv.decode(body, "GB2312");
            //console.log(body);
            session = res.headers['set-cookie'];
            //console.log(session);
            if (body == 'ok') {
                callback(session[0]);
                return;
            }
            else {
                callback('Account Error');
                return;
            }
        }
    );
}

function verifyByDb(userName, password, callback) {
    if (userName == null || userName == undefined || userName == '') {
        callback('PARAM_ERROR');
        return;
    }
    userInfo.getOneUserInfo(userName, function (result) {
        console.log(result);
    });
}

module.exports.byDb = verifyByDb;