/**
 * Created by lichao on 2017/3/15.
 */

export default {
    state: {
        info: {}
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.info = userInfo;
            window.localStorage.setItem('userInfo', JSON.stringify());
        }
    },
    actions: {}
};
