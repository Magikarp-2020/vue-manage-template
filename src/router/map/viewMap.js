/**
 * Created by lichao on 2016/12/29.
 */
export default [{
    path: '',
    key: 'myHome',
    text: '首页',
    jurisdiction: true,
    icon: 'el-icon-setting',
    component: resolve => {
        require(['views/index'], resolve);
    }
}, {
    path: 'demo1',
    key: 'myHome',
    text: '菜单1',
    jurisdiction: true,
    icon: 'el-icon-setting',
    component: resolve => {
        require(['views/demo/view1'], resolve);
    }
}, {
    path: 'list',
    key: 'list',
    text: '列表',
    jurisdiction: true,
    icon: 'el-icon-setting',
    component: resolve => {
        require(['views/demo/list'], resolve);
    }
}, {
    path: 'father',
    key: 'myHome',
    text: '父菜单',
    jurisdiction: true,
    icon: 'el-icon-setting',
    component: resolve => {
        require(['views/router-bridge'], resolve);
    },
    children: [
        {
            path: 'child1',
            key: 'myHome',
            text: '大儿子',
            jurisdiction: true,
            icon: 'el-icon-setting',
            component: resolve => {
                require(['views/demo/child1'], resolve);
            }
        }, {
            path: 'child2',
            key: 'myHome',
            text: '二儿子',
            jurisdiction: true,
            icon: 'el-icon-setting',
            component: resolve => {
                require(['views/demo/child2'], resolve);
            }
        }
    ]
}, {
    path: '*',
    key: '404',
    text: '404',
    jurisdiction: true,
    hide: true,
    component: resolve => {
        require(['views/base/404'], resolve);
    }
}];
