<template>
<div class="header">
    <Row class="header-item">
        <Col span="10">
        <div class="logoarea">
            <a href="/"><img src="../../static/img/logo.png" alt="logo"></a>
            <span>BEIOT</span>
        </div>
        </Col>
        <Col span="4">
        <div class="midarea">
            <Avatar :src="$store.state.user.avatarUrl" />
        </div>
        </Col>
        <Col span="10">
        <div class="rightarea">
            <ul class="menu">
                <li v-for="(item,index) in menus" :key="index" class="menu-list">
                    <router-link :to="item.url">{{item.name}}</router-link>
                </li>
                <li class="menu-list">
                    <router-link to="/write">
                        <Icon type="ios-compose-outline" class="write">12</Icon>
                    </router-link>
                </li>
            </ul>
        </div>
        </Col>
    </Row>
    <Row>
        <div class="topline">
            <Col span="24">
            <Divider orientation="center" style="font-size:10px;position:relative;top:-32px;z-index:999">蜜蜂生长发育形态自动识别与异常检测系统</Divider>
            </Col>
        </div>
    </Row>

    <Modal v-model="modal1" width="360">
        <p slot="header" class="mtitle">
            <Icon type="information-circled"></Icon>
            <span>注销提醒</span>
        </p>
        <div class="tcontent">
            <p>退出后，你将不能发表文章，也不能评论。</p>
            <p>你是否仍然坚持退出?</p>
        </div>
        <div slot="footer" class="no-radius">
            <Button type="primary" size="large" long @click="logOut" class="mfooter">退出</Button>
        </div>
    </Modal>
</div>
</template>
<script>
import {
    Row,
    Col,
    Icon,
    Avatar
} from "iview";

export default {
    name: "topbar",
    components: {
        Col,
        Icon,
        Row,
        Avatar
    },

    data() {
        return {
            initShow: false,
            modal1: false,
            user: [{
                username: "",
                avatar: "",
                level: "",
                id: ""
            }],
            regformShow: false,
            logformShow: false,
            isSign: false,
            avatarShow: false,
            menus: [{
                    url: "/infocenter",
                    name: "蜂场管理"
                },
                {
                    url: "/collect",
                    name: "蜂脾检测"
                },
                {
                    url: "/analysis",
                    name: "集群分析"
                },
                {
                    url: "/setting",
                    name: "设置"
                }
            ]
        };
    },

    created() {

    },

    methods: {
        logOut() {},

        toReg() {
            this.closeLogform();

            this.openRegform();
        },

        openLogform() {
            this.logformShow = true;
        },

        closeLogform() {
            this.logformShow = false;
        },

        change() {
            this.avatarShow = !this.avatarShow;
        },

        openRegform() {
            this.regformShow = true;
        },

        closeRegform() {
            this.regformShow = false;
        },

        loginSuccess(value) {},

        regSuccess() {
            this.closeRegform();

            let v1 = setTimeout(this.tips(), 500);

            let v2 = setTimeout(this.openLogform(), 700);
        },

        tips() {
            this.$Message.success("马上登录吧");
        },

        toinitShow() {
            this.initShow = true;
        }
    },

    computed: {},

    mounted() {
        this.$emit("add-load");
    }
};
</script>

<style lang="less" scoped>
@color1: #41b883;
@color2: #2c3e50;

.header {
    height: 60px;
    line-height: 60px;
}

.router-link-active {
    color: @color1;
}

.logoarea img {
    vertical-align: middle;
    margin-right: 5px;
    margin-left: 20px;
    width: 40px;

    height: 40px;
}

.logoarea span {
    display: inline-block;
    width: 260px;
    height: 40px;
    font-size: 26px;
    font-weight: bold;
    vertical-align: top;
}

a.active {
    color: @color1;
}

.midarea {
    cursor: pointer;
    text-align: center;
    vertical-align: top;
    margin-top: -7px;
}

.topBorder {
    box-shadow: 0px 1px 1px rgba(205, 205, 205, 0.3);
    background: #fff;
}

.header-item {
    text-align: left;
}

.rightarea {
    position: relative;
    text-align: right;
    width: 100%;
}

.menu {
    display: block;
    width: 100%;
    list-style-type: none;
    top: 10px;
    right: 5%;
    position: relative;
    line-height: 40px;
    font-size: 16px;

    .menu-list {
        display: inline-block;
        margin-right: 20px;
        font-family: "microsoft yahei" !important;

        a {
            font-family: "microsoft yahei" !important;
            font-weight: 700;
            text-shadow: 0 0px gainsboro;
            color: @color2;
        }

        a.active {
            color: @color1;
            font-weight: 700;
            font-family: "microsoft yahei" !important;
            /*border-bottom: 2px solid @color1;*/
        }
    }

    .menu-list:hover {
        a {
            font-family: "microsoft yahei" !important;
            color: @color1;
            font-weight: 700;
            /*border-bottom: 2px solid @color1;*/
        }
    }
}
</style>
