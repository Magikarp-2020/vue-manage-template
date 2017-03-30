<template>
    <div>
        <option-space :more="false" item-label-width="80px" :model="demoForm">
            <span slot="left">
                <el-input type="text" v-model="search.key" placeholder="输入手机号,用户名,工号搜索"></el-input>
                <el-button type="" @click="getListData(search.key)">查询</el-button></span>
            <span slot="right">
                <limit-btn limit="emp:role::c" type="success" icon="plus" size="" @click="addStaff">添加</limit-btn>
            </span>
            <div slot="more">
                <option-space-item label="姓名姓名" prop="name" :rules="[{required: true, message: '请填写姓名'}]">
                    <el-input type="text" v-model="demoForm.name"></el-input>
                </option-space-item>
            </div>
        </option-space>
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
                    <limit-btn v-if="scope.row.disabled" limit="staff:start" size="small"
                               @click="staffDisabled(scope.row)" type="success">启用
                    </limit-btn>
                    <limit-btn v-else limit="staff:stop" @click="staffDisabled(scope.row)" size="small" type="danger">
                        禁用
                    </limit-btn>
                </template>
            </el-table-column>
        </el-table>

        <!--<page :data="listData" @change="getListData"></page>-->

        <el-dialog title="详情" v-model="staffDialog" size="small" @close="staffStatus = 1">

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
                <staff-form :value="staffDialogData" ref="staffDialogForm" :role-list="roleList"></staff-form>
            </div>

            <p class="info">默认密码: <span>123456</span></p>

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

        <el-dialog title="添加员工" v-model="addForm.dialog" size="small" @close="addCancel">
            <staff-form :value="addForm.data" ref="staffAddForm" :role-list="roleList"></staff-form>

            <p class="info">默认密码: <span>123456</span></p>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="addSuccess">确 定</el-button>
                <el-button type="primary" @click="addForm.dialog = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import staffService from 'services/staffService';
    import roleService from 'services/roleService';
    import util from 'utils/util';
    import staffForm from 'components/human/staff/form';

    export default {
        data() {
            return {
                staffDialogData: {},
                listData: [],
                staffDialog: false,
                staffStatus: 1,
                search: {
                    key: ''
                },
                addForm: {
                    dialog: false,
                    data: {}
                },
                demoForm: {
                    name: ''
                },
                roleList: []
            };
        },
        created() {
            this.init();
            roleService.list().then(({data}) => {
                this.roleList = data.data;
            });
            /*this.$store.commit('setBreadcrumbButton', [
                {text: '添加', click: this.addStaff, type: 'success', icon: 'plus'}
            ]);*/
        },
        methods: {
            init() {
                this.getListData(1);
            },
            getListData(username) {
                staffService.getList({username}).then(({data}) => {
                    this.listData = data.data;
                });
            },
            showDetail(item) {
                this.staffDialogData = util.cloneObject(item);
                this.staffDialog = true;
            },
            staffChangeSubmit(cancel) {
                if (!cancel) {
                    this.$refs['staffDialogForm'].validate((valid, item) => {
                        if (valid) {
                            staffService.changeStaff(item).then(({data}) => {
                                this.$message.success('修改成功');
                                this.staffStatus = 1;
                                this.staffDialogData = item;
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
                    disable: item.disabled ? 0 : 1
                }).then(({data}) => {
                    item.disabled = item.disabled ? 0 : 1;
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
            },
            addStaff() {
                this.addForm.dialog = true;
            },
            addSuccess() {
                this.$refs['staffAddForm'].validate((valid, data) => {
                    console.log(valid, data);
                    if (valid) {
                        staffService.addStaff(data).then(({data}) => {
                            this.$message.success('添加成功');
                            this.addForm.dialog = false;
                            this.getListData();
                        });
                    }
                });
            },
            addCancel() {
                this.$refs['staffAddForm'].resetFields();
            }
        },
        components: {
            staffForm
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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

    .info {
        color: #475669;
        font-size: 14px;
        padding-left: 50px;
        span {
            padding-left: 5px;
            color: #324057;
        }
    }
</style>
