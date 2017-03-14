<template>
    <div v-loading.body="loading" class="main-box" :class="{'menu-hide': !menuStatus}">
        <header class="header">
            <img class="header-logo" src="~assets/logo.png" alt="">
            <div class="header-right-box">
                <el-dropdown trigger="click" @command="headMenuChange" class="fll">
                    <a class="header-right-item header-head clearfix" href="javascript:;">
                        <img class="header-head-img userface-hook" src="~assets/test.png">
                        <div class="caret-box"><span class="caret"></span></div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </a>
                </el-dropdown>
            </div>
        </header>
        <aside class="aside">
            <!--用css3选择器定义下方高度，需要写上面方便c3查找-->
            <!--<div class="menu-bottom">
                消息
            </div>-->
            <div class="menu-box">
                <v-menu></v-menu>
            </div>


            <div class="menu-animate" @click="changeMenuStatus">
                <i class="iconfont"
                   :class="{'icon-cbr': menuStatus, 'icon-zhankaicelalan': !menuStatus}"></i>
            </div>
        </aside>

        <div class="common-content">
            <div class="breadcrumb">
                <breadcrumb></breadcrumb>
            </div>
            <div id="contentMain">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import menu from 'components/menu.vue';
    import breadcrumb from 'components/breadcrumb/index';

    export default {
        data() {
            return {
                loading: false
            };
        },
        created() {

        },
        methods: {
            changeMenuStatus() {
                this.$store.commit('changeMenuStatus', !this.menuStatus);
            },
            headMenuChange(common) {
                switch (common) {
                    case 'loginOut':
                        this.loginOut();
                        break;
                }
            },
            loginOut() {
                this.$store.commit('loginOut');
                this.$router.push('/');
            }
        },
        computed: {
            menuStatus() {
                return this.$store.state['config'].menuStatus;
            }
        },
        watch: {},
        components: {
            vMenu: menu,
            breadcrumb
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
