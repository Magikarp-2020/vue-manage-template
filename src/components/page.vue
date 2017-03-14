<template>
    <div>
        <el-pagination
                layout="prev, pager, next"
                :total="parseInt(data.total) || 1"
                :current-page="parseInt(data.current_page) || 1"
                :page-size="parseInt(data.page_size) || 1"
                @current-change="currentChange">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
//        import $ from 'assets/jquery-vendor';
    export default {
        props: {
            data: {
                type: Object,
//                required: true,
                default() {
                    return {
                        total: 1,
                        current_page: 1,
                        page_size: 1
                    };
                }
            },
            scroll: {
                type: Boolean,
                default: false
            },
            scrollTo: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                current_page: 1
            };
        },
        created() {
//            this.$emit('change', 1);
        },
        methods: {
            currentChange(val) {
                this.$emit('change', val);
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
