[TOC]

# vue-manage-template

vue的后台管理模板,利用  [element-ui](http://element.eleme.io/#/zh-CN)  结合自己项目整理出来的,还有很多不足希望大家多多理解,
如有意见或建议欢迎 issue，如果你觉得还不错不妨点个 star  吧 [在线演示地址](https://skioll.github.io/vue-manage-template/dist/#/)

```
git clone https://github.com/skioll/vue-manage-template.git
npm install
npm run dev
npm run build
```



```
open://localhost:8085/
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



### 代码规范

> 方便大家一起规范代码，方便维护，默认起始位置 src/

1. 组件放于 `components `目录下
2. 用于前端项目开发的配置文件统一放在 `config `目录下
3. 路由配置放于 `router` 目录下
4. 与服务端通讯的接口放在 `servers` 文件目录下 **注意，一个js文件应当对应一个模块的接口，且不可在其余地方不经过services调用私自发起请求**
5. 独立的验证方式放在`validate`下
6. 工具类放在`util`下 也可另外引入如[Underscore](http://github.com/jashkenas/underscore/)的工具类
7. 过滤器(filter)放在`filter` 下
8. 静态资源放在 `/static` 下 部分用于缓存的文件放在 `assets `  下



## 存在的 loading 动画

1. 加载文件时loading动画，详情及修改方式见[修改初始化loading动画](#修改初始化loading动画)
2. 当发起 ajax 请求时的loading 动画，详情及修改方式见  [根据后端业务确定XMLHttpRequest所需要的配置](#根据后端业务确定XMLHttpRequest所需要的配置) 及  [封装的xhr使用方法详解](#封装的xhr使用方法详解) 





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



### 根据后端业务确定XMLHttpRequest所需要的配置



> src/services/xhr/xhr.js:10

根据公司实际业务情况需要定义部分自定义 header 头以及Content-Type，在参考[vue-resource](https://github.com/pagekit/vue-resource)后做出以下修改:



```javascript
Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.http.headers.common['Accept'] = 'application/json';
// 它是用来处理通过设置方法为true的编码application/json请求。
Vue.http.options.emulateJSON = true;
// 跨域服务端设置COOKIE
Vue.http.options.credentials = true;
```



### 封装的 xhr 使用方式详解

> src/services/xhr/xhr.js:14

```
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



### 修改初始化loading动画

1. 修改图片 `static/images/loading.gif`;

2. 修改css `static/css/loading.css`


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
