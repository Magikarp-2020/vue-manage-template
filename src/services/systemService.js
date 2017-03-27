/**
 * Created by lichao on 2017/3/15.
 */
import xhr from './xhr/xhr';

class SystemService {
    login(body) {
        return xhr({
            url: '/login',
            method: 'post',
            body
        });
    }

    checkLogin() {
        return xhr({
            url: '/logined',
            method: 'get'
        });
    }

    loginOut() {
        return xhr({
            url: '/home/logout',
            method: 'get'
        });
    }

    changePassword(body) {
        return xhr({
            url: '/my/password',
            method: 'post',
            body
        });
    }

    getAuthList(body) {
        return xhr({
            url: '/data-resource/list',
            method: 'get',
            mock: true,
            body
        });
    }

}

export default new SystemService();
