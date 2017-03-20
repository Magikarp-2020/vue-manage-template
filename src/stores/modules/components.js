/**
 * Created by lichao on 2017/3/17.
 */
export default {
    state: {
        picturePopupShow: false,
        picturePopupData: {}
    },
    getter: {},
    mutations: {
        picturePopupShow(state, data) {
            state.picturePopupShow = true;
        },
        picturePopupHide(state, data) {
            state.picturePopupShow = false;
        }
    }
};
