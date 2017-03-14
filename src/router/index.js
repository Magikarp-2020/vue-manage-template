import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './map/index';
import store from 'stores/store';

Vue.use(VueRouter);

const router = new VueRouter({
    // mode: 'history',
    routes // （缩写）相当于 routes: routes
});

router.beforeEach((to, from, next) => {
    store.commit('addLoading', {
        key: 'view',
        text: '加载页面中...'
    });
    // 太快了反应不过来
    setTimeout(next, 50);
});

router.afterEach(route => {
    store.commit('removeLoading', 'view');
});

export default router;
