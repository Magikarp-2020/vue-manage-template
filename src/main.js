// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import ElementUI from 'element-ui';
import VueResource from 'vue-resource';

import router from 'router/index.js';
import App from 'views/App.vue';

import 'static/css/style.scss';
import './filter/index.js';
import store from 'stores/store.js';

import 'element-ui/lib/theme-default/index.css';
import {defaultUserFace} from 'config/config';

document.addEventListener('error', (e) => {
    let elem = e.target;
    if ((elem.className.indexOf('userface-hook') > -1)) {
        elem.src = defaultUserFace;
    }
}, true);

Vue.use(ElementUI);
Vue.use(VueResource);

new Vue({
    template: '<App/>',
    components: {App},
    router,
    store
}).$mount('#vueApp');

Date.prototype.Format = function (fmt) {
    let o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};
