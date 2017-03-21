/**
 * Created by lichao on 2017/3/15.
 */
import xhr from './xhr/xhr';

class SystemService {
    login(body) {
        return xhr({
            url: '/login',
            type: 'post',
            body
        });
    }

    checkLogin() {
        return xhr({
            url: '/logined',
            type: 'get'
        });
    }

    loginOut() {
        return xhr({
            url: '/home/logout',
            type: 'get'
        });
    }

    changePassword(body) {
        return xhr({
            url: '/my/password',
            type: 'post',
            body
        });
    }

}

export default new SystemService();
