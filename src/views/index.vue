<template>
    <div class="box">
        index
    </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        computed: {
        },
        created() {
        },
        methods: {

        },
        components: {
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .header {
        margin-bottom: 16px;
        text-align: center;
        .el-card {
            padding: 20px;
        }
        .team-img {
            width: 150px;
            height: 150px;
            display: inline-block;
            vertical-align: top;
        }
        .team-name {
            font-size: 18px;
            font-weight: bold;
            font-family: "微软雅黑";
            color: #383838;
        }
        .team-msg {
            padding-left: 20px;
            padding-top: 20px;
            display: inline-block;
            vertical-align: top;
            p {
                line-height: 1.5;
                margin-bottom: 8px;
                em {
                    color: #ff8080;
                    font-style: normal;
                }
                a {
                    color: #20a0ff;
                }
            }
        }
    }

    .content {
        .el-card__header {
            padding: 10px;
        }
        .active {
            background: #d2d2d2;
        }
    }

    .view {
        height: 300px;
        width: 100%;
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .content {
        .el-card__header {
            padding: 8px 10px 5px 10px;
        }
    }
</style>
