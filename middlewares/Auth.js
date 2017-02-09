'use strict';
const STATICURL = 'focusus.html';
const MyConfig = require('../config');

const ACTIVITYENDTIME = 2469980800; //活动结束时间
const ACTIVITYSTARTTIME = 1469581260;//活动开始时间

/**
 * 需要判断客户端是否存了openid
 * 没有保存直接跳转到关注页面
 */
exports.userRequired = function (req, res, next) {
	let auth_token = req.signedCookies[MyConfig.cookie_openid];
	if(!auth_token){
		return res.redirect(STATICURL);
	}else{
		next();
	}

};


/**
 * 需要判断客户端是否存了openid
 * 验证访问时间是否在活动期间内
 * 没有保存,返回错误提示
 */
exports.userRequiredTwo = function (req, res, next) {
	let time = parseInt(new Date().getTime()/1000);
    let auth_token = req.signedCookies[MyConfig.cookie_openid];
	let json = {
		code : 200,
		msg :''
	};
  if(!auth_token){
		json.code = 500;
	    json.msg = '';
    return res.json(json);

  }else{
	  if(time<ACTIVITYSTARTTIME){
		   json = {
			  code : 500,
			  msg :'活动与7月28日9点开启!'
		  };
		  return res.json(json);
	  }
	  if(time>ACTIVITYENDTIME){
		  json = {
			  code : 500,
			  msg :'亲耐的！活动已经结束，请继续关注微信号！'
		  };
		  return res.json(json);
	  }

      next();
  }

};

exports.checkWeixinBroswer = function(req,res,next){

  let ua = req.headers['user-agent'].toLowerCase();
  if(/micromessenger/.test(ua)){ //是微信浏览器
    next();
  }else{
    //需要转到关注页面，并且要提示
    return res.redirect(STATICURL);
     //next();
  }
}

