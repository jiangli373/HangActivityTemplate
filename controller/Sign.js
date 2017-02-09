/**
 * 验证微信的js-ticket
 * @type {*}
 */
'use strict';

const API = require('../tools/Wechat');

const log4js = require('log4js');
const log = log4js.getLogger("sign");

const MyConfig = require('../config');
exports.sign = function (req, res,next) {

    let retJson = {
        code:200,
        msg:''
    };
    let url = req.query.url;

    let param = {
        debug: true,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'showMenuItems'
        ],
        url:url
    };

    API.getJsConfig(param,function (err, configObj) {
        if(err){
            log.error('getJsConfig error:',err);
            retJson.code = 500;
            retJson.msg = '获取失败';
            return res.json(retJson);
        }
        retJson.ret = configObj;
        retJson.shareObj = MyConfig.shareObj;
        return res.json(retJson);

    });

};

