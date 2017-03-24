<template>
    <el-dialog title="详情" v-model="show" size="small">
        <div class="detail" v-if="staffStatus == 1">
            <el-form label-width="120px">
                <img class="user-face" :src="staffDialogData.face" alt="用户头像">
                <el-form-item label="工号">
                    {{staffDialogData.work_no}}
                </el-form-item>
                <el-form-item label="真实姓名">
                    {{staffDialogData.real_name}}
                </el-form-item>
                <el-form-item label="手机号">
                    {{staffDialogData.mobile}}
                </el-form-item>
                <el-form-item label="email">
                    {{staffDialogData.email}}
                </el-form-item>
                <el-form-item label="所属部门">
                    {{staffDialogData.dept}}
                </el-form-item>
            </el-form>
        </div>
        <div class="detail" v-if="staffStatus == 2">
            <staff-form v-model="staffDialogData"></staff-form>
        </div>

        <div slot="footer" class="dialog-footer">
            <el-button @click="resetPassword" v-if="staffStatus == 1">重置密码</el-button>
            <el-button v-if="staffStatus == 1" @click="staffStatus = 2">修改资料</el-button>
            <el-button v-else @click="staffChangeSubmit" type="success">确认修改</el-button>
            <el-button @click="deleteStaff" v-if="staffStatus == 1" type="danger">删除员工</el-button>
            <el-button type="primary" @click="show = false">关 闭</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/ecmascript-6">
    import util from 'utils/util';
    import staffForm from './form.vue';
    export default {
        props: {
            data: {
                type: Object,
                required: true,
                default() {
                    return {};
                }
            },
            value: {
                type: Boolean,
                default: false,
                required: true
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.$emit('input', val);
            },
            data() {
                this.staffDialogData = this.data;
            }
        },
        data() {
            return {
                staffStatus: 1,
                show: false,
                staffDialogData: {}
            };
        },
        methods: {
            staffChangeSubmit() {
                this.$refs['staffDialogForm'].validate(valid => {
                    if (valid) {
                        this.$emit('changeSuccess', util.cloneObject(this.staffDialogData));
                        this.staffStatus = 1;
                    }
                });
            },
            resetPassword() {
                this.$confirm('是否确认重置此员工密码？').then(() => {
                    this.$emit('resetPassword', util.cloneObject(this.staffDialogData));
                });
            },
            deleteStaff() {
                this.$confirm('是否确认删除此员工？删除后不可恢复').then(() => {
                    this.$emit('delete', util.cloneObject(this.staffDialogData));
                });
            },
            close() {
//                this.$emit('input', false);
            }
        },
        components: {
            staffForm
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
