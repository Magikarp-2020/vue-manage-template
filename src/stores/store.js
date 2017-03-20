/**
 * Created by lichao on 2016/12/29.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import demo from './modules/demo';
import loading from './modules/loading';
import config from './modules/config';
import user from './modules/user';
import components from './modules/components';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        demo,
        loading,
        config,
        user,
        components
    }
});

export default store;
