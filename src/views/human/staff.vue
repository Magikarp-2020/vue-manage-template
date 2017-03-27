<template>
    <div>
        <el-table
                :data="listData"
                style="width: 100%">
            <el-table-column
                    prop="real_name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="创建时间">
                <template scope="scope">
                    {{scope.row.created_at * 1000 | date }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template scope="scope">
                    <limit-btn limit="staff:r" size="small" @click="showDetail(scope.row)">详情/修改</limit-btn>
                    <!--<limit-btn limit="staff:password" size="small">重置密码</limit-btn>-->
                    <limit-btn v-if="scope.row.disable" limit="staff:start" size="small"
                               @click="staffDisabled(scope.row)" type="success">启用
                    </limit-btn>
                    <limit-btn v-else limit="staff:stop" size="small" type="danger">禁用</limit-btn>
                </template>
            </el-table-column>
        </el-table>

        <!--<page :data="listData" @change="getListData"></page>-->

        <el-dialog title="详情" v-model="staffDialog" size="small">

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
                <staff-form :value="staffDialogData" ref="staffDialogForm"></staff-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="resetPassword" v-if="staffStatus == 1">重置密码</el-button>
                <el-button v-if="staffStatus == 1" @click="staffStatus = 2">修改资料</el-button>
                <el-button v-if="staffStatus == 2" @click="staffChangeSubmit(false)" type="success">确认修改
                </el-button>
                <el-button v-if="staffStatus == 2" @click="staffChangeSubmit(true)" type="warning">取消修改</el-button>
                <el-button @click="deleteStaff" v-if="staffStatus == 1" type="danger">删除员工</el-button>
                <el-button type="primary" @click="staffDialog = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import staffService from 'services/staffService';
    import util from 'utils/util';
    import staffForm from 'components/human/staff/form';

    export default {
        data() {
            return {
                staffDialogData: {},
                listData: [],
                staffDialog: false,
                staffStatus: 1
            };
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.getListData(1);
            },
            getListData(page = this.listData.current_page) {
                staffService.getList({page: page}).then(({data}) => {
                    this.listData = data.data;
                });
            },
            showDetail(item) {
                this.staffDialogData = util.cloneObject(item);
                this.staffDialog = true;
            },
            staffChangeSubmit(cancel) {
                if (!cancel) {
                    this.$refs['staffDialogForm'].validate((valid, data) => {
                        if (valid) {
                            staffService.changeStaff(util.cloneObject(data)).then(({data}) => {
                                this.$message.success('修改成功');
                                this.staffStatus = 1;
                            }, () => {
                                this.$message.error('修改失败');
                            });
                        }
                    });
                } else {
                    this.$refs['staffDialogForm'].resetFields();
                    this.staffStatus = 1;
                }
            },
            resetPassword() {
                this.$confirm('是否确认重置此员工密码？').then(() => {
                    this.resetPasswordAjax({id: this.staffDialogData.id});
                });
                /* this.$prompt('请输入新密码', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 inputPattern: /^[0-9|a-z]{1,18}$/,
                 inputErrorMessage: '密码格式错误，不可包含特殊字符，18位以内'
                 }).then(({ value }) => {
                 this.$message({
                 type: 'success',
                 message: '你的邮箱是: ' + value
                 });
                 }).catch(() => {
                 this.$message({
                 type: 'info',
                 message: '取消输入'
                 });
                 }); */
            },
            resetPasswordAjax(data) {
                staffService.resetPassword(data).then(({data}) => {
                    console.log(data);
                    this.$message.success('重置成功');
                }, () => {
                    this.$message.error('重置失败');
                });
            },
            staffDisabled(item) {
                staffService.staffDisabled({
                    id: item.id,
                    disable: item.disable ? 0 : 1
                }).then(({data}) => {
                    console.log(data);
                    item.disable = item.disable ? 0 : 1;
                });
            },
            deleteStaff() {
                this.$confirm('是否确认删除此员工？删除后不可恢复').then(() => {
                    staffService.deleteStaff({
                        id: this.staffDialogData.id
                    }).then(({data}) => {
                        this.$message.success('删除成功');
                        this.staffDialog = false;
                        this.getListData();
                    }, () => {
                        this.$message.error('删除失败');
                    });
                });
            }
        },
        components: {
            staffForm
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scope>
    .detail {
        .user-face {
            $user-face-width: 100px;
            width: $user-face-width;
            height: $user-face-width;
            display: block;
            margin: 0 auto;
        }
        .el-form-item__label {
            color: #828282;
        }
    }
</style>
