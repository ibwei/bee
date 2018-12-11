<template>
<div id="app">
    <v-topbar></v-topbar>
    <router-view />
    <v-footer></v-footer>
    <BackTop></BackTop>
</div>
</template>

<script>
import api from './api/index'
import vTopbar from "@/components/topbar";
import vFooter from "@/components/footer";

export default {
    name: "App",
    components: {
        vTopbar,
        vFooter
    },
    created() {
        //获取蜂场名列表
        let isLogin = sessionStorage.getItem("isLogin")
        if (this.$route.query.login_token && !isLogin) {
            this.toLogin(this.$route.query.login_token);
            this.$router.push({path:'collect'})
        } else if (isLogin) {
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
            this.$store.state.user = userInfo
            this.$store.state.global.isLogin = true
            
        }
         this.getGlobalData();
    },
    methods: {
        toLogin(login_token) {
            this.$http({
                method: 'post',
                url: api.user.login,
                data: login_token,
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$Message.error('登录失败，请重新登录');
                } else {
                    this.$store.state.global.isLogin = true
                    this.$Message.success('登录成功');
                    this.$store.state.user = res.data

                    //做持久化登录处理
                    sessionStorage.setItem("isLogin", true);
                    let userInfoJson = JSON.stringify(this.$store.state.user);
                    sessionStorage.setItem("userInfo", userInfoJson);

                    // console.log(JSON.parse(sessionStorage.getItem("userInfo")));

                }

            })
        },
        getGlobalData() {
            this.$http({
                method: 'post',
                url: api.project.getAllSiet,
                data: this.$store.state.user.userId
            }).then((res) => {
                this.$store.state.global.beeSiteList = res.data
            })
            this.$http({
                method: 'post',
                url: api.project.getAllType,
                data: this.$store.state.user.userId
            }).then((res) => {
                this.$store.state.global.projectTypeList = res.data

            })
            this.$http({
                method: 'post',
                url: api.project.allProjectName,
                data: this.$store.state.user.userId
            }).then((res) => {
                this.$store.state.global.projectNameList = res.data
            })
        }
    }
}
</script>

<style lang="less">
@color1: #41b883;
@color2: #2c3e50;

.ivu-input,
.ivu-select,
.ivu-select-selection {
    border-radius: 0px;
}

@font-face {
    font-family: "font1";
    src: url("./assets/fonts/font1.otf");
    src: url("./assets/fonts/font1.ttf") format("truetype");
    font-style: normal;
    font-weight: normal;
}

#app {
    width: 100%;
    height: auto;
    min-height: 100%;
    font-family: "font1", "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei" !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
