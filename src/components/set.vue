<template>
<div class="set">
    <div class="content">
        <div class="graph">
            <Button v-if="!$store.state.global.isLogin" v-show="loginMode" @click="toLogin" size="large" >微信扫码登录</Button>
            <Button v-if="!$store.state.global.isLogin" v-show="loginMode" @click="phoneShow" size="large" >手机号登录</Button>
            <Button v-else size="large" @click="logout">退出登录</Button>
        </div>
    </div>
    <div id="login"></div>
    <Modal v-model="editUserInfoShow" footer-hide title="修改个人信息" style="text-align:center">
        <Form>
            <FormItem label="用户名">
                <Input v-model="$store.state.user.userName" type="text"    disabled autocomplete="on"></Input>
            </FormItem>
            <FormItem label="用户名">
                <Input v-model="$store.state.user.userName" type="text"    disabled autocomplete="on"></Input>
            </FormItem>
            <FormItem label="用户名">
                <Input v-model="$store.state.user.userName" type="text"    disabled autocomplete="on"></Input>
            </FormItem>
            <FormItem label="用户名">
                <Input v-model="$store.state.user.userName" type="text"    disabled autocomplete="on"></Input>
            </FormItem>
            <FormItem label="用户名">
                <Input v-model="$store.state.user.userName" type="text"    disabled autocomplete="on"></Input>
            </FormItem>
            <Button-group class="button-group">
                <Button type="default"  @click="cancelEdit">取消</Button>
                <Button type="primary" @click="confirmEdit">确认</Button>
            </Button-group>
        </Form>
    </Modal>
    <Modal v-model="phoneLoginShow" footer-hide title="手机号登录" style="text-align:center" width="400px">
        <div class="phoneLoginShow">
            <Form>
                <FormItem :label-width="80" label="手机号码">
                    <Row>
                        <Col span="14">
                        <Input v-model="phone.number" type="text"   :maxlength="11" placeholder="请输入手机号码" autocomplete="on"></Input>
                        </Col>
                        <Col span="6">
                        <Button type="primary"   :disabled="sending" @click="getValidateCode">{{codeText}}</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem :label-width="80" label="验证码">
                    <Row>
                        <Col span="10">
                        <Input v-model="phone.validateCode"  type="text"   placeholder="请输入验证码" autocomplete="on"></Input>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="24">
                        <Button type="default" @click="phoneHide">取消</Button>
                        <Button type="primary" @click="phoneLogin" >登录</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </div>
    </Modal>
</div>
</template>

<script>
import api from "../api/index";
import {
    setTimeout,
    clearInterval,
    setInterval
} from "timers";
export default {
    name: "set",
    components: {},
    created() {},
    mounted() {},
    data() {
        return {
            editUserInfoShow: false,
            loginMode: true,
            phoneLoginShow: false,
            sending: false,
            codeText: "获取验证码",
            phone: {
                validateCode: "",
                number: ""
            }
        };
    },
    methods: {
        //取消修改个人信息
        cancelEdit() {

        },
        //提交修改个人信息
        confirmEdit() {
            console.log('confirm edit');
        },
        //获取验证码
        getValidateCode() {
            console.log(this.phone.number.length);
            if (this.phone.number === "" || this.phone.number.length !== 11) {
                this.$Message.error("电话号码格式不对");
                return false;
            }
            console.log(api.user.getCode);
            this.sending = true;
            let x = 60;
            var that = this;
            this.$http({
                method: "post",
                url: api.user.getCode,
                data: {
                    phoneNumber: this.phone.number
                }
            }).then(res => {
                console.log(res.data);
                if (res.data.code === 1) {
                    this.$Message.success("验证码正在发送中");
                } else {
                    clearInterval(clock);
                    that.codeText = "获取验证码";
                    that.sending = false;
                }
            });
            let clock = setInterval(function () {
                console.log(x);
                x--;
                that.codeText = "重新获取(" + x + "s)";
                if (x === -1) {
                    clearInterval(clock);
                    that.codeText = "获取验证码";
                    that.sending = false;
                }
            }, 1000);
        },
        toLogin() {
            this.loginMode = false;
            let openLoginObj = new MwLogin({
                self_redirect: false,
                id: "login",
                appid: "wxf50915f4de21fa0e",
                scope: "",
                redirect_uri: encodeURIComponent("http://localhost:8080"),
                state: "",
                style: "",
                href: "https://www.ibwei.com/css/wxlogin.css",
                app: "wx"
            });
        },
        logout() {
            this.$http({
                method: "post",
                url: api.user.logout,
                data: this.$store.state.user.userId
            }).then(res => {
                console.log(res.data);
                if (res.data.code === 1) {
                    this.$Message.success("退出成功");
                    this.$store.state.global.isLogin = false;
                    this.loginMode = true;
                    this.$store.state.user.avatarUrl =
                        "https://www.ibwei.com/images/question.png";

                    //删除持久化
                    sessionStorage.removeItem("userInfo");
                    sessionStorage.removeItem("isLogin");
                } else {
                    this.$Message.success("退出失败，未知错误");
                }
            });
        },
        phoneShow() {
            this.phoneLoginShow = true;
            console.log("手机号登录");
        },
        phoneLogin() {
            this.$http({
                method: "post",
                url: api.user.validateCode,
                data: {
                    phoneNumber: this.phone.number,
                    validateCode: this.phone.validateCode
                }
            }).then(res => {
                console.log(res.data);
                if (res.data.code === -1) {
                    this.$Message.success("验证码错误");
                } else if (res.data.code === 0) {
                    this.$Message.success("未知错误");
                } else {
                    this.$Message.success("登录成功");
                    this.$store.state.global.isLogin = true;

                    this.$store.state.user = res.data;
                    //做持久化登录处理
                    sessionStorage.setItem("isLogin", true);
                    let userInfoJson = JSON.stringify(this.$store.state.user);
                    sessionStorage.setItem("userInfo", userInfoJson);
                    this.$store.state.user.avatarUrl =
                        "https://www.ibwei.com/images/noavatar1.png";
                    this.phoneLoginShow = false;
                    this.$router.push({
                        path: "collect"
                    });
                }
            });
        },
        phoneHide() {
            this.phoneLoginShow = false;
        }
    }
};
</script>

<style lang="less" scoped>
.set {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
}

.graph {
    position: relative;
    width: 400px;
    height: auto;
    margin-left: 50%;
    left: -200px;
    margin-top: 200px;
    text-align: center;
}

#login {
    text-align: center;
    position: relative;
    width: 200px;
    margin-left: 50%;
    left: -100px;
}

.text {
    font-size: 20px;
    margin: 40px 0;
    font-weight: bold;
}

.scan {
    text-align: center;
}
</style>
