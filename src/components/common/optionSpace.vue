<template>
    <div class="option-header clearfix">
        <div class="option-header--left">
            <slot name="left"></slot>
        </div>
        <div class="option-header--right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'optionSpace'
    };

</script>

<style lang="scss" rel="stylesheet/scss">
    .option-header {
        padding:0 10px 10px;
        &--left {
            float: left;
        }
        &--right {
            float: right;
        }
    }
</style>
