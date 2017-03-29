<template>
    <div class="option-space clearfix">
        <div class="clearfix">
            <div class="option-space--left">
                <slot name="left"></slot>
                <el-button @click="handlerMore" v-if="more">显示更多搜索选项</el-button>
            </div>
            <div class="option-space--right">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="option-space--more" :class="{'option-space--more-active': showMore}" v-if="more">
            <div class="option-space--more-wrapper">
                <el-form :label-width="itemLabelWidth" :model="model">
                    <el-row :gutter="itemLabelGutter">
                        <slot name="more"></slot>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import $ from 'assets/jquery-vendor';
    export default {
        name: 'optionSpace',
        props: {
            more: {
                type: Boolean,
                default: false
            },
            itemLabelWidth: {
                type: String,
                default: ''
            },
            itemLabelGutter: {
                type: Number,
                default: 10
            },
            model: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                showMore: false
            };
        },
        methods: {
            handlerMore() {
                this.showMore = !this.showMore;
                let el = $(this.$el);
                el.find('.option-space--more').stop(true);
                if (this.showMore) {
                    el.find('.option-space--more').animate({height: el.find('.option-space--more-wrapper').height()}, function () {
                        el.find('.option-space--more').height(el.find('.option-space--more-wrapper').height());
                    });
                } else {
                    el.find('.option-space--more').animate({height: 0}, function () {
                    });
                }
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">
    .option-space {
        padding: 0 10px 10px;
        &--left {
            float: left;
        }
        &--right {
            float: right;
        }
    }
</style>
