<template>
    <a class="header-message" href="javascript:;" v-popover:information>
        <el-badge :is-dot="list && list.length ? true : false" v-if="list && list.length" class="item">
            <i class="iconfont icon-xiaoxi3"></i>
        </el-badge>
        <i class="item iconfont icon-xiaoxi3" v-else=""></i>
        <el-popover
                ref="information"
                placement="bottom"
                width="330"
                v-model="informationShow"
                popper-class="pd0"
                trigger="click">
            <ul class="information-box" @mousewheel="onScroll">
                <li class="information-item" v-for="l in list" v-if="list && list.length">
                    <div class="title">
                        <h3 class="oflp">{{l.data.name}}</h3>
                        <span class="time">{{l.published * 1000 | date}}</span>
                    </div>
                    <div class="content" v-if="l.data.content">
                        <p class="oflp">
                        </p>
                    </div>
                </li>
            </ul>

            <div class="no-more" v-if="!(list && list.length)">
                无未读消息
            </div>

            <router-link to="/main/other/information">
                <div class="information-more information-item" @click="informationShow = false">
                    查看全部
                </div>
            </router-link>
        </el-popover>
    </a>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                informationShow: false
            };
        },
        computed: {
            list() {
                return this.$store.state.information.list;
            }
        },
        created() {
        },
        methods: {
            onScroll(e) {
//                e.stopPropagation();
//                e.preventDefault();
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .information-box {
        padding: 0 !important;
        max-height: 60vh;
        width: 328px;
        position: relative;
        overflow: auto;
        .information-item {
            padding: 10px;
            display: block;
            cursor: pointer;
            border-bottom: 1px solid #D3DCE6;
            &:last-of-type {
                border-bottom: none;
            }
            &:hover {
                background: #F9FAFC;
            }
            .title {
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                color: #1F2D3D;
                h3 {
                    width: 100px;
                    display: inline-block;
                }
                .time {
                    color: #8492A6;
                    font-size: 12px;
                    float: right;
                }
            }
            .content {
                margin-top: 6px;
                font-size: 12px;
                color: #324057;
            }
        }
    }

    .information-more {
        padding: 0;
        height: 30px;
        text-align: center;
        border-top: 1px solid #D3DCE6;
        line-height: 30px;
        font-size: 14px;
        color: #475669;
        cursor: pointer;
    }

    .no-more{
        font-size: 14px;
        text-align: center;
        line-height: 33px;
        color: #8492A6;
    }
</style>
