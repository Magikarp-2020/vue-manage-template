<template>
    <div>
        <el-table
                :data="listData.list"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="创建时间">
                <template scope="scope">
                    {{scope.row.createdAt * 1000 | date }}
                </template>
            </el-table-column>
            <el-table-column
                    label="修改时间">
                <template scope="scope">
                    {{scope.row.updateAt * 1000 | date }}
                </template>
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

        <page :data="listData" @change="getListData"></page>

        <detail-dialog v-model="staffDialog" :data="staffDialogData"></detail-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import staffService from 'services/staffService';
    import util from 'utils/util';
    import detailDialog from 'components/human/staff/detail.vue';

    export default {
        data() {
            return {
                listData: {},
                staffDialog: false,
                staffDialogData: {}
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
            staffChangeSubmit() {
                this.$refs['staffDialogForm'].validate(valid => {
                    if (valid) {
                        staffService.changeStaff(util.cloneObject(this.staffDialogData)).then(({data}) => {
                            this.$message.success('修改成功');
                            this.staffStatus = 1;
                        }, () => {
                            this.$message.error('修改失败');
                        });
                    }
                });
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
            detailDialog
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
