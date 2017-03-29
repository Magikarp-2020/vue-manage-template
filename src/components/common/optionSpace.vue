<template>
    <div class="option-space clearfix">
        <div class="clearfix">
            <div class="option-space--left">
                <slot name="left"></slot>
                <el-button @click="handlerMore">显示更多搜索选项</el-button>
            </div>
            <div class="option-space--right">
                <slot name="right"></slot>
            </div>
        </div>
        <transition>
            <div class="option-space--more" :class="{'option-space--more-active': showMore}">
                <div class="option-space--more-wrapper">
                    <el-form :label-width="itemLabelWidth" :model="model">
                        <el-row :gutter="itemLabelGutter">
                            <slot name="more"></slot>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
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
                if (this.showMore) {
                    this.$el.querySelector('.option-space--more').style.height = this.$el.querySelector('.option-space--more-wrapper').clientHeight + 'px';
                    setTimeout(() => {
                        this.$el.querySelector('.option-space--more').style.height = 'auto';
                    }, 500);
                } else {
                    this.$el.querySelector('.option-space--more').style.height = 0;
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
