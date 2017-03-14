<template>
    <div class="header-crumbs">
        <span v-for="(c,index) in crumbs" :class="{active: index==crumbs.length-1}">{{c}}<span
                v-if="crumbs.length > 1 && index!=crumbs.length-1 && crumbs[0].length">/</span></span>
    </div>
</template>

<script type="text/ecmascript-6">
    import routerMap from 'router/map/viewMap';

    export default {
        computed: {
            crumbs() {
                let router = this.$route.path.replace('/main/', '').split('/');
                let crumb = [];
                for (let i = 0; i < routerMap.length; i++) {
                    let out = routerMap[i];
                    if (out.path === router[0]) {
                        crumb.push(out.text);
                        if (out.children) {
                            for (let l = 0; l < out.children.length; l++) {
                                let inner = out.children[l];
                                if (inner.path === router[1]) {
                                    crumb.push(inner.text);
                                }
                            }
                        }
                    }
                }

                return crumb;
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
