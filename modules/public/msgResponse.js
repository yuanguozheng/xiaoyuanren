/**
 * Created by Just.YY on 2014/10/28.
 */
var express = require('express');
var router = express.Router();

var _res;
var _data;
var UniResult = {'Result': false, 'Detail': null};

/**
 * 设置响应
 * @param res
 */
function setRes(res) {
    if (res == null || res == undefined)
        return;
    _res = res;
}

/**
 * 设置返回的数据
 * @param [obj] data
 */
function setData(data) {
    if (data == null || data == undefined)
        data = UniResult;
    _data = data;
}

/**
 * 返回错误信息
 * @param type 错误类型
 * @param [optional] res 响应
 * @param [optional] msg 错误信息
 */
function error(type, res, msg) {
    setRes(res);
    UniResult.Result = false;
    switch (type) {
        case 0:
        {
            UniResult.Detail = 'NOT_FOUND';
            break;
        }
        case 1:
        {
            UniResult.Detail = 'SERVER_ERROR';
            break;
        }
        case 2:
        {
            UniResult.Detail = 'CALLING_ERROR';
            break;
        }
        case -1:
        {
            UniResult.Detail = msg;
            break;
        }
        default:
        {
            UniResult.Detail = 'UNKNOWN_ERROR';
            break;
        }
    }
    setData(UniResult);
    doRes();
}

/**
 * 执行响应，填充响应流
 * @param [optional] res
 * @param [optional] data
 */
function doRes(res, data) {
    setRes(res);
    if (_data == null || _data == undefined) {
        setData(data);
    }
    if (_res == null || _res == undefined)
        return;
    _res.setHeader('Content-Type', 'application/json; charset=utf-8');
    _res.json(_data);
    _res.end();
    return;
}

module.exports.doRes = doRes;
module.exports.setRes = setRes;
module.exports.setData = setData;
module.exports.doError = error;