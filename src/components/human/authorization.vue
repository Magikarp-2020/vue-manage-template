<template>
    <el-tree
            :data="regions"
            :props="props"
            node-key="authId"
            :default-checked-keys="defaultChecked"
            @check-change="checkChange"
            show-checkbox>
    </el-tree>
</template>

<script type="text/ecmascript-6">
    import util from 'utils/util';
    export default {
        data() {
            return {
                defaultChecked: [],
                props: {
                    label: 'resource_name',
                    children: 'children'
                },
                output: {}
            };
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            authList: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        watch: {
            value: {
                handler(value) {
                    if (typeof value === 'string') {
                        let json = {};
                        let checkedArr = [];
                        try {
                            json = JSON.parse(value);
                        } catch (e) {
                        }
                        for (let key in json) {
                            // 设置 output json 的数据

                            if (json[key] === '*') {
                                checkedArr.push(key);
//                                this.output[key].list=this.regions
                                this.regions.forEach(regionsItem => {
                                    if (regionsItem.id === key) {
                                        if (regionsItem.children && regionsItem.children.length) {
                                            regionsItem.children.forEach(childItem => {
                                                this.setOutput(childItem, true);
                                            });
                                        } else {
                                            this.setOutput(regionsItem, true);
                                        }
                                    }
                                });
                            } else {
                                json[key].split(',').forEach(value => {
                                    checkedArr.push(`${key}_${value}`);
                                });
                            }
                        }
                        this.defaultChecked = checkedArr;
                    }
                },
                immediate: true
            }
        },
        computed: {
            regions() {
                let arr = [];
                this.authList.forEach(value => {
                    let json = util.cloneObject(value);
                    json.children = [];
                    json.authId = json.id;
                    if (typeof value.actions === 'string') {
                    } else {
                        for (let key in value.actions) {
                            json.children.push({
                                resource_name: value.actions[key],
                                value: key,
                                name: json.id,
                                authId: `${json.id}_${key}`,
                                _length: Object.keys(value.actions).length
                            });
                        }
                    }
                    arr.push(json);
                });
                return arr;
            }
        },
        methods: {
            checkChange(data, checked, child) {
                this.setOutput(data, checked);
                this.emitChange();
            },
            /**
             * 当只有一级的时候传入当前级.
             * 当有子级时传入子级
             *
             * @param data
             * @param checked 是否选中
             */
            setOutput(data, checked) {
                if (data.children && data.children.length) {
                } else if (data.actions === '*') {
                    if (checked) {
                        this.$set(this.output, data.id, '*');
                    } else {
                        delete this.output[data.id];
                    }
                } else if (checked) {
                    if (this.output[data.name]) {
                        this.output[data.name].list.push(data.value);
                    } else {
                        this.$set(this.output, data.name, {
                            _length: data._length,
                            list: [data.value]
                        });
                    }
                } else {
                    let newArr = [];
                    // 避免有重复的数据出现
                    let find = false;
                    this.output[data.name].list.forEach((value) => {
                        if (value !== data.value && !find) {
                            newArr.push(value);
                            find = true;
                        }
                    });
                    this.output[data.name].list = newArr;
                    if (!this.output[data.name].list.length) {
                        delete this.output[data.name];
                    }
                }
            },
            emitChange() {
                if (!Object.keys(this.output).length) {
                    this.$emit('change', JSON.stringify(''));
                    return;
                }
                let json = {};
                for (let key in this.output) {
                    let data = this.output[key];
                    if (data === '*') {
                        json[key] = '*';
                    } else if (data.list.length === data._length) {
                        json[key] = '*';
                    } else {
                        json[key] = data.list.join(',');
                    }
                }
                this.$emit('change', JSON.stringify(json));
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
