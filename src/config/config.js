/**
 * Created by lichao on 2017/1/3.
 */
import router from 'router/index';
import {Message, MessageBox} from 'element-ui';

let EventUtil = {
    addHandler: (element, type, handler) => {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    }
};
EventUtil.addHandler(window, 'online', () => {
    Message.success('网络连接已恢复');
});
EventUtil.addHandler(window, 'offline', () => {
    MessageBox.alert('请确认网络是否连通，否则会造成当前工作丢失', '掉线了？', {
        confirmButtonText: '好的，我知道了'
    });
});

export const getRoot = () => {
    let ROOT = '';
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        ROOT = 'http://dev.mosu.local';
    } else {
        ROOT = '';
    }
    // ROOT = 'http://mosu.odata.me';
    return ROOT;
};

export const rootPath = (conf = {}) => {
    let ROOT = conf.root || getRoot();  // mosu.odata.me    dev.mosu.local
    const CONTEXT_NAME = conf.context_name || 'teamwork';

    if (window.CHANGE_ROOT) {
        return window.CHANGE_ROOT + '/' + CONTEXT_NAME;
    } else {
        return ROOT + '/' + CONTEXT_NAME;
    }
};

export const successHandler = (res) => {
    let store = require('stores/store');
    let code = res.body.code;
    let status = res.body.status;
    let msg = res.body.message;
    switch (code) {
        case 10:
            if (status === 403) {
                clearLoginMsg();
                /* MessageBox.alert(msg, '错误提示', {
                 confirmButtonText: '去登录',
                 callback: () => {
                 router.push('/');
                 }
                 }); */
                store.default.commit('xhrGoLogin');
            } else {
                MessageBox.alert(msg, '错误提示');
            }
            break;
        case 11:
            if (status === 403) {
                /* MessageBox.alert('您当前的会话已超时，请重新登录', '错误提示', {
                 confirmButtonText: '去登录',
                 callback: () => {
                 this.$router.push('/login');
                 }
                 }); */
                store.default.commit('xhrGoLogin');
            }
            break;
        case 20:
            // Message.error(msg);
            break;
        case 30:
            router.push('/manage');
            // router.push(msg);
            break;
        case 200:
            msg && Message.success(msg);
            break;
        case 400:
            break;
        case 404:
            router.push('/404');
            break;
        case 500:
            router.push('/500');
            break;
        // default:
        //     Message.error('网络异常，请稍后再试~');
        //     break;
    }

    /**
     * 清除登录信息
     */
    function clearLoginMsg() {
        window.localStorage.clear();
    }

    window.clearLoginMsg = clearLoginMsg;
};

export const errHandler = (res) => {

    // 没网
    /* if (!res.body) {
     MessageBox.alert('请确认网络是否连通，否则会造成当前工作丢失', '掉线了？', {
     confirmButtonText: '好的，我知道了'
     });
     return false;
     } */
};

export const defaultUserFace = 'http://upyun.umu.netqq.net/static/userface.png';
export const teamId = () => {
    return window.localStorage.getItem('team_id');
};
