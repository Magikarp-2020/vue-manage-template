/**
 * Created by lichao on 2017/2/22.
 */
/**
 * 控制全屏 loading 窗
 */
import {Loading} from 'element-ui';
let loadingList = [];

export default {
    state: {
        loadingList: []
    },
    mutations: {
        addLoading(state, config) {
            // 虽然官方说的是单利，但是在实际使用过程中由于运行速度的关系会生成多个loading窗  用arr 记录下每个然后当请求完毕全部清除
            loadingList.push(Loading.service({
                fullscreen: true,
                customClass: `full-loading-self loading-name-${config.key}`,
                text: config.text
            }));
            state.loadingList.push(config.key);
        },
        removeLoading(state, name = '') {
            let newArr = [];
            let find = false;
            for (let i = 0; i < state.loadingList.length; i++) {
                let d = state.loadingList[i];
                if (d === name && !find) {
                    find = true;
                } else {
                    newArr.push(d);
                }
            }
            state.loadingList = newArr;
            if (!newArr.length) {
                for (let index in loadingList) {
                    loadingList[index].close();
                }
            }
        }
    }
};
