<template>
    <div>
        <div class="search-box">
            <el-select v-model="search.parent" filterable placeholder="请选择" class="mgr10">
                <el-option
                  v-for="item in parentList"
                  :label="item.text"
                  :value="item.key">
                </el-option>
            </el-select>
            <!-- <el-input
                  style="width: 220px"
                  placeholder="关键字搜索"
                  v-model="search.child"
                  @click="getChildList('text')"
                >
            </el-input> -->
            <el-button type="primary" @click="getChildList">查询</el-button>
            <el-button type="success" @click="edit({})">新增</el-button>
        </div>
        <el-table
            :data="childList">
            <el-table-column
                    prop="key"
                    label="#"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="text"
                    label="关键字">
            </el-table-column>
            <el-table-column
                    prop="val1"
                    label="val1">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="创建时间">
                    <template scope="scope">
                        {{scope.row.created_at * 1000 | date}}
                    </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template scope="scope">
                    <!-- <el-button @click="showEditDialog(scope.row)" size="small">编辑</el-button> -->
                    <!-- <div class="list-item-opt">
                        <span class="edit" @click.stop="edit(scope.row)">编辑</span>
                        <span class="del" @click.stop="del(scope.row)">删除</span>
                        <span class="disable" @click.stop="disable(scope.row)">禁用</span>
                    </div> -->
                    <!-- <el-button @click="disable(scope.row)" size="small">禁用</el-button> -->
                    <el-switch
                        v-model="scope.row.stoped"
                        on-color="#13ce66"
                        off-color="#ff4949"
                        @change="disable(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑字典信息" v-model="editDialog" size="small">
            <el-form :model="editItem" :rules="rules" ref="editForm" error="123123">
                <el-form-item label="关键字" label-width="120px" prop="text" error="asdasdas">
                    <el-input v-model="editItem.text" auto-complete="off" class="w300"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="validateEditForm">确 定</el-button>
            </div>
        </el-dialog> 
    </div>
</template>

<script>
    import systemService from 'services/systemService';

    export default {
        data() {
            return {
                parentList: [], // select选项 - 父类列表
                childList: [],  // 下方子类列表
                editItem: {},
                search: {
                    parent: '',
                    child: ''
                },
                editDialog: false,
                rules: {
                    text: [
                        { required: true, message: '请输入参数值', trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            this.getParentList();
        },
        methods: {
            getParentList() {
                systemService.getDictList({
                    listType: 'root',
                    search: this.search.parent
                }).then(({data}) => {
                    this.parentList = data.data;

                    // 默认第一个为当前选中项
                    if (!this.search.parent && this.parentList.length) {
                        this.search.parent = this.parentList[0].key;
                        this.getChildList();
                    }
                });
            },
            getChildList() {
                let data = {
                    listType: 'pkey',
                    pkey: this.search.parent
                };
                systemService.getDictList(data).then(({data}) => {
                    this.childList = data.data;
                });
            },
            edit(item) {
                this.editDialog = true;
                this.editItem = JSON.parse(JSON.stringify(item));
            },
            validateEditForm() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.updateItem();
                    } else {
                        return false;
                    }
                });
            },
            updateItem() {
                systemService.editDictItem({
                    pkey: this.search.parent,
                    text: this.editItem.text
                }).then(({data}) => {
                    this.editDialog = false;
                    this.getChildList();
                });
            },
            disable(item) {
                // item.stoped = !item.stoped;
                // console.log(item);
                systemService.disableDictItem({
                    key: item.key,
                    stoped: Number(item.stoped)
                }).then(({data}) => {
                    item.stoped = !item.stoped;
                });
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">
    .left-col {
        .list-opt {
            // background-color: #ededed;    // ededed   eef1f6
            // height: 40px;
            // border-bottom: 1px solid #dfe6ec;
            margin-bottom: 10px;
        }

        .list-container {
            background-color: #fff;
            min-height: 200px;
            border: 1px solid #dfe6ec;

            li {
                line-height: 36px;
                height: 36px;
                padding: 0 15px;
                font-size: 14px;
                position: relative;

                &:hover, &.active {
                    background-color: #eef1f6;
                }

                .list-item-opt {
                    position: absolute;
                    right: 10px;
                    top: 0;
                    color: #20A0FF;
                    cursor: pointer;
                    margin-left: 5px;
                }
            }
        }
    }
</style>
