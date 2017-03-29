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
                require(['views/father/child1'], resolve);
            }
        }, {
            path: 'child2',
            key: 'myHome',
            text: '二儿子',
            jurisdiction: true,
            icon: 'el-icon-setting',
            component: resolve => {
                require(['views/father/child2'], resolve);
            }
        }
    ]
}, {
    path: 'demo',
    key: 'demo',
    text: '示例',
    jurisdiction: true,
    icon: 'el-icon-setting',
    component: resolve => {
        require(['views/router-bridge'], resolve);
    },
    children: [
        {
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
            path: 'picture',
            key: 'picture-list',
            text: '图片列表',
            jurisdiction: true,
            icon: 'el-icon-setting',
            component: resolve => {
                require(['views/demo/pictureList'], resolve);
            }
        }
    ]
}, {
    path: 'human',
    key: 'human',
    text: '人员管理',
    jurisdiction: true,
    icon: 'el-icon-setting',
    component: resolve => {
        require(['views/router-bridge'], resolve);
    },
    children: [
        {
            path: 'staff',
            key: 'staff',
            text: '员工管理',
            jurisdiction: true,
            component: resolve => {
                require(['views/human/staff'], resolve);
            }
        }, {
            path: 'role',
            key: 'role',
            text: '角色管理',
            jurisdiction: true,
            component: resolve => {
                require(['views/human/role'], resolve);
            }
        }
    ]
}, {
    path: 'settings',
    key: 'settings',
    text: '系统设置',
    jurisdiction: true,
    icon: 'el-icon-setting',
    component: resolve => {
        require(['views/router-bridge'], resolve);
    },
    children: [
        {
            path: 'param',
            key: 'param',
            text: '系统参数',
            jurisdiction: true,
            component: resolve => {
                require(['views/settings/param'], resolve);
            }
        }, {
            path: 'dict',
            key: 'dict',
            text: '系统字典',
            jurisdiction: true,
            component: resolve => {
                require(['views/settings/dict'], resolve);
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
