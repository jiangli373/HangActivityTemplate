/**
 * Created by li.jiang on 16/8/23.
 *
 * 活动逻辑处理
 */
'use strict';
/**
 * 逻辑说明
 * index负责处理从微信过来的链接，把用户的userid存在cookie里面，后面所有的处理都要用到
 *
 * 需要有一个默认的处理，如果没有关注的话，做的违规操作，都是需要到这个默认页面的
 *
 * shareid是来处理是不是以前没有关注的时候跳转到分享页面
 *
 * 当访问完别人的分享页面以后，需要把这个cookie删除了，以防止一直到别人的页面上去
 *
 *share.ejs需要判断，如果focusus==true,需要移除cookie shareid，否则记录shareid
 */
const KEY = "11111111111";
const Utils = require('../tools/Utils');
exports.cacheIndex = function(req, res, next){

	let userid = req.query.userid-0;
	let sign = req.query.sign;
	if(!!userid&&!!sign){
		let result = Utils.md5(userid+KEY);
		if(result===sign){
			res.cookie(MyConfig.cookie_openid, userid,
				{path: '/', maxAge: 1000 * 60 * 60 * 24 * 365, signed: true, httpOnly: true}); //cookie 有效期30天
			res.redirect('personal'); //到我的页面上去
		}else{
			return next(new Error('签名不正确'));
		}
	}else{
		return next(new Error('参数不正确'));
	}
}



/**
 * 需要验证userid是不是正确
 * @param req
 * @param res
 * @param next
 * focus_us  优先级最高，没有关注我们，不能做任何事
 * do_some_thing
 *
 */
exports.personal = function(req, res, next) {

};

/**
 * 处理分享的页面
 * @param req
 * @param res
 * @param next
 */
exports.share = function (req, res, next) {

	//自己不能到自己分享的页面，需要跳转到自己的页面上去

};


/**
 * 处理别人帮助
 * @param req
 * @param res
 * @param next
 */
exports.doHelp = function (req, res, next) {

};

