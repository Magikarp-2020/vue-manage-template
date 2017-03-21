/**
 * Created by lichao on 2017/3/20.
 */
import xhr from './xhr/xhr';

class StaffService {
    getList(body) {
        return xhr({
            url: '/emp/list',
            method: 'post',
            body
        });
    }

    changeStaff(body) {
        return xhr({
            url: '/emp/update',
            method: 'post',
            body
        });
    }

    resetPassword(body) {
        return xhr({
            url: '/emp/password',
            method: 'post',
            body
        });
    }

    staffDisabled(body) {
        return xhr({
            url: '/emp/disable',
            methods: 'post',
            body
        });
    }

    deleteStaff(body) {
        return xhr({
            url: '/emp/delete',
            methods: 'post',
            body
        });
    }

}

export default new StaffService();
