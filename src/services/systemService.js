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
            // mock: true,
            body
        });
    }

    /**
     *  获取系统参数列表
     */
    getParamList(body) {
        return xhr({
            url: '/param/list',
            method: 'get',
            body
        });
    }

    /**
     *  修改系统参数
     */
    updateParam(body) {
        return xhr({
            url: '/param/update',
            method: 'post',
            body
        });
    }

    /**
     *  获取系统字典列表
     */
    getDictList(body) {
        return xhr({
            url: '/dict/list',
            method: 'get',
            body
        });
    }

    /**
     *  添加字典
     */
    editDictItem(body) {
        return xhr({
            url: '/dict/addItem',
            method: 'post',
            body
        });
    }

    /**
     *  禁用/启用字典项
     */
    disableDictItem(body) {
        return xhr({
            url: '/dict/disableItem',
            method: 'post',
            body
        });
    }

}

export default new SystemService();
