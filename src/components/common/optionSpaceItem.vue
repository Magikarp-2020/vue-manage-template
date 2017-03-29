<template>
    <el-col :span="6" class="option-space--item" :md="6" :lg="4" :sm="8" :xs="12">
        <el-form-item :label="label" :prop="prop" :rules="rules">
            <slot></slot>
        </el-form-item>
    </el-col>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'optionSpaceItem',
        props: {
            label: {
                type: String,
                default: ''
            },
            rules: {
                type: [Array, Object],
                default() {
                    return {};
                }
            },
            prop: {
                type: [Number, String],
                default: ''
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
