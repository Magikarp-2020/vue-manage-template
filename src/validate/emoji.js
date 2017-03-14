/**
 * Created by lichao on 2017/2/21.
 */
/* eslint-disable */

/**
 * 表单验证   检查是否有Emoji
 * @param rule
 * @param value
 * @param callback
 */
export default (rule, value, callback = () => {}) => {
    let error = false;
    for (let i = 0; i < value.length; i++) {
        let hs = value.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (value.length > 1) {
                let ls = value.charCodeAt(i + 1);
                let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    callback(new Error('不可输入Emoji'));
                    error = true;
                    break;
                }
            }
        } else if (value.length > 1) {
            let ls = value.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                callback(new Error('不可输入Emoji'));
                error = true;
                break;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                callback(new Error('不可输入Emoji'));
                error = true;
                break;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                callback(new Error('不可输入Emoji'));
                error = true;
                break;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                callback(new Error('不可输入Emoji'));
                error = true;
                break;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                callback(new Error('不可输入Emoji'));
                error = true;
                break;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                || hs == 0x2b50) {
                callback(new Error('不可输入Emoji'));
                error = true;
                break;
            }
        }
    }
    if(!error) {
        callback();
    }

    return error;
}
