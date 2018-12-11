<template>
<div class="content">
    <i-fix></i-fix>
    <Card shadow style="width:100%;border-top:1px solid #f0f0f0;position:relative">
        <p slot="title" class="main-title">
            <Icon type="logo-buffer" style="font-size:28px;vertical-align:middle;" />
            <span tyle="font-size:28px;vertical-align:middle;"> 历史检测记录</span>
            <div class="search-area">
                <Form inline :label-width="70">
                    <FormItem label="检测编号">
                        <Input type="text" v-model="searchData.checkId" placeholder="请输入检测编号" @on-change="toSearch"></Input>
                    </FormItem>
                    <FormItem label="项目名称">
                        <Input type="text" v-model="searchData.projectName" placeholder="请输入项目名称" @on-change="toSearch"></Input>
                    </FormItem>
                    <FormItem label="蜂种">
                        <Select v-model="searchData.beeType" filterable label @on-change="toSearch">
                             <Option v-for="(item,index) of $store.state.global.beeTypeList" :key="index" :value="item">{{item}}</Option>    
                           </Select>
                    </FormItem>
                    <FormItem label="蜂箱号">
                        <Input type="text" v-model="searchData.beeBin" placeholder="请输入蜂箱号" autocomplete="on" @on-change="toSearch"></Input>
                    </FormItem>

                    <FormItem label="检测目的">
                        <Select v-model="searchData.checkType" filterable label @on-change="toSearch">
                             <Option v-for="(item,index) of $store.state.global.checkTypeList" :key="index" :value="item">{{item}}</Option>    
                           </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="toSearch">搜索</Button>
                        <Button type="primary" @click="toReset">清空</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="table-area">
                <Table border :columns="mainTable" :data="tableData"></Table>
            </div>
            <div class="page-area">
                <Page :total="checkHistoryLength" show-total show-sizer show-elevator @on-change="nextPage" @on-page-size-change="changePageSize" />
            </div>
    </Card>
</div>
</template>

