<template>
    <el-form ref="staffDialogForm" :model="data" :rules="rules" label-width="120px">
        {{value}}<br/>
        data: {{data}}
        <img class="user-face" :src="data.face" alt="用户头像">
        <el-form-item label="工号">
            {{data.work_no}}
        </el-form-item>
        <el-form-item label="真实姓名" prop="real_name">
            <el-input type="text" v-model="data.real_name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
            <el-input type="number" v-model="data.mobile"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
            <el-input type="text" v-model="data.email"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="dept">
            <el-input type="text" v-model="data.dept"></el-input>
        </el-form-item>
    </el-form>
</template>

<script type="text/ecmascript-6">
    import util from 'utils/util';
    export default {
        props: {
            value: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                data: {
                    real_name: '',
                    mobile: '',
                    email: '',
                    dept: ''
                },
                rules: {
                    real_name: [
                        {required: true, message: '请填写真实姓名'},
                        {max: 5, min: 2, message: '姓名长度2-5字符之间'}
                    ],
                    mobile: [
                        {required: true, message: '请填写手机号'},
                        {pattern: /^1[0-9]{10}$/, message: '手机号格式错误'}
                    ],
                    email: [
                        {required: true, message: '请填写 email'},
                        {pattern: /^.*@.*\..*$/, message: 'email 格式错误'},
                        {max: 99, message: 'email 不可超过99个字符'}
                    ],
                    dept: [
                        {required: true, message: '请填写所在部门'}
                    ]
                }
            };
        },
        watch: {
            value: {
                handler() {
                    console.log('123123');
                    this.data = util.cloneObject(this.value);
                },
                deep: true
            },
            data: {
                handler() {
                    console.log('123123');
                    this.$emit('input', this.data);
                },
                deep: true
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
