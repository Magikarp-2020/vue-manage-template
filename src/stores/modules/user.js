/**
 * Created by lichao on 2017/3/15.
 */

export default {
    state: {
        info: {}
    },
    getters: {
        limitList(state) {
            return state.info.permissions || {};
        }
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.info = userInfo;
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
    },
    actions: {}
};
