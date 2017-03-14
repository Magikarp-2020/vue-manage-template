<template>
    <el-menu :default-active="getRouterLink" class="menu-self" :router="true">
        <el-submenu v-for="(map,index) in routerMap" v-if="map.children && !map.hide && map.jurisdiction" :index="index+''">
            <template slot="title"><i :class="map.icon || 'el-icon-message'"></i>{{map.text}}</template>
            <el-menu-item :index="'/main/'+map.path+'/'+child.path" v-for="(child,childIndex) in map.children" v-if="!child.hide && child.jurisdiction">
                {{child.text}}
            </el-menu-item>
        </el-submenu>
        <el-menu-item :index="'/main/'+map.path" v-else-if="!map.hide && map.jurisdiction">
            <i :class="map.icon || 'el-icon-message'"></i>
            {{map.text}}
        </el-menu-item>
    </el-menu>
</template>

<script type="text/ecmascript-6">
    import routerMap from 'router/map/viewMap';
    export default {
        data() {
            return {
                routerMap: routerMap
            };
        },
        computed: {
            getRouterLink() {
                return this.$route.path;
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
