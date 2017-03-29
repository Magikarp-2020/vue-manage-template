/**
 * Created by lichao on 2017/3/27.
 */
import xhr from './xhr/xhr';

class RoleService {
    list(body) {
        return xhr({
            url: '/role/list',
            body
        });
    }

    changeAuth(body) {
        return xhr({
            url: '/role/permissions',
            body,
            method: 'post'
        });
    }

    deleteRole(body) {
        return xhr({
            //    /role/delete
            url: '/role/delete',
            method: 'post',
            body
        });
    }

    addRole(body) {
        // /role/add
        return xhr({
            url: '/role/add',
            method: 'post',
            body
        });
    }

    getRolePermissions(body) {
        return xhr({
            url: '/role/permissions',
            method: 'get',
            body
        });
    }
}

export default new RoleService();
