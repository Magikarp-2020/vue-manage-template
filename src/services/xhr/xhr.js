/**
 * Created by lichao on //.
 */

import Vue from 'vue';
import util from 'util/util';
import store from 'stores/store';
import {rootPath, errHandler, successHandler} from 'config/config';

Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.http.headers.common['Accept'] = 'application/json';
Vue.http.options.emulateJSON = true;
Vue.http.options.credentials = true;

/**
 *  XMLHttpRequest
 * @param url
 * @param body get|post 传入的数据
 * @param method get|post
 * @param root 自定义域名，如果没有默认从 src/config/config.js > rootPath 获取
 * @param diyError 自定义错误显示方式，目前根据实际业务存放有部分拦截代码
 * @param diyLoading 自定义loading方式，禁用默认loading
 * @return {Promise}
 */
export default ({url, body = {}, method = 'get', root, diyError = false, diyLoading = false}) => {
    if (!root) {
        url = rootPath() + url;
    } else {
        url = root + url;
    }
    body.team_id = window.localStorage.getItem('at_team');
    return new Promise((resolve, reject) => {
        if (!diyLoading) {
            store.commit('addLoading', {
                key: 'http'
            });
        }
        if (method.toUpperCase() === 'GET') {
            url += ('?' + util.parseParam(body));
            body = {};
        } else {
            if (body.page || body.page_size) {
                url += ('?' + util.parseParam({
                    page: body.page,
                    page_size: body.page_size
                }));
            }
            // delete body.body;
        }
        Vue.http[method](url, body).then((response) => {
            if (!diyLoading) {
                store.commit('removeLoading', 'http');
            }
            if (response.body.code === 200) {
                resolve(response);
            } else {
                reject(response);
            }

            if (!diyError) {
                successHandler(response);
            }
        }, (response) => {
            if (!diyLoading) {
                store.commit('removeLoading', 'http');
            }
            reject(response);
            if (!diyError) {
                errHandler(response);
            }
        });
    });
};
