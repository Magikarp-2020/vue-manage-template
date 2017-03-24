<template>
    <el-dropdown trigger="click" @command="headMenuChange">
        <a class="header-head clearfix" href="javascript:;">
            <img class="header-head-img userface-hook" :src="userInfo.face">
            <div class="caret-box"><span class="caret"></span></div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>

        </a>
        <el-dialog title="提示" v-model="passwordDialogVisible" size="tiny"
                   :modal-append-to-body="false" @open="init">
            <el-form @submit.native.prevent="changePasswordSubmit" ref="passwordRef" :model="changePasswordForm"
                     :rules="changePasswordFormRules" label-width="100px">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input v-model="changePasswordForm.oldPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="changePasswordForm.newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input v-model="changePasswordForm.checkPassword" type="password"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="passwordDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changePasswordSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </el-dropdown>
</template>

<script type="text/ecmascript-6">
    import systemService from 'services/systemService';

    export default {
        props: {
            logo: {
                type: String,
                default: ''
            }
        },
        computed: {
            userInfo() {
                return this.$store.state.user.info;
            }
        },
        data() {
            const checkPassword = (rule, value, callback) => {
                if (this.changePasswordForm.newPassword === this.changePasswordForm.checkPassword) {
                    callback();
                } else {
                    callback(new Error('两次输入不一致'));
                }
            };

            return {
                passwordDialogVisible: false,
                changePasswordForm: {
                    oldPassword: '',
                    newPassword: '',
                    checkPassword: ''
                },
                changePasswordFormRules: {
                    oldPassword: [
                        {required: 'true', message: '必填项'},
                        {pattern: /^[a-z|0-9]*$/, message: '只可输入字母或数字'}
                    ],
                    newPassword: [
                        {required: 'true', message: '必填项'},
                        {pattern: /^[a-z|0-9]*$/, message: '只可输入字母或数字'}
                    ],
                    checkPassword: [
                        {required: 'true', message: '必填项'},
                        {validator: checkPassword}
                    ]
                }
            };
        },
        methods: {
            init() {
                try {
                    this.changePasswordForm.oldPassword = '';
                    this.changePasswordForm.newPassword = '';
                    this.changePasswordForm.checkPassword = '';
                    setTimeout(this.$refs['passwordRef'].resetFields, 0);
                } catch (e) {

                }
            },
            headMenuChange(common) {
                switch (common) {
                    case 'loginOut':
                        this.loginOut();
                        break;
                    case 'changePassword':
                        this.changePassword();
                        break;
                }
            },
            loginOut() {
                systemService.loginOut().then(({data}) => {
                    if (data.data) {
                        this.$store.commit('setUserInfo', {});
                        window.localStorage.clear();
                        this.$router.push('/');
                    }
                });
            },
            changePassword() {
                console.log('changePassword');
                this.passwordDialogVisible = true;
            },
            changePasswordSubmit() {
                this.$refs['passwordRef'].validate(valid => {
                    console.log(valid);
                    if (valid) {
                        systemService.changePassword({
                            oldPassword: this.changePasswordForm.oldPassword,
                            password: this.changePasswordForm.newPassword
                        }).then(({data}) => {
                            console.log(data);
                            this.passwordDialogVisible = false;
                        }, ({data}) => {
//                            this.$message.error(data.msg + '');
                        });
                    }
                });
            }
        }
    };

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
