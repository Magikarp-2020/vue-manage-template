import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './map/index';
import store from 'stores/store';

Vue.use(VueRouter);

const router = new VueRouter({
    // mode: 'history',
    routes // （缩写）相当于 routes: routes
});
let routerTimer = null;
router.beforeEach((to, from, next) => {
    routerTimer = setTimeout(() => {
        store.commit('addLoading', {
            key: 'view',
            text: '加载页面中...'
        });
    }, 50);
    // 太快了反应不过来
    setTimeout(next, 50);
});

router.afterEach(route => {
    console.log(routerTimer);
    clearTimeout(routerTimer);
    store.commit('removeLoading', 'view');
});

export default router;
