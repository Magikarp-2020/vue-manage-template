<template>
    <el-button :type="type" :size="size" :icon="icon" :disabled="limitNoAccess" @click="handleClick">
        <slot></slot>
    </el-button>
</template>

<script type="text/ecmascript-6">
    /**
     * 权限按钮：
     * 基于element-ui button 组件二次封装
     * 后端返回权限格式 :
     * {
     *      "permissions":{     //拥有权限列表
     *      "goods": ["c","u"],
     *      "resourceName2": ["*"]
     * }
     *
     * “*” 代表具有所有权限 如：
     *  {
     *      permissions: {
     *          goods: '*'
     *      }
     *      // or
     *      permissions: '*'
     *  }
     * 组件传入的权限格式:      limitName:option1,option2
     *
     * props: type size icon limit
     * emit: click
     *
     * 2017年3月28日15:55:36  修改   格式更换为  role::c,r,u,d
     *
     */
    export default {
        name: 'limitBtn',
        props: {
            type: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            limit: {
                type: String,
                default: '',
                required: true
            }
        },
        data() {
            return {};
        },
        computed: {
            /**
             * 获取权限列表（登录时设置）
             * @return {json}
             */
            limitList() {
                return this.$store.getters.limitList;
            },
            /**
             * 将传入的权限数据转化为 json
             * @return {{key: string, value: Array}}
             */
            btnLimit() {
                let json = {
                    key: '',
                    value: []
                };

                try {
                    if (typeof this.limit === 'string') {
                        json.key = this.limit.split('::')[0];
                        json.value = this.limit.split('::')[1].split(',');
                    }
                } catch (e) {
                    throw new Error('权限传入格式错误！');
                }

                return json;
            },
            /**
             * 判断是否具有相应权限
             * @return {boolean}
             */
            limitNoAccess() {
                // 当 limitList 为 * 时开通所有权限
                if (this.limitList === '*') {
                    return false;
                }

                let limit = this.limitList[this.btnLimit.key];
                if (limit) {
                    // 对应权限为 * 开通当前功能的所有权限
                    if (limit === '*') {
                        return false;
                    }
                    let arrLimit = true;
                    // 同时需要多个权限的情况（应该遇不到吧）;
                    this.btnLimit.value.forEach(value => {
                        if (limit.indexOf(value) === -1) {
                            arrLimit = false;
                        }
                    });
                    return !arrLimit;
                }
                return true;
            }
        },
        methods: {
            handleClick() {
                this.$emit('click');
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
