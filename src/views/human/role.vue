<template>
    <div>
        <option-header>
            <span slot="left"><el-button type="success" icon="plus" size="small">左方</el-button></span>
            <span slot="right"><el-button type="success" icon="plus" size="small">右方</el-button></span>
        </option-header>
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
                    prop="name"
                    label="备注">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template scope="scope">
                    <el-button @click="edit(scope.row)" size="small">编辑</el-button>
                    <el-button @click="deleteRole(scope.row)" size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="详情" v-model="editDialog" size="small">
            {{editDialogData.role}}
            <authorization :value="editDialogData.role"
                           @change="authChange"
                           :auth-list="authList">
            </authorization>
            <div slot="footer" class="dialog-footer">
                <el-button type="default" @click="changeSuccess">确 定</el-button>
                <el-button type="primary" @click="editDialog = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
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
                authList: {}
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
                this.editDialog = true;
                this.editDialogData = item;
            },
            deleteRole({id, name}) {
                this.$confirm(`是否删除角色 [ ${name} ] ? 删除后不可恢复`).then(() => {
                    roleService.deleteRole({id}).then(({data}) => {
                        this.getList();
                        this.$message.success('删除成功');
                    });
                });
            },
            authChange(auth) {
                this.editDialogData.role = auth;
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
            }
        },
        components: {
            authorization
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
