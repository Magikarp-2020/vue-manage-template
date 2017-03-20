<template>
    <div class="gallery">
        <el-button @click="add">添加</el-button>
        <a :href="image.original" v-for="image in imgList" data-caption="Image caption">
            <img :src="image.thumbnail" alt="First image">
        </a>
    </div>
</template>

<script type="text/ecmascript-6">
    import baguettebox from 'baguettebox.js';
    import 'baguettebox.js/src/baguetteBox.scss';
    export default {
        data() {
            return {
                imgList: [
                    {
                        thumbnail: 'static/images/icon.png',
                        original: 'static/images/test1.jpg'
                    }
                ]
            };
        },
        updated() {
            baguettebox.run('.gallery');
        },
        created() {
            this.$nextTick(() => {
                baguettebox.run('.gallery');
            });

            this.$store.watch(() => {
                return this.$store.state.components.picturePopupShow;
            }, () => {
            });
        },
        methods: {
            add() {
                this.imgList.push({
                    thumbnail: 'static/images/loading.gif',
                    original: 'static/images/test2.jpg'
                });
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
