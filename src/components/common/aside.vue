<template>
    <div>
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
    </div>
</template>

<script type="text/ecmascript-6">
    import menu from './menu.vue';

    export default {
        methods: {
            changeMenuStatus() {
                this.$store.commit('changeMenuStatus', !this.menuStatus);
            }
        },
        computed: {
            menuStatus() {
                return this.$store.state['config'].menuStatus;
            }
        },
        components: {
            vMenu: menu
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