<script>
import iSelect from "@/components/common/iselect";
import iFix from "@/components/common/ifix";
import iFix1 from "@/components/common/ifix1";
import iNewsite from "@/components/common/newsite";
import iEditsite from "@/components/common/editsite";
import iView from 'iview'
import api from '../api/index'
export default {
    name: "checkhistory",
    components: {
        iSelect,
        iFix,
        iFix1,
        iNewsite,
        iEditsite
    },
    created() {
        this.initCheckHistory('');
    },
    methods: {
        initCheckHistory(projectName) {
            //console.log(projectName);
            iView.LoadingBar.start()
            this.$http({
                method: "post",
                url: api.check.checkHistory,
                data: {
                    user: this.$store.state.user.userId,
                    projectName:projectName,
                }
            }).then(response => {
               // console.log(response.data)
                this.checkHistoryLength = response.data.length
                this.allTableData = response.data
                this.tableData = this.allTableData.splice(this.startLimit, this.pageSize)
                iView.LoadingBar.finish()
            });
        },
        showNewCategory() {
            this.$Message.info("请在表格中输入新的分类名");
            this.showNewCategoryDialog = true;
        },
        showNewSite() {
            this.$Message.info("请在表格中输入蜂场信息");
            this.showNewSiteDialog = true;
        },

        saveNewCategoryName() {
            this.$Message.info("正在保存分类名");
        },
        editSite(index) {
            //console.log("即将修改:" + index);
            this.showEditSiteDialog = true;
        },
        deleteSite(index) {
            //console.log("即将删除：" + index);
            this.showDeleteDialog = true;
        },
        deleteSiteTrue() {
            this.$Loading.start();
            this.showDeleteDialog = false;
            this.$Message.success("删除成功");
            this.$Loading.finish();
        },
        toSearch() {
            this.startLimit = 0;
            //console.log(this.searchData);
            this.$http({
                method: "post",
                url: api.check.searchCheck,
                data: {
                    checkId: this.searchData.checkId,
                    projectName: this.searchData.projectName,
                    beeType: this.searchData.beeType,
                    userId: this.$store.state.user.userId,
                    beeBin: this.searchData.beeBin,
                    checkType: this.searchData.checkType,
                }
            }).then(res => {
                if (res.data !== 0) {
                    this.checkHistoryLength = res.data.length
                    this.allTableData = res.data
                    this.tableData = this.allTableData.splice(this.startLimit, this.pageSize)
                    iView.LoadingBar.finish()
                } else {
                    iView.LoadingBar.error()
                }
            });
        },
        //下一页表格内容
        nextPage(page) {
            this.allTableData.splice(this.startLimit, 0, ...this.tableData)
            this.startLimit = (page - 1) * this.pageSize;
            this.tableData = this.allTableData.splice(this.startLimit, this.pageSize)
        },
        //更改表格每页展示数
        changePageSize(page) {
            this.allTableData.splice(this.startLimit, 0, ...this.tableData)
            this.pageSize = page
            this.startLimit = 0
            this.tableData = this.allTableData.splice(this.startLimit, this.pageSize)
        },
        toReset() {
            this.$set(this.searchData, 'projectName', '')
            this.$set(this.searchData, 'checkId', '')
            this.$set(this.searchData, 'beeType', '')
            this.$set(this.searchData, 'honeycombType', '')
            this.$set(this.searchData, 'checkType', '')
            this.$Message.info('已经清空搜索条件')
        },
        //下载报告
        downloadReport(index){
            let report = window.open(this.tableData[index].pdfUrl,"检测报表");
            report.focus();   
        },
        viewReport(index){
           this.$emit('view-report',this.tableData[index].checkId)
        }
    },
    data() {
        return {
            pageSize: 10,
            checkHistoryLength: 0,
            startLimit: 0,
            searchData: {
                checkId: "",
                projectName: "",
                beeType: "",
                honeycombType: "",
                checkType: "",
                beeBin: ""
            },
            newCategoryName: "",
            showNewSiteDialog: false,
            showNewCategoryDialog: false,
            showEditSiteDialog: false,
            showDeleteDialog: false,
            mainTable: [{
                    title: "检测编号",
                    key: "checkId",
                    sortable: true
                },
                {
                    title: "项目名称",
                    key: "projectName"
                },
                {
                    title: "蜂种",
                    key: "beeType"
                },
                {
                    title: "蜂箱",
                    key: "beeBin"
                },
                {
                    title: "蜂脾类型",
                    key: "honeycombType"
                },
                {
                    title: "检测目的",
                    key: "checkType"
                },
                {
                    title: "A面封盖率",
                    key: "aCoverRate",
                    sortable: true
                },
                {
                    title: "B面封盖率",
                    key: "bCoverRate",
                    sortable: true
                },
                {
                    title: "平均封盖率",
                    key: "coverRateAverage",
                    sortable: true
                },

                {
                    title: "A面产卵个数",
                    key: "aBornCount",
                    sortable: true
                },
                {
                    title: "B面产卵个数",
                    key: "aBornCount",
                    sortable: true
                },
                {
                    title: "平均产卵个数",
                    key: "bornAverage",
                    sortable: true
                },
                {
                    title: "检测时间",
                    key: "checkTime",
                    sortable: true
                },    {
                    title: "操作",
                    key: "action",
                    width: 170,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button", {
                                    props: {
                                        type: "default",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.viewReport(params.index);
                                        }
                                    }
                                },
                                "在线查看"
                            ),
                            h(
                                "span", {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                },
                                " "
                            ),
                            h(
                                "Button", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.downloadReport(params.index);
                                        }
                                    }
                                },
                                "打印报表"
                            ),
                             
                        ]);
                    }
                }
            ],
            tableData: [],
            allTableData: [],
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
    height: 30px;
    text-align: left;
    padding-left: 10px;
    color: #187;
    line-height: 30px;
}

.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
        top: 0;
    }
}
</style>
