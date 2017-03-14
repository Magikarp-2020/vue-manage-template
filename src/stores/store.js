/**
 * Created by lichao on 2016/12/29.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import demo from './modules/demo';
import loading from './modules/loading';
import config from './modules/config';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        demo,
        loading,
        config
    }
});

export default store;
