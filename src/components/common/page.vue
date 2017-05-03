<template>
    <div>
        <p class="pagination-info">第 <span class="text-primary">1{{data.current_page}}</span> 页 / 共 <span class="text-primary">{{data.totalPage}}</span> 页，每页 {{data.page_size}} 条，</p>
        <el-pagination
            layout="total, prev, pager, next, jumper"
            :total="parseInt(data.total) || 1"
            :current-page="parseInt(data.current_page) || 1"
            :page-size="parseInt(data.page_size) || 1"
            @current-change="currentChange">
        </el-pagination>
    </div>
</template>

<script>
    /**
     * props:
     *
     */
    export default {
        name: 'page',
        props: {
            data: {
                type: Object,
                required: true,
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
