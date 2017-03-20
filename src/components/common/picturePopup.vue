<template>
    <div>
        <input type="file" name="" id="" multiple="multiple">
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        created() {
            this.$store.watch(() => {
                console.log(this.$store);
                return this.$store.state.components.picturePopupShow;
            }, () => {
            });
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
