<template>
    <el-form ref="staffDialogForm" :model="data" :rules="staffDialogRules" label-width="120px">
        <el-upload
                class="avatar-uploader"
                action="//jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarScucess"
                :before-upload="beforeAvatarUpload">
            <img v-if="data.face" :src="data.face" class="avatar">
            <i v-else="" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="工号" prop="work_no">
            <el-input type="text" v-model="data.work_no" placeholder="只能包含数字、字母、下划线，长度在4-16位之间"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="real_name">
            <el-input type="text" v-model="data.real_name" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
            <el-input type="number" v-model="data.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
            <el-input type="text" v-model="data.email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="dept">
            <el-input type="text" v-model="data.dept" placeholder="请输入所属部门"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
            <el-checkbox :indeterminate="roleCheckAll.indeterminate" v-model="roleCheckAll.checked"
                         @change="handleCheckAllChange">
                全选
            </el-checkbox>
            {{checkedRoles}}
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
                <el-checkbox v-for="role in roleList" :label="role.id">{{role.name}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
    </el-form>
</template>

<script>
    import util from 'utils/util';

    export default {
        props: {
            value: {
                type: Object,
                default() {
                    return {};
                }
            },
            roleList: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                data: {},
                checkedRoles: [],
                roleCheckAll: {
                    indeterminate: false,
                    checked: false
                },
                staffDialogRules: {
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
                    ],
                    work_no: [
                        {required: true, message: '请填写工号'},
                        {pattern: /^[0-9|a-z|A-Z|_]{4,16}$/, message: '工号格式错误, 只能包含数字、字母、下划线，长度在4-16位之间'}
                    ]
                }
            };
        },
        watch: {
            value: {
                handler(value) {
                    this.data = util.cloneObject(value);
                    this.checkedRoles = this.data.role.split(',');
                    this.handleCheckedRolesChange(this.checkedRoles);
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            resetFields() {
                return this.$refs['staffDialogForm'].resetFields();
            },
            validate(cb) {
                return this.$refs['staffDialogForm'].validate(value => cb(value, util.cloneObject(this.data)));
            },
            handleCheckAllChange(checked) {
                if (this.roleCheckAll.checked) {
                    this.roleCheckAll.indeterminate = false;
                    for (let key in this.roleList) {
                        this.checkedRoles.push(this.roleList[key].id);
                    }
                } else {
                    this.checkedRoles = [];
                    this.roleCheckAll.indeterminate = false;
                    this.roleCheckAll.checked = false;
                }
            },
            handleCheckedRolesChange(checked) {
                if (checked.length === this.roleList.length) {
                    this.roleCheckAll.indeterminate = false;
                    this.roleCheckAll.checked = true;
                } else if (checked.length === 0) {
                    this.roleCheckAll.indeterminate = false;
                    this.roleCheckAll.checked = false;
                } else {
                    this.roleCheckAll.indeterminate = true;
                    this.roleCheckAll.checked = false;
                }
            },
            handleAvatarScucess(res, file) {
                this.data.face = window.URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
