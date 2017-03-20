<template>
    <div>
        <limit-btn limit="any:r" @click="showPicture">图片弹窗</limit-btn>
        <div class="gallery">
            <a href="static/images/test1.jpg">
                <img src="static/images/test1.jpg"/>
            </a>
        </div>

        <ul class="gallery">
            <li>
                <a href="static/images/test1.jpg">
                    <img src="static/images/test1.jpg"/>
                </a>
            </li>
            ......
        </ul>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        methods: {
            showPicture() {
                this.$store.commit('picturePopupShow');
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
