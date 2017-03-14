# vue-manage-template

```
npm install
npm run dev
npm run build
```

### 方便后端的同学修改接口地址

在项目使用中，经常有后端的同学需要修改api请求接口，为避免每次都需要前端人员去修改，在 `index.html` 中增加全局API访问域名的配置

> index.html:16

```javascript
<!-- 修改可改变访问域名 -->
<script>window.CHANGE_ROOT = '';</script>
```

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

项目中使用了 `require` 来懒加载页面，所以在外网环境中因为网速原因在页面加载时会给用户假死错觉。

> src/router/index.js:12

```javascript
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
