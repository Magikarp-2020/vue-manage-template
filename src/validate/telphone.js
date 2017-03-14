export function telphone(rule, value, callback) {
    let reg = /^0?(13|15|18|14|17)[0-9]{9}$/;
    if (reg.test(value)) {
        return callback();
    } else {
        return callback(new Error('手机号格式错误'));
    }
}
