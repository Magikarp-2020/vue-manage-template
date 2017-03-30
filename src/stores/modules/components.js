/**
 * Created by lichao on 2017/3/17.
 */
export default {
    state: {
        breadcrumb: {
            /**
             * [{text: 'text', icon: 'icon', click: [[fun]]}]
             */
            buttonList: []
        }
    },
    getter: {
    },
    mutations: {
        setBreadcrumbButton(state, list) {
            console.log(list);
            state.breadcrumb.buttonList = list;
        }
    }
};
