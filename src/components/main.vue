<template>
<Row>
    <Col span="24">
    <div class="index">
        <div class="content">
            <i-fix></i-fix>
            <Card shadow style="width:100%;border-top:1px solid #f0f0f0;position:relative">
                <p slot="title" class="main-title">
                    <Button type="primary"  size="large" @click="showNewSite">新建蜂场</Button>
                    <Button type="primary"  size="large" @click="showNewCategory">分类管理</Button>
                </p>
                <div class="search-area">
                    <Form ref="formInline" inline :label-width="70">
                        <FormItem label="蜂场编号">
                            <Input type="text" v-model="searchData.beeSiteId" placeholder="请输入蜂场编号" @on-change="toSearch"></Input>
                        </FormItem>
                        <FormItem label="蜂场名">
                            <Select v-model="searchData.beeSiteName" filterable label @on-change="toSearch">
                             <Option v-for="(item,index) of $store.state.global.beeSiteList" :key="index" :value="item">{{item}}</Option>  
                           </Select>
                        </FormItem>
                        <FormItem label="类型">
                            <Select v-model="searchData.category" filterable label @on-change="toSearch">
                             <Option v-for="(item,index) of $store.state.global.projectTypeList" :key="index" :value="item">{{item}}</Option>    
                           </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="toSearch">搜索</Button>
                            <Button type="primary" @click="toReset">清空</Button>
                        </FormItem>
                    </Form>
                </div>
                <div class="table-area">
                    <Table border :columns="mainTable" :data="tableData" :row-class-name="rowClassName"></Table>
                </div>
                <div class="page-area">
                    <Page :total="projectLength" show-total show-sizer show-elevator @on-change="nextPage" @on-page-size-change="changePageSize" />
                </div>
            </Card>
        </div>
    </div>
    <Modal v-model="showNewSiteDialog" title="新建蜂场" footer-hide>
        <i-newsite v-on:new-finish="newOk"></i-newsite>
    </Modal>
    <Modal v-model="showEditSiteDialog" title="修改蜂场" footer-hide>
        <i-editsite :formItem="tableData[editIndex]" v-on:edit-finish="editOk"></i-editsite>
    </Modal>
    <Modal v-model="showNewCategoryDialog" title="分类管理" footer-hide>
        <div class="type-list">
            <div class="notice-txt">已有分类：</div>
            <Tag v-for="item in $store.state.global.projectTypeList" @on-close="deleteType" size="large" type="dot" color="success" :key="item" :name="item" closable>{{item}}</Tag>
        </div>
        <Form>
            <FormItem label="新建分类：">
                <Row>
                    <Col span="10">
                    <Input v-model="newCategoryName" type="text"   placeholder="请输入新的分类名" autocomplete="on"></Input>
                    </Col>
                    <Col span="6">
                    <Button type="primary" @click="saveNewCategoryName">确认</Button>
                    </Col>
                </Row>
            </FormItem>
        </Form>
    </Modal>
    </Col>
</Row>
</template>

<script>
import iSelect from "@/components/common/iselect";
import iFix from "@/components/common/ifix";
import iFix1 from "@/components/common/ifix1";
import iNewsite from "@/components/common/newsite";
import iEditsite from "@/components/common/editsite";
import api from "../api/index";
import iView from "iview";

