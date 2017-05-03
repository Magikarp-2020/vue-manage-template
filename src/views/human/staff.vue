<template>
    <div>
        <option-space :more="true" item-label-width="80px" :model="demoForm" @search="search" @searchHigh="searchHigh">
            <span slot="left">
                <el-input type="text" placeholder="搜索内容" class="mgr10"></el-input>
            </span>
            <span slot="right">
                <limit-btn limit="emp:role::c" type="success" icon="plus" size="" @click="addStaff">添加</limit-btn>
            </span>
            <div slot="more">
                <option-space-item label="姓名" prop="name" :rules="[{required: true, message: '请填写姓名'}]">
                    <el-input type="text" v-model="demoForm.name"></el-input>
                </option-space-item>
            </div>
        </option-space>
        <el-table
                :data="listData"
                style="width: 100%">
            <el-table-column
                    prop="checked"
                    label="#"
                    width="50px">
                <template scope="scope">
                   <el-checkbox v-model="scope.row.checked" @change="updateParent(scope.row.checked)"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column
                    prop="work_no"
                    label="工号">
            </el-table-column>
            <el-table-column
                    prop="real_name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    prop="dept"
                    label="部门">
            </el-table-column>
            <el-table-column
                    label="创建时间">
                <template scope="scope">
                    {{scope.row.created_at * 1000 | date }}
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="270px">
                <template scope="scope">
                    <div class="opt-septal-line">
                        <limit-btn limit="emp:role::u" type="text" @click="showDetail(scope.row)">详情</limit-btn>
                        <limit-btn limit="emp:role::u" type="text" @click="editStaff(scope.row)">修改</limit-btn>
                        <limit-btn v-if="scope.row.disabled" type="text" class="text-success" limit="staff::start" @click="staffDisabled(scope.row)">启用</limit-btn>
                        <limit-btn v-else type="text" class="text-orange" limit="staff::stop" @click="staffDisabled(scope.row)">禁用</limit-btn>
                        
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                更多<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <limit-btn limit="emp:role::u" type="text" @click="resetPassword(scope.row.id)">重置密码</limit-btn>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <limit-btn limit="emp:role::d" type="text" class="text-danger" @click="deleteStaff(scope.row.id)">删除</limit-btn>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <table-footer :data="pageData" @change="getListData">
            <template slot="left">
                <el-checkbox v-model="checkedAll" @change="updateChildren(checkedAll)"></el-checkbox>
                <limit-btn type="primary" size="small" limit="emp:role::u" :disabled="!checkedItem" @click="resetPassword">重置密码</limit-btn>
                <limit-btn type="primary" size="small" limit="staff::start" :disabled="!checkedItem" @click="staffDisabled">启用</limit-btn>
                <limit-btn type="primary" size="small" limit="staff::stop" :disabled="!checkedItem" @click="staffDisabled">禁用</limit-btn>
                <limit-btn type="primary" size="small" limit="emp:role::d" :disabled="!checkedItem" @click="deleteStaff">删除</limit-btn>
                
                <el-dropdown>
                    <el-button size="small" :disabled="!checkedItem">
                        更多<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <limit-btn limit="emp:role::u" type="text">操作一</limit-btn>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <limit-btn limit="emp:role::d" type="text" class="text-danger">操作二</limit-btn>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
        </table-footer>


        <el-dialog title="详情" v-model="staffDialog" size="small" @close="staffStatus = 1">
            <!-- staffStatus: 1   详情 
                 staffStatus: 2   修改资料
            -->
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

            <p class="info">默认密码  <span>123456</span></p>

            <div slot="footer" class="dialog-footer">
                <el-button v-if="staffStatus == 2" @click="staffChangeSubmit(true)">取消</el-button>
                <el-button v-if="staffStatus == 2" @click="staffChangeSubmit(false)" type="primary">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加员工" v-model="addForm.dialog" size="small" @close="addCancel">
            <staff-form :value="addForm.data" ref="staffAddForm" :role-list="roleList"></staff-form>

            <p class="info">默认密码  <span>123456</span></p>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="addForm.dialog = false">关 闭</el-button>
                <el-button type="primary" @click="addSuccess">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import staffService from 'services/staffService';
    import roleService from 'services/roleService';
    import util from 'utils/util';

    export default {
        data() {
            return {
                filter: {
                    pageSize: 20,  // 搜索条件，包含input、select、page分页等信息
                    currPage: 1
                },
                staffDialogData: {},
                listData: [],
                pageData: {},
                staffDialog: false,
                staffStatus: 1,
                addForm: {
                    dialog: false,
                    data: {}
                },
                demoForm: {
                    name: ''
                },
                roleList: [],
                checkedAll: false
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
        computed: {
            checkedItem() {
                let bool = this.listData.some((item) => {
                    return item.checked === true;
                });
                return bool;
            }
        },
        methods: {
            init() {
                this.getListData({});
            },
            search() {
                this.$message.info('触发查询');
            },
            searchHigh() {
                this.$message.info('触发高级查询');
            },
            getListData(param) {
                this.filter = Object.assign({}, this.filter, param); // param: 在当前filter的基础上增加/更新的 筛选条件 -> json
                console.log(this.filter);
                staffService.getList(this.filter).then(({data}) => {
                    this.pageData = data.pageInfo;
                    this.listData = data.data;
                    this.listData.forEach((item) => {
                        this.$set(item, 'checked', false);    // 增加checked字段，用于选中
                    });
                });
            },
            showDetail(item) {
                this.staffDialogData = util.cloneObject(item);
                this.staffDialog = true;
            },
            editStaff(item) {
                this.showDetail(item);
                this.staffStatus = 2;   // 修改资料
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
            resetPassword(id) {
                this.$confirm('是否确认重置此员工密码？').then(() => {
                    this.resetPasswordAjax({id: id});
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
            deleteStaff(id) {
                console.log(123123);
                this.$confirm('是否确认删除此员工？删除后不可恢复').then(() => {
                    staffService.deleteStaff({
                        id: id
                    }).then(({data}) => {
                        this.$message.success('删除成功');
                        this.getListData();
                    }, () => {
                        this.$message.error('删除失败');
                    });
                }, () => {});
            },
            addStaff() {
                this.addForm.dialog = true;
            },
            addSuccess() {
                this.$refs['staffAddForm'].validate((valid, data) => {
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
            },
            updateParent(checked) {
                if (!checked) {
                    this.checkedAll = false;
                } else {
                    let allCheck = this.listData.every((item) => {
                        return item.checked === true;
                    });
                    this.checkedAll = allCheck;
                };
            },
            updateChildren(checked) {
                this.listData.forEach((item) => {
                    item.checked = checked;
                });
            }
        },
        components: {
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

    .vm {
        vertical-align: middle;
    }
</style>
