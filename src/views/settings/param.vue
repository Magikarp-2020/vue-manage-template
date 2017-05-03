<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="search" placeholder="参数名称/参数ID"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getParamList">查询</el-button>
            </el-form-item>
        </el-form>

        <el-button @click="showEditDialog({})" size="small">编辑</el-button>
        <el-table
                :data="listData">
            <el-table-column
                    prop="id"
                    label="id"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="参数名称">
            </el-table-column>
            <el-table-column
                    prop="val"
                    label="参数值">
            </el-table-column>
            <el-table-column
                    prop="reg_exp"
                    label="验证表达式">
            </el-table-column>
            <el-table-column
                    prop="modifier"
                    label="最后修改人">
            </el-table-column>
            <el-table-column
                    prop="updated_at"
                    label="修改时间">
                    <template scope="scope">
                        {{scope.row.updated_at * 1000 | date}}
                    </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template scope="scope">
                    <el-button @click="showEditDialog(scope.row)" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="详情" v-model="editDialog" size="small">
            <el-form :model="param" :rules="rules" ref="updateParamForm">
                <el-form-item label="参数值" label-width="120px" prop="val">
                    <el-input v-model="param.val" auto-complete="off" class="w300"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateParam">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import systemService from 'services/systemService';

    export default {
        data() {
            return {
                listData: [],
                search: '',
                editDialog: false,
                param: {},
                rules: {
                    val: [
                        { required: true, message: '请输入参数值', trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            this.getParamList();
        },
        methods: {
            getParamList() {
                systemService.getParamList({
                    search: this.search
                }).then(({data}) => {
                    this.listData = data.data;
                });
            },
            showEditDialog(item) {
                this.param = item.id ? item : {id: 1, val: '我是编造的参数值'};
                this.editDialog = true;
            },
            updateParam() {
                this.$refs.updateParamForm.validate((valid) => {
                    if (valid) {
                        this.sendUpdateAjax();
                    } else {
                        return false;
                    }
                });
            },
            sendUpdateAjax() {
                systemService.updateParam({
                    id: this.param.id,
                    val: this.param.val
                }).then(({data}) => {
                    this.editDialog = false;
                    this.getParamList();
                });
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .dialog-form-mr {
        margin-right: 60px;
    }
    .w300 {
        width: 300px;
    }
</style>
