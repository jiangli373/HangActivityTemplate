/**
 * Created by jiangli on 16/6/28.
 *
 * 封装下wechat-api给全局使用
 *
 */
'use strict';

const log4js = require('log4js');
const logger = log4js.getLogger("redis");
const MyConfig = require('../config');
const API = require('wechat-api');
const Redis = require('./Redis');
const TOKENKEY = 'TOKENKEY';


const api = new API(MyConfig.wx.app_id, MyConfig.wx.app_secret, function (callback) {  //将微信token存在redis里面

    Redis.get(TOKENKEY,function(error, res){

        if(error) {
            logger.error('get TOKENKEY redis',error);
            return callback(error);
        }
        return callback(null, JSON.parse(res));
    });

}, function (token, callback) {
    Redis.set(TOKENKEY,JSON.stringify(token),callback);

});

api.registerTicketHandle(  //将js-ticket的token存放在redis里面

    function getTicketToken(type, callback) {
        Redis.get(type, function (err, res) {

            if(err) {
                logger.error('get getTicketToken redis',error);
                return callback(error);
            }
            logger.info('getTicketToken done',JSON.parse(res));
            return callback(null, JSON.parse(res));

        });

    },
    function saveTicketToken(type, _ticketToken, callback) {

        Redis.set(type, JSON.stringify(_ticketToken),function (err, res) {

            if(err) {
                logger.error('set saveTicketToken redis',error);
                return callback(error);
            }

            logger.info('saveTicketToken done',JSON.stringify(_ticketToken));
            return callback(null, res);

        });
    }
);


module.exports = api;