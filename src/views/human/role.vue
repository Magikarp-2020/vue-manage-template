<template>
    <div>
        <option-space>
            <span slot="left"></span>
            <span slot="right">
                <limit-btn limit="emp:role::c" type="success" icon="plus" size="small" @click="addRole">添加</limit-btn>
            </span>
        </option-space>
        <el-table
                :data="listData">
            <el-table-column
                    prop="name"
                    label="名称"
                    width="160">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    width="190">
                <template scope="scope">
                    {{scope.row.created_at * 1000 | date}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="备注">
            </el-table-column>
            <el-table-column
                    width="220"
                    label="操作">
                <template scope="scope">
                    <limit-btn limit="emp:role::u" @click="edit(scope.row)" size="small">编辑</limit-btn>
                    <limit-btn limit="emp:role::d" @click="deleteRole(scope.row)" size="small" type="danger">删除
                    </limit-btn>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="详情" v-model="editDialog" size="small">
            <authorization v-model="editDialogData.role"
                           :auth-list="authList">
            </authorization>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="changeSuccess">确 定</el-button>
                <el-button type="primary" @click="editDialog = false">关 闭</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加角色" v-model="addDialog" size="small" @close="addCancel">
            <el-form ref="addRoleForm" :model="addForm" label-width="120px" :rules="addFormRules">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="addForm.name" placeholder="输入角色名称, 10字以内"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="description">
                    <el-input v-model="addForm.description" type="textarea" :rows="3"
                              placeholder="输入角色描述, 100字以内"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="addSuccess">确 定</el-button>
                <el-button type="primary" @click="addDialog = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import util from 'utils/util';
    import roleService from 'services/roleService';
    import systemService from 'services/systemService';
    import authorization from 'components/human/authorization';

    export default {
        created() {
            this.getList();
            this.getAuth();
        },
        data() {
            return {
                listData: [],
                editDialog: false,
                editDialogData: {},
                authList: {},
                addDialog: false,
                addForm: {
                    name: '',
                    description: ''
                },
                addFormRules: {
                    name: [
                        {required: 'true', message: '请输入角色名称'},
                        {max: 10, message: '角色名称不可超过10个字符'}
                    ],
                    description: [
                        {required: 'true', message: '请输入角色描述'},
                        {max: 100, message: '角色描述不可超过100个字符'}
                    ]
                }
            };
        },
        methods: {
            getAuth() {
                systemService.getAuthList().then(({data}) => {
                    this.authList = data.data;
                });
            },
            getList() {
                roleService.list().then(({data}) => {
                    this.listData = data.data;
                });
            },
            edit(item) {
                this.$delete(this.editDialogData, 'role');
                this.editDialog = true;
                this.editDialogData = util.cloneObject(item);
                roleService.getRolePermissions({
                    id: item.id
                }).then(({data}) => {
                    this.$set(this.editDialogData, 'role', JSON.stringify(data.data.haveResources));
                });
            },
            deleteRole({id, name}) {
                this.$confirm(`是否删除角色 [ ${name} ] ? 删除后不可恢复`).then(() => {
                    roleService.deleteRole({id}).then(({data}) => {
                        this.getList();
                        this.$message.success('删除成功');
                    });
                });
            },
            changeSuccess() {
                roleService.changeAuth({
                    id: this.editDialogData.id,
                    permissions: this.editDialogData.role
                }).then(({data}) => {
                    this.$message.success('修改成功');
                    this.getList();
                }, () => {
                    this.$message.error('修改失败');
                });
            },
            addRole() {
                this.addDialog = true;
//                /role/permissions
            },
            addSuccess() {
                this.$refs['addRoleForm'].validate(valid => {
                    if (valid) {
                        roleService.addRole({
                            name: this.addForm.name,
                            description: this.addForm.description
                        }).then(({data}) => {
                            this.$message.success('添加成功');
                            this.addDialog = false;
                            this.getList();
                        });
                    }
                });
            },
            addCancel() {
                this.addForm.name = '';
                this.addForm.description = '';
                setTimeout(() => this.$refs['addRoleForm'].resetFields(), 0);
            }
        },
        components: {
            authorization
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
