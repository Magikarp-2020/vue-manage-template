/**
 * Created by lichao on 2016/12/30.
 */
class Util {
    parseParam(param) {
        if (param) {
            let arr = [];
            for (let key in param) {
                if (param[key] !== undefined && (param[key] + '')) {
                    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(param[key]));
                }
            }
            return arr.join('&');
        }
        return '';
    }

    cloneObject(obj) {
        if (typeof obj === 'object') {
            if (obj instanceof Array) {
                let newArr = [];
                for (let i = 0; i < obj.length; i++) newArr.push(obj[i]);
                return newArr;
            } else {
                let newObj = {};
                for (let key in obj) {
                    newObj[key] = this.cloneObject(obj[key]);
                }
                return newObj;
            }
        } else {
            return obj;
        }
    };
}

export default new Util();
