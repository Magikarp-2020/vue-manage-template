<template>
    <div>
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
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="详情" v-model="editDialog" size="small">
            <authorization v-model="editDialogData.role" :auth-list="authList"></authorization>
            <div slot="footer" class="dialog-footer">
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
                item.role = 'good:r';
                this.editDialogData = item;
            }
        },
        components: {
            authorization
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
