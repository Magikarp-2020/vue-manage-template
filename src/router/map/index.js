/**
 * Created by lichao on 2016/12/9.
 */
import viewMap from './viewMap';

const routes = [{
    path: '/',
    component: resolve => {
        require(['views/login'], resolve);
    }
}, {
    path: '/main',
    component: resolve => {
        require(['views/main'], resolve);
    },
    children: viewMap
}];

export default routes;
