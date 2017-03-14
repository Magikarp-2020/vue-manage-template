[TOC]

# vue-manage-template

vue的后台管理模板,利用  [element-ui](http://element.eleme.io/#/zh-CN)  结合自己项目整理出来的,有很多不足希望大家多多包涵,欢迎issue/star [在线演示地址](https://skioll.github.io/vue-manage-template/dist/#/) 

```
git clone https://github.com/skioll/vue-manage-template.git
npm install
npm run dev
npm run build
```


## 技术栈
- MVVM框架:  **Vue 2.0**
- ui框架:   **element-ui**
- 源码:  es6
- 代码风格检查:  eslint
- 构建工具:  webpack
- 前端路由:  vue-router
- 状态管理:  vuex
- 服务端通讯:  vue-resource


## 目录划分

```tex
│  index.html
│  package.json
│  README.md
├─build -- webpack
├─config -- webpack 配置
├─dist  -- 打包后生成的文件
├─src
│  │  main.js -- 项目入口
│  ├─assets -- 资源
│  ├─components -- 组件
│  ├─config -- 配置
│  ├─filter -- vue 过滤器
│  ├─router -- 路由配置
│  ├─services -- 服务端通讯
│  │  └─xhr
│  │          xhr.js
│  ├─stores -- vuex
│  ├─util -- util
│  ├─validate
│  └─views
│      │  App.vue -- 根文件
│      │  index.vue -- 主页
│      │  login.vue -- 登录
│      │  main.vue -- 公共部分  (带有header/aside的框子)
│      │  router-bridge.vue -- 用于 vue-router 过度
│      ├─base
│      │      404.vue
│      └─demo
└─static
    ├─css
    ├─font
    ├─images
    └─js
```

## 小技巧


### 方便后端的同学修改接口地址

在项目使用中，经常有后端的同学需要**修改api请求域名**，为避免每次都需要前端人员去修改，在 `index.html` 中增加全局API访问域名的配置

> index.html:16

```html
<!-- 修改可改变访问域名 -->
<script>window.CHANGE_ROOT = '';</script>
```

**打包后可在dist/index.html修改**

> src/config/config.js:30

```javascript
/**
 * 根据配置获取域名
 * localhost/127.0.0.1 通过cors访问接口
 * @return {string}
 */
export const getRoot = () => {
    let ROOT = '';
    if (window.CHANGE_ROOT) {
        ROOT = window.CHANGE_ROOT;
    } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        ROOT = '//dev.demo.local';
    } else {
        ROOT = '';
    }
    return ROOT;
};
```

### 因为外网网速原因增加 loading 窗口

项目中使用了 `require` 来懒加载页面，所以在外网环境中因为网速原因在页面加载时会给用户**假死**错觉。

> src/router/index.js:12

```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './map/index';
import store from 'stores/store';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
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
```

### 通过路由配置生成菜单及权限管理

> router配置 可见 `src/router/map/viewMap.js`

```javascript
{
    path: '',
    key: 'myHome',
    // 面包屑
    text: '首页',
    // 是否具有权限,可结合后端接口设置权限
    jurisdiction: true,
    icon: 'el-icon-setting',
    component: resolve => {
        require(['views/index'], resolve);
    }
}
```

> menu

```html
<el-menu :default-active="getRouterLink" class="menu-self" :router="true">
    <el-submenu v-for="(map,index) in routerMap" v-if="map.children && !map.hide && map.jurisdiction" :index="index+''">
        <template slot="title"><i :class="map.icon"></i>{{map.text}}</template>
        <el-menu-item :index="'/main/'+map.path+'/'+child.path" v-for="(child,childIndex) in map.children" v-if="!child.hide && child.jurisdiction">
            {{child.text}}
        </el-menu-item>
    </el-submenu>
    <el-menu-item :index="'/main/'+map.path" v-else-if="!map.hide && map.jurisdiction">
        <i :class="map.icon"></i>
        {{map.text}}
    </el-menu-item>
</el-menu>
```

### 减少打包后文件大小

> config/index.js:11

在 vue-cli 生成的项目中,打包后的文件夹大小往往大的不契合常理,在日常开发中发现是webpack生成了`*.map.js`文件,会有很大的体积,后关闭

```
productionSourceMap: false
```

## 下版改进

- [ ] 菜单级别 + 1
- [ ] 样式美化
