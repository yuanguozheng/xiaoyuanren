/**
 * Created by Just.YY on 2014/10/31.
 */
var crypto = require('crypto');
var md5 = function (str, encoding) {
    return crypto
        .createHash('md5')
        .update(str)
        .update('xiyoumobileapplactionclub')
        .digest(encoding || 'hex');
};

function doRegister(info, callback) {
    
}