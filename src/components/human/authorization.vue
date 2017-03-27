<template>
    <div>
        {{regions}}

        <br>
        output ::; {{output}}
        <el-tree
                :data="regions"
                :props="props"
                @check-change="checkChange"
                show-checkbox>
        </el-tree>
    </div>
</template>

<script type="text/ecmascript-6">
    import util from 'utils/util';
    export default {
        data() {
            return {
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
                    console.log(value);
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
                    if (typeof value.actions === 'string') {
                    } else {
                        for (let key in value.actions) {
                            json.children.push({
                                resource_name: value.actions[key],
                                value: key,
                                name: json.id
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
                if (data.children && data.children.length) {
                    return;
                } else if (data.actions === '*') {
                    if (checked) {
                        this.$set(this.output, data.id, '*');
                    } else {
                        delete this.output[data.id];
                    }
                    console.log(this.output);
                    return;
                }
                if (checked) {
                    console.log(data, checked, child);
                    if (this.output[data.name]) {
                        this.output[data.name].push(data.value);
                    } else {
                        this.$set(this.output, data.name, [data.value]);
                    }
                } else {
                    let newArr = [];
                    this.output[data.name].forEach((value) => {
                        if (value !== data.value) {
                            newArr.push(value);
                        }
                    });
                    this.output[data.name] = newArr;
                }
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
