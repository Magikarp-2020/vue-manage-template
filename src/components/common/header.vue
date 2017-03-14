<template>
    <div>
        <img class="header-logo" :src="logo" alt="">
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
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            logo: {
                type: String,
                default: ''
            }
        },
        methods: {
            headMenuChange(common) {
                switch (common) {
                    case 'loginOut':
                        this.loginOut();
                        break;
                }
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
