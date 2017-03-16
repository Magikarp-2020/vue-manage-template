[TOC]

# vue-manage-template

vue的后台管理模板,利用  [element-ui](http://element.eleme.io/#/zh-CN)  结合自己项目整理出来的,还有很多不足希望大家多多理解,
如有意见或建议欢迎 issue，如果你觉得还不错不妨点个 star⭐ ⭐ ⭐  吧 [在线演示地址](https://skioll.github.io/vue-manage-template/dist/#/)

```
git clone https://github.com/skioll/vue-manage-template.git
npm install
npm run dev
npm run build
```



```
open://localhost:8087/
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
vue-manage-template
  │  index.html
  │  package.json
  │  README.md
  ├─build -- webpack
  ├─config -- webpack 配置
  ├─dist  -- 打包后生成的文件
  ├─mock  -- 模拟数据
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
   1. 路由最好按照菜单层级划分，对应的父级可利用`src/views/router-bridge.vue` 文件来过渡，详情可见[router菜单的分级](#router菜单的分级) 及 [通过路由配置生成菜单及权限管理](#通过路由配置生成菜单及权限管理)
4. 与服务端通讯的接口放在 `servers` 文件目录下 **注意，一个js文件应当对应一个模块的接口，且不可在其余地方不经过services调用私自发起请求**
5. 独立的验证方式放在`validate`下
6. 工具类放在`util`下 也可另外引入如[Underscore](http://github.com/jashkenas/underscore/)的工具类
7. 过滤器(filter)放在`filter` 下
8. 静态资源放在 `/static` 下 部分用于缓存的文件放在 `assets `  下


#### 全局组件的安装

> 于 src/components/registerGlobalComponents.js 注册全局组件，后再 main.js(入口文件) 引入

```javascript
// registerGlobalComponents.js
import Vue from 'vue';
import limitBtn from './common/limitButton';

Vue.component(limitBtn.name, limitBtn);
```



```javascript
// main.js
import 'components/registerGlobalComponents';
```








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
    } else if (process.env.NODE_ENV === 'development') { // 判断是否为 dev 环境    -> config/dev.env.js:5
        ROOT = '//dev.demo.local';
    } else {
        ROOT = '';
    }
    return ROOT;
};
```



### dev 下通过 mock 模拟数据（未完善）

>  vue-manage-template 下 新增 `mock` 文件夹用于存放模拟数据

修改 `build/dev-server.js:59` 添加 `express`静态代理

```javascript
app.use('/mock', express.static('./mock'));
```

截止于 2017-3-15 18:04:15 时临时解决方案为 `src/config/config.js:51` 将后端统一命名空间更改为`mock` 后 `src/services/xhr/xhr.js:31`  添加 `.json` 后缀



> src/config/config.js:51

```javascript
// const CONTEXT_NAME = conf.context_name || 'api';  更改为 ↓↓
const CONTEXT_NAME = conf.context_name || 'mock';
```

> src/services/xhr/xhr.js:31

```javascript
url += '.json';
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
    // 对应后端返回的权限
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

```vue
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



### 功能模块的权限控制

> 例，操作商品时有对应的CRUD权限，这时，我们需要对用户对应的操作做出限制

1.  操作按钮 disabled

   加入了新的组件  `limit-btn` 用于匹配及判断用户是否具有对应操作按钮的权限**注意：此功能需要先与后端协调好对应的权限名，详情可以看代码注释**

   > src/components/common/limitButton.vue

   ```vue
   <template>
       <el-button :type="type" :size="size" :icon="icon" :disabled="limitNoAccess" @click="handleClick">
           <slot></slot>
       </el-button>
   </template>

   <script type="text/ecmascript-6">
       /**
        * 权限按钮：
        * 基于element-ui button 组件二次封装
        * 后端返回权限格式 :
        * {
        *      "permissions":{     //拥有权限列表
        *      "resourceName1": ["c","u"],
        *      "resourceName2": ["*"]
        * }
        *
        * 组件传入的权限格式:      limitName:option1,option2
        *
        * props: type size icon limit
        * emit: click
        *
        */
       export default {
           name: 'limitBtn',
           props: {
               type: {
                   type: String,
                   default: ''
               },
               size: {
                   type: String,
                   default: ''
               },
               icon: {
                   type: String,
                   default: ''
               },
               limit: {
                   type: String,
                   default: ''
               }
           },
           data() {
               return {};
           },
           computed: {
               limitList() {
                   return this.$store.getters.limitList;
               },
               /**
                * 将传入的权限数据转化为 json
                * @return {{key: string, value: Array}}
                */
               btnLimit() {
                   let json = {
                       key: '',
                       value: []
                   };

                   try {
                       if (typeof this.limit === 'string') {
                           json.key = this.limit.split(':')[0];
                           json.value = this.limit.split(':')[1].split(',');
                       }
                   } catch (e) {
                       throw new Error('权限传入格式错误！');
                   }

                   return json;
               },
               /**
                * 判断是否具有相应权限
                * @return {boolean}
                */
               limitNoAccess() {
                   // 当 limitList 为 * 时开通所有权限
                   if (this.limitList === '*') {
                       return false;
                   }

                   let limit = this.limitList[this.btnLimit.key];
                   if (limit) {
                       // 对应权限为 * 开通当前功能的所有权限
                       if (limit === '*') {
                           return false;
                       }
                       let arrLimit = true;
                       // 同时需要多个权限的情况（应该遇不到吧）;
                       this.btnLimit.value.forEach(value => {
                           if (limit.indexOf(value) === -1) {
                               arrLimit = false;
                           }
                       });
                       return !arrLimit;
                   }
                   return true;
               }
           },
           methods: {
               handleClick() {
                   this.$emit('click');
               }
           }
       };

   </script>
   ```

   ​

### router的配置

> src/router/map/viewMap.js

单级菜单：

```javascript
{
    path: '',
    key: 'myHome',
    text: '首页',
    jurisdiction: true,
    icon: 'el-icon-setting',
    component: resolve => {
        require(['views/index'], resolve);
    }
}
```

两级菜单(暂未实现 3/4 级 需要的可自行添加)

父级菜单 `component ` 需要使用 `router-bridge` 空页面来实现路由分级效果，尽量避免使用多个空页面，不方便于后期维护

```javascript
{
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
        }
    ]
}
```

> src/views/router-bridge.vue

```vue
<template>
    <router-view></router-view>
</template>

<script type="text/ecmascript-6">
    export default {};

</script>

<style lang="scss" rel="stylesheet/scss">

</style>

```


### 减少打包后文件大小

> config/index.js:11

在 vue-cli 生成的项目中,打包后的文件夹大小往往大的不契合常理,在日常开发中发现是webpack生成了`*.map.js`文件,会有很大的体积,后关闭

```
productionSourceMap: false
```



### font图标

使用iconfont.cn 的图片，需要使用的可以进入 `static/font/demo_fontclass.html` 查看className 使用，本项目内置的图标是从 http://www.iconfont.cn/plus/collections/detail?cid=44 图标库中选中的，需要其他的图标可自行添加



## 下版改进

- [ ] 菜单级别 + 1
- [ ] 样式美化



### 日志

#### 2017年3月15日

1. - [x] 更改布局方式，目前为 header/aside 通过定位定位上的，可以更改为通过 flex 实现

   >  不方便设置高度，暂不处理

2. - [ ] 添加消息模块样式





#### 2017年3月16日

1. - [x] 增加权限控制