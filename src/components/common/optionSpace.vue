<template>
    <div class="option-space clearfix">
        <div class="option-space--more" :class="{'option-space--more-active': showMore}" v-show="more">
            <div class="option-space--more-wrapper">
                <el-form :label-width="itemLabelWidth" :model="model" ref="searchHighForm">
                    <el-row :gutter="itemLabelGutter">
                        <slot name="more"></slot>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="clearfix">
            <div class="option-space--left">
                <div v-show="!showMore">
                    <slot name="left"></slot>
                    <el-button type="primary" @click="search">查询</el-button>
                </div>
                <div v-if="more" v-show="showMore">
                    <el-button @click="searchHigh('searchHighForm')" type="primary">高级查询</el-button>
                    <el-button @click="clear('searchHighForm')" type="primary">清空</el-button>
                </div>
            </div>
            <div class="option-space--right">
                <el-button @click="handlerMore" v-if="more" type="text">{{moreBtnText}}</el-button>
                <span class="mgl10">
                    <slot name="right"></slot>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
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
                default: '80px'
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
        computed: {
            moreBtnText() {
                return this.showMore ? '关闭高级查询' : '高级查询';
            }
        },
        methods: {
            handlerMore() {
                this.showMore = !this.showMore;
                let el = $(this.$el);
                el.find('.option-space--more').stop(true);
                if (this.showMore) {
                    el.find('.option-space--more').animate({height: el.find('.option-space--more-wrapper').height()}, function () {
                        el.find('.option-space--more').height('inherit');
                    });
                } else {
                    el.find('.option-space--more').animate({height: 0}, function () {
                    });
                }
            },
            search() {
                this.$emit('search');   // 普通查询
            },
            searchHigh(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    this.$emit('searchHigh');   // 高级查询
                  } else {
                    return false;
                  }
                });
            },
            clear(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">
</style>
