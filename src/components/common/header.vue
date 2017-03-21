<template>
    <div class="clearfix">
        <img class="header-logo" :src="logo" alt="">
        <div class="header-right-box">
            <message class="header-right-item"></message>
            <userInfo class="header-right-item"></userInfo>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import message from './message';
    import userInfo from './userInfo';
    import systemService from 'services/systemService';
    export default {
        props: {
            logo: {
                type: String,
                default: ''
            }
        },
        computed: {
            userInfo() {
                return this.$store.state.user.info;
            }
        },
        methods: {
            headMenuChange(common) {
                switch (common) {
                    case 'loginOut':
                        this.loginOut();
                        break;
                }
            },
            loginOut() {
                systemService.loginOut().then(({data}) => {
                    if (data.data) {
                        this.$store.commit('setUserInfo', {});
                        window.localStorage.clear();
                        this.$router.push('/');
                    }
                });
            }
        },
        components: {
            message,
            userInfo
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
