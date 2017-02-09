var config={
    mysql:{
        port:3306,
        host     : 'localhost',
        database : 'test',
        user     : 'root',
        password : '',
        debug:false,
        "charset" : "utf8mb4"
    },
    //微信appid
    "wx": {
        "app_id": "xxxxxxxx",
        "app_secret": "xxxxxxxxxx"
    },
    "cookie_openid":"xxxxxxxxxxxxx", //存在客户端浏览器使用
    "shareObj":{   //微信分享使用
        "link":'xxxx.xxxxx.com/xxxxxx',
        "title": "title",
        "desc": "desc",
        "imgUrl": "http://www.xxxx.com/image.png",
    },

};
module.exports = config;
module.exports.config = config;