export default {
    name: "index",
    components: {
        iSelect,
        iFix,
        iFix1,
        iNewsite,
        iEditsite
    },
    created() {
        //请求tabeltada的数据
        if (sessionStorage.getItem("isLogin")) {
            this.getTableData();
        }
    },
    methods: {
        //删除项目分类
        deleteType(event, value) {
            this.$Message.info("正在删除：" + value);
            this.$http({
                api: api.project.deleteProjectType,
                method: "post",
                data: {
                    userId: this.$store.state.user.userId,
                    typeName: value
                }
            }).then(res => {
                //返回操作处理
                this.$Message.info("删除成功");
            });
        },
        //请求tabeldata
        getTableData() {
            iView.LoadingBar.start();
            this.$http({
                method: "post",
                url: api.project.projectData,
                data: {
                    user: this.$store.state.user.userId
                }
            }).then(response => {
                this.projectLength = response.data.length;
                this.allTableData = response.data;
                this.tableData = this.allTableData.splice(
                    this.startLimit,
                    this.pageSize
                );
                iView.LoadingBar.finish();
            });
        },
        showNewCategory() {
            this.$Message.info("请在表格中输入新的分类名");
            this.showNewCategoryDialog = true;
        },
        rowClassName(row, index) {
            if (index === 1) {
                return "demo-table-info-row";
            } else if (index === 3) {
                return "demo-table-error-row";
            }
            return "";
        },
        showNewSite() {
            this.$Message.info("请在表格中输入蜂场信息");
            this.showNewSiteDialog = true;
        },

        saveNewCategoryName() {
            if (!this.newCategoryName) {
                this.$Message.error("你还未输入任何名字");
                return false;
            }
            this.$http({
                method: "post",
                url: api.project.newProjectType,
                data: {
                    newProjectType: this.newCategoryName,
                    userId: this.$store.state.user.userId
                }
            }).then(res => {
                if (res.data === 1) {
                    this.showNewCategoryDialog = false;
                    this.$Message.success("保存分类名成功");
                    this.$store.state.global.projectTypeList.splice(
                        this.$store.state.global.projectTypeList.length,
                        0,
                        this.newCategoryName
                    );
                    iView.LoadingBar.finish();
                } else {
                    this.$Message.success("未知错误");
                    iView.LoadingBar.error();
                }
            });
        },
        //查看蜂场详情
        viewSite(index) {
            console.log("即将打开该蜂场:" + this.tableData[index].beeSiteId);
            this.$router.push({
                path: "collect",
                query: {
                    beeSiteId: this.tableData[index].beeSiteId
                }
            });
        },
        editSite(index) {
            console.log("即将修改：" + index);
            this.showEditSiteDialog = true;
            this.editIndex = index;
        },
        editOk(ok) {
            this.showEditSiteDialog = false;
            if (ok === 1) {
                this.$Message.success("修改成功");
            } else if (ok === 0) {
                this.$Message.error("修改失败，服务器错误");
            } else {
                this.$Message.info("取消修改");
            }
        },
        newOk(ok) {
            if (ok) {
                this.$Message.success("新建成功");
                this.showNewSiteDialog = false;
                this.getTableData();
            } else {
                this.$Message.error("新建失败，服务器错误");
            }
        },
        toReset() {
            this.$set(this.searchData, "beeSiteId", "");
            this.$set(this.searchData, "beeSiteName", "");
            this.$Message.info("已经清空搜索条件");
        },
        toSearch() {
            console.log(this.searchData);
            iView.LoadingBar.start();
            this.$http({
                method: "post",
                url: api.project.searchProject,
                data: {
                    beeSiteId: this.searchData.beeSiteId,
                    beeSiteName: this.searchData.beeSiteName,
                    userId: this.$store.state.user.userId
                }
            }).then(res => {
                if (res !== 0) {
                    this.projectLength = res.data.length;
                    this.allTableData = res.data;
                    this.tableData = this.allTableData.splice(
                        this.startLimit,
                        this.pageSize
                    );
                    iView.LoadingBar.finish();
                } else {
                    iView.LoadingBar.error();
                }
            });
        },
        nextPage(page) {
            this.allTableData.splice(this.startLimit, 0, ...this.tableData);
            this.startLimit = (page - 1) * this.pageSize;
            this.tableData = this.allTableData.splice(this.startLimit, this.pageSize);
        },
        changePageSize(page) {
            this.allTableData.splice(this.startLimit, 0, ...this.tableData);
            this.pageSize = page;
            this.startLimit = 0;
            this.tableData = this.allTableData.splice(this.startLimit, this.pageSize);
        }
    },
    data() {
        return {
            pageSize: 10,
            projectLength: 0,
            allTableData: null,
            editIndex: 0,
            startLimit: 0,
            endLimit: 10,
            t: true,
            newCategoryName: "",
            showNewSiteDialog: false,
            showNewCategoryDialog: false,
            showEditSiteDialog: false,
            showDeleteDialog: false,
            value2: [],
            beeList: [{
                    value: "西方蜜蜂",
                    label: "西方蜜蜂"
                },
                {
                    value: "中华蜜蜂",
                    label: "中华蜜蜂"
                }
            ],
            honeycombList: [{
                    value: "意标框",
                    label: "意标框"
                },
                {
                    value: "中标框",
                    label: "中标框"
                },
                {
                    value: "自定义",
                    label: "自定义"
                }
            ],
            searchData: {
                beeSiteId: "",
                beeSiteName: "",
                category: ""
            },
            mainTable: [{
                    title: "蜂场编号",
                    key: "beeSiteId",
                    sortable: true
                },
                {
                    title: "蜂场名",
                    key: "beeSiteName",
                    sortable: true
                },
                {
                    title: "蜂场地址",
                    key: "address",
                    sortable: true
                },
                {
                    title: "分类",
                    key: "category",
                    sortable: true
                },
                {
                    title: "检测蜂箱数",
                    key: "beeBinCount",
                    sortable: true
                },
                {
                    title: "检测蜂脾数",
                    key: "honeycombCount",
                    sortable: true
                },
                {
                    title: "备注",
                    key: "memo",
                    sortable: true
                },
                {
                    title: "创建时间",
                    key: "editTime",
                    sortable: true
                },
                {
                    title: "操作",
                    key: "action",
                    width: 160,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.viewSite(params.index);
                                        }
                                    }
                                },
                                "查看详情"
                            ),
                            h("span", {
                                props: {
                                    type: "text"
                                }
                            }),
                            " ",
                            h(
                                "Button", {
                                    props: {
                                        type: "warning",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.editSite(params.index);
                                        }
                                    }
                                },
                                "修改"
                            )
                        ]);
                    }
                }
            ],
            tableData: []
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.delete-title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

.ivu-table .demo-table-info-row td {
    background-color: #2db7f5;
    color: #fff;
}

.ivu-table .demo-table-error-row td {
    background-color: #ff6600;
    color: #fff;
}

.ivu-table td.demo-table-info-column {
    background-color: #2db7f5;
    color: #fff;
}

.ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
}

.ivu-table .demo-table-info-cell-age {
    background-color: #ff6600;
    color: #fff;
}

.ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.index {
    text-align: center;
    padding: 0 5%;
    height: auto;
    margin-bottom: 130px;
}

.table-area {
    width: 100%;
    text-align: center;
}

.content {
    position: relative;
    width: 100%;
    text-align: center;
}

.page-area {
    margin-top: 20px;
    text-align: left;
}

.search-area {
    text-align: left;
}

.main-title {
    display: block;
    height: 35px;
    text-align: left;
    padding-left: 10px;
}

.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
        top: 0;
    }
}

.type-list {
    margin: 10px 0 30px 0;
    border: 1px dashed #c0c0c0;
    padding: 20px;

    .notice-txt {
        margin-left: 10px;
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: bold;
    }
}
</style>
