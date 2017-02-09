/**
 * Created by jiangli on 16/4/6.
 */

const utils = require('utility');
exports.md5 = function (str) {
    if(!!str){
        return  utils.md5(str);
    }
    return '';
}

