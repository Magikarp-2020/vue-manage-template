<template>
    <div class="main-box" :class="{'menu-hide': !menuStatus}">
        <header class="header">
            <v-header logo="static/images/logo.png"></v-header>
        </header>
        <aside class="aside clearfix">
            <v-aside></v-aside>
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
    import breadcrumb from 'components/breadcrumb/index';
    import header from 'components/common/header';
    import aside from 'components/common/aside';

    export default {
        computed: {
            menuStatus() {
                return this.$store.state['config'].menuStatus;
            }
        },
        components: {
            breadcrumb,
            vHeader: header,
            vAside: aside
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
