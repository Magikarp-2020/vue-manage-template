/**
 * Created by lichao on 2017/1/5.
 */
import {MessageBox} from 'element-ui';
import router from 'router/index';

const config = {
    state: {
        // 需要登录弹窗  true 为可弹出状态
        needLoginDialog: true,
        // 菜单状态  true：打开，false关闭
        menuStatus: true
    },
    mutations: {
        /**
         * 可以理解为初始化
         */
        setUserInfo(state, userInfo) {
            try {
                userInfo = JSON.parse(userInfo);
            } catch (e) {
            }

            state.needLoginDialog = true;
            /*  */
        },
        xhrGoLogin(state) {
            if (state.needLoginDialog) {
                state.needLoginDialog = false;
                MessageBox.alert('您当前的会话已超时或未登录，请重新登录', '错误提示', {
                    confirmButtonText: '去登录',
                    callback: () => {
                        // Vue.$router.push('/login');
                        router.push('/');
                    }
                });
            }
        },
        loginOut(state, val) {
            state.needLoginDialog = false;
            state.menuStatus = true;
            window.localStorage.clear();
        },
        changeMenuStatus(state, val) {
            state.menuStatus = val;
        }
    },
    actions: {
    }
};

export default config;
