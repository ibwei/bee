<template>
<div class="collect">
    <div v-if="!checkMode" class="history-area">
        <div class="check-start">
            <div class="center" @click="startTocheck">
                <circle5 style="text-align:center;width:100px;height:100px;"></circle5>
            </div>
            <div class="start" @click="startTocheck">
                开始检测
            </div>
        </div>
        <check-history v-on:download="readyToDownload" v-on:view-report="readyToView" ref="myhistory"></check-history>
    </div>
    <div v-show="checkMode" class="check-area">
        <Row>
            <Col span="7" offset="2">
            <div id="imgarea">
                <Card shadow style="border-top:1px solid #fafafa">
                    <i-fix1></i-fix1>
                    <p slot="title">
                        <Icon type="md-ionic" style="font-size:26px;color:#41b883;margin-right:5px;" />蜂脾检测图片</p>
                    <div class="ia-content">
                        <Card shadow>
                            <vue-preview :slides="slide1" style="width:350px;height:500px;text-align:center;overflow:hidden"></vue-preview>
                        </Card>
                    </div>
                    <div class="ia-button">
                        <Card shadow>
                            <Button type="primary" disabled>点击图片放大查看</Button>
                        </Card>
                    </div>
                </Card>
            </div>
            </Col>
            <Col span="13">
            <div id="inputarea">
                <Card shadow style="border-top:1px solid #f0f0f0">
                    <p slot="title">
                        <Icon type="ios-create" style="font-size:26px;color:#41b883;margin-right:5px;" />
                        蜂脾检测结果</p>
                    <Button-group class="button-group">
                        <Button type="default"  @click="toCheckHistory">检测历史</Button>
                        <Button type="default" @click="startTocheck">继续检测</Button>
                        <Button type="default" @click="downloadCheckReport">打印报表</Button>
                    </Button-group>

                    <div class="formarea">

                        <Row>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">检测编号:{{checkReportData.checkId}}</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">所属项目:{{checkReportData.projectName}}</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">蜂场:{{checkReportData.beeSiteName}}</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">检种:{{checkReportData.beeType}}</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">蜂箱号:{{checkReportData.beeBin}}</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">蜂脾类型:{{checkReportData.honeycombType}}</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="error" class="my-tag">检测目的:{{checkReportData.checkType}}</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">出生时间:{{checkReportData.birthday}}</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">开产时间:{{checkReportData.birthday}}</Tag>
                            </Col>
                            <Col span="8" v-if="checkReportData.checkType==='产卵力'">
                            <Tag type="dot" color="primary" class="my-tag">产卵时长:{{checkReportData.bornSpend}}小时</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">世代:{{checkReportData.generation}}</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">授精方式:{{checkReportData.fertilization}}</Tag>
                            </Col>
                            <Col span="8">
                            <Tag type="dot" color="primary" class="my-tag">检测者:{{checkReportData.checkUser}}</Tag>
                            </Col>
                            <Col span="8" v-if="checkReportData.aCoverRate">
                            <Tag type="dot" color="success" class="my-tag">第一面封盖率:{{checkReportData.aCoverRate*100}}%</Tag>
                            </Col>
                            <Col span="8" v-if="checkReportData.bCoverRate">
                            <Tag type="dot" color="success" class="my-tag">第二面封盖率:{{checkReportData.bCoverRate*100}}%</Tag>
                            </Col>
                            <Col span="8" v-if="checkReportData.averageCoverRate">
                            <Tag type="dot" color="success" class="my-tag">综合封盖率：{{checkReportData.averageCoverRate*100}}</Tag>
                            </Col>
                            <Col v-if="checkReportData.aBornCount">
                            <Tag type="dot" color="success" class="my-tag">第一面产卵个数:{{checkReportData.aBornCount}}</Tag>
                            </Col>
                            <Col span="8" v-if="checkReportData.bBornCount">
                            <Tag type="dot" color="success" class="my-tag">第二面产卵个数:{{checkReportData.bBornCount}}</Tag>
                            </Col>
                            <Col span="8" v-if="checkReportData.averageBornCount">
                            <Tag type="dot" color="success" class="my-tag">平均产卵个数:{{checkReportData.averageBornCount}}个</Tag>
                            </Col>
                            <Col span="12">
                            <Tag type="dot" color="primary" class="my-tag" style="width:230px;">检测时间:{{checkReportData.checkTime}}</Tag>
                            </Col>
                        </Row>

                    </div>
                    <div class="menu">
                        <Tabs type="card">
                            <TabPane label="常规分析" icon="ios-ionic">
                                <div class="graph-area">
                                    <Card shadow>
                                        <Row>
                                            <div v-show="checkReportData.checkType==='封盖率'">
                                                <Col span="8">
                                                <div id="graphArea1">
                                                </div>
                                                </Col>
                                                <Col span="8">
                                                <div id="graphArea2">
                                                </div>
                                                </Col>
                                                <Col span="8">
                                                <div id="graphArea3">
                                                </div>
                                                </Col>
                                            </div>
                                            <div v-show="checkReportData.checkType==='产卵力'">
                                                <Col span="24">
                                                <div id="graphArea4"></div>
                                                </Col>
                                            </div>
                                        </Row>
                                    </Card>

                                </div>
                            </TabPane>
                            <TabPane label="异常分析" icon="ios-snow">

                                <div class="graph-area1">
                                    <circle5></circle5>
                                </div>
                                <div class="graph-text1">
                                    该功能尚在测试中
                                </div>

                            </TabPane>
                        </Tabs>
                    </div>
                </Card>
            </div>
            </Col>
        </Row>
    </div>
    <Modal v-model="showNewCheckPanel" footer-hide fullscreen>
        <p slot="header" style="color:#41b883;text-align:center;">
            <Icon type="ios-construct"></Icon>
            <span>开始进行蜂脾检测</span>
        </p>
        <div style="text-align:center" class="model-content">
            <div class="step-area">
                <Steps :current="currentStep">
                    <Step title="选择检测信息"></Step>
                    <Step title="检测蜂脾第一面"></Step>
                    <Step title="检测蜂脾第二面"></Step>
                    <Step title="检测完成"></Step>
                </Steps>
            </div>
            <div class="check-inputarea">
                <div class="form-label">
                    <span style="font-size:16px;">已选参数：</span>
                    <Tag color="primary" type="dot" v-if="formItem.projectName">{{formItem.projectName}}</Tag>
                    <Tag color="primary" type="dot" v-if="formItem.beeSiteName">{{formItem.beeSiteName}}</Tag>
                    <Tag color="primary" type="dot" v-if="formItem.beeType">{{formItem.beeType}}</Tag>
                    <Tag color="primary" type="dot" v-if="formItem.beeBin">{{formItem.beeBin}}</Tag>
                    <Tag color="primary" type="dot" v-if="formItem.honeycombType">{{formItem.honeycombType}}</Tag>
                    <Tag color="primary" type="dot" v-if="formItem.checkType">{{formItem.checkType}}</Tag>
                    <Tag color="primary" type="dot" v-if="formItem.birthday">{{formItem.birthday}}</Tag>
                    <Tag color="primary" type="dot" v-if="formItem.startTime">{{formItem.startTime}}</Tag>
                    <Tag color="primary" type="dot" v-if="formItem.produceSpend">{{formItem.produceSpend}}</Tag>
                    <Tag color="primary" type="dot" v-if="formItem.fertilizationType">{{formItem.fertilizationType}}</Tag>
                    <Tag color="primary" type="dot" v-if="formItem.generation">{{formItem.generation}}</Tag>
                </div>
                <div class="form-area">
                    <Form :model="formItem" :label-width="120" ref="newSiteData">
                        <div class="tab" v-if="stepDivShow[0]">
                            <FormItem label="项目名">
                                <Select v-model="formItem.projectName" filterable >
                                    <Option v-for="(item,index) of $store.state.global.projectNameList" :key="index" :value="item">{{item}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="蜂场名">
                                <Select v-model="formItem.beeSiteName" filterable >
                                    <Option v-for="(item,index) of $store.state.global.beeSiteList" :key="index" :value="item">{{item}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="蜂种">
                                <Select v-model="formItem.beeType" filterable label>
                                    <Option value="中华蜜蜂">中华蜜蜂</Option>
                                    <Option value="西方蜜蜂">西方蜜蜂</Option>
                                 </Select>
                            </FormItem>
                            <FormItem label="请输入蜂箱号">
                                <Input v-model="formItem.beeBin" type="text" number  placeholder="请输入检测蜂箱号" autocomplete="on"></Input>
                            </FormItem>
                            <FormItem label="蜂脾类型" v-if="categoryMode">
                                <Row>
                                    <Col span="18">
                                    <Input v-model="formItem.honeycombType" type="text"   placeholder="请选择蜂脾类型" autocomplete="on">
                                     </Input>
                                    </Col>
                                    <Col span="6">
                                    <Button type="primary" @click="changeCategoryMode1">切换选择已有</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem label="蜂脾类型" v-if="!categoryMode">
                                <Select v-model="formItem.honeycombType" filterable  label @on-open-change="changeCategoryMode">
                                    <Option value="中标框">中标框</Option>
                                    <Option value="意标框">意标框</Option>
                                    <Option value="selfCategory" style="background:#41b883">我要创建新的分类</Option>
                             </Select>
                            </FormItem>
                            <FormItem label="请选择检测类型">
                                <Select v-model="formItem.checkType" filterable label>
                                    <Option value="封盖率">封盖率</Option>
                                    <Option value="产卵力">产卵力</Option>
                                 </Select>
                            </FormItem>
                            <FormItem label="蜂王出生时间">

                                <DatePicker @on-change="changeBirthday" type="datetime" placeholder="请选择出生时间" style="width:100%;"></DatePicker>

                            </FormItem>
                            <FormItem label="开产时间">
                                <DatePicker @on-change="changeStartTime" type="datetime" style="width:100%;" placeholder="请选择开产时间"></DatePicker>
                            </FormItem>
                            <FormItem label="产卵时长（单位：小时）" v-if="formItem.checkType==='产卵力'">
                                <Input v-model="formItem.produceSpend" type="text" number  placeholder="请输入产卵时长" ></Input>
                            </FormItem>
                            <FormItem label="选育世代">
                                <Input v-model="formItem.generation" type="text" number  placeholder="请输入选育世代" ></Input>
                            </FormItem>
                            <FormItem label="授精类型">
                                <Select v-model="formItem.fertilizationType" filterable label>
                                    <Option value="自然交尾">自然交尾</Option>
                                    <Option value="人工授精">人工授精</Option>
                                 </Select>
                            </FormItem>

                        </div>
                        <div class="tab" v-if="stepDivShow[1]">
                            <div class="tab-img">
                                <rotate-square style="width:100px;height:100px"></rotate-square>
                            </div>
                            <div class="tab-text">
                                请将蜂脾第一面放入到机器中
                            </div>
                        </div>
                        <div class="tab" v-if="stepDivShow[2]">
                            <div class="tab-img">
                                <rotate-square style="width:100px;height:100px"></rotate-square>
                            </div>

                            <div class="tab-text">
                                取出蜂脾，将另外一面放入机器中
                            </div>

                        </div>
                        <div class="tab" v-if="stepDivShow[3]">
                            <div class="tab-img">
                                <img src="../../static/img/success.png" width="100px" height="100px" alt="">
                            </div>
                            </div>
                            <div v-if="currentStep!==3">
                                <Button @click="argsConfirm" type="primary" v-if="currentStep==0">下一步</Button>
                                <Button @click="frontConfirm" type="primary" v-if="currentStep==1">下一步</Button>
                                <Button @click="backConfirm" type="primary" v-if="currentStep==2">下一步</Button>
                            </div>
                            <div v-else style="margin-top:60px;" size="large">
                                <Button type="default" @click="toCheckReport">正在自动跳转...</Button>
                            </div>
                    </Form>
                </div>
            </div>
        </div>
    </Modal>
    <i-fullloading v-if="fullLoadingShow" :noticeText="noticeText1"></i-fullloading>
</div>
</template>

<script>
import Vue from "vue";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/radar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import iFullloading from "@/components/common/ifullloading";
import { Circle5, RotateSquare, Diamond } from "vue-loading-spinner";
import iFix from "@/components/common/ifix";
import iFix1 from "@/components/common/ifix1";
import iSelect from "@/components/common/iselect";
import checkHistory from "@/components/checkhistory";
import VuePreview from "vue-preview";
import getCurrentDate from "../utils/index";
import iView from "iview";
import api from "../api/index";
import Downloader from "@lassehaslev/vue-downloader";
Vue.use(VuePreview);
import { Row, Col, Icon, Avatar, Tabs } from "iview";
import { setTimeout } from "timers";
export default {
  name: "collect",
  components: {
    Col,
    Icon,
    Row,
    Avatar,
    iSelect,
    Tabs,
    iFix,
    iFix1,
    checkHistory,
    Circle5,
    iFullloading,
    Diamond,
    RotateSquare,
    Downloader
  },
  created() {},
  mounted() {
    //console.log(this.$route.query.projectName)
    if (this.$route.query.projectName !== "") {
      this.$refs.myhistory.initCheckHistory(this.$route.query.projectName);
      this.$route.query.projectName = "";
    }
    //console.log(document.getElementById('graphArea1'))
    this.myChart1 = echarts.init(document.getElementById("graphArea1"));
    this.myChart2 = echarts.init(document.getElementById("graphArea2"));
    this.myChart3 = echarts.init(document.getElementById("graphArea3"));
    this.myChart4 = echarts.init(document.getElementById("graphArea4"));
    // if (this.checkType === '封盖率') {
    //     this.initGraph('封盖率')
    // } else {
    //     this.initGraph('产卵力')
    // }
  },
  watch: {
    currentStep() {
      let i = this.currentStep;
      this.stepDivShow.splice(0, 0, false, false, false, false);
      this.stepDivShow.splice(i, 0, true);
    }
  },
  methods: {
    //更改日期控件时间
    changeBirthday(value) {
      this.formItem.birthday = value;
    },
    changeStartTime(value) {
      console.log(value);
      this.formItem.startT = value;
    },
    //检测历史组件发出查看请求
    readyToView(checkId) {
      this.$set(this.formItem, "checkId", checkId);
      //console.log(this.formItem.checkId);
      this.toCheckReport();
    },
    readyToDownload(checkId) {
      //console.log(checkId)
    },
    //下载当前报表
    downloadCheckReport() {
      let report = window.open(this.checkReportData.pdfUrl, "检测报表");
      report.focus();
    },
    //打开历史检测记录
    toCheckHistory() {
      this.checkMode = false;
      this.showNewCheckPanel = false;
    },
    //打开检查结果界面
    toCheckReport() {
      iView.LoadingBar.start();
      this.$http({
        method: "post",
        url: api.check.getCheckReport,
        data: this.formItem.checkId
      }).then(res => {
        //console.log(res.data)
        if (res.data !== 0) {
          this.checkReportData = res.data;

          //绑定图片url
          this.$set(this.slide1[0], "src", this.checkReportData.aPictureUrl);
          this.$set(
            this.slide1[0],
            "msrc",
            this.checkReportData.aSmallPictureUrl
          );
          this.$set(this.slide1[1], "src", this.checkReportData.bPictureUrl);
          this.$set(
            this.slide1[1],
            "msrc",
            this.checkReportData.bSmallPictureUrl
          );

          if (this.checkReportData.checkType === "封盖率") {
            this.$set(
              this.checkReportData,
              "averageCoverRate",
              (this.checkReportData.aCoverRate +
                this.checkReportData.bCoverRate) /
                2
            );
          } else {
            this.$set(
              this.checkReportData,
              "averageBornCount",
              (this.checkReportData.aBornCount +
                this.checkReportData.bBornCount) /
                2
            );
          }
          this.checkMode = true;
          this.initGraph(this.checkReportData.checkType);
        } else {
          this.$Message.error("自动跳转出错");
        }
      });

      this.showNewCheckPanel = false;
      iView.LoadingBar.finish();
    },
    //几个对话框的方法
    argsConfirm() {
      //console.log('confirm1');
      if (
        !(
          this.formItem.projectName &&
          this.formItem.beeType &&
          this.formItem.beeBin &&
          this.formItem.honeycombType &&
          this.formItem.checkType
        )
      ) {
        this.$Message.error("还有选项没有填写");
        return false;
      }
      this.$Modal.confirm({
        title: "确认",
        content: "请确认所填参数，确认之后无法修改",
        onOk: () => {
          this.$Message.success("参数已确定，无法修改");
          this.addCurrentStep();
        },
        onCancel: () => {
          this.$Message.info("请确认参数");
        }
      });
    },
    frontConfirm() {
      this.$Modal.confirm({
        title: "你确定将蜂脾放入机器中了吗？",
        okText: "放好了",
        cancelText: "还没好",
        onOk: () => {
          this.$Message.success("正在分析，请稍后");
          //发起第一次分析请求
          //成功
          this.noticeText1 = "正在分析蜂脾第一面，预计五分钟，请稍后...";
          this.fullLoadingShow = true;

          //发起分析第一面的请求

          this.startLimit = 0;
          this.$http({
            method: "post",
            url: api.check.aCheck,
            data: {
              projectName: this.formItem.projectName,
              beeType: this.formItem.beeType,
              checkType: this.formItem.checkType,
              honeycombType: this.formItem.honeycombType,
              beeBin: this.formItem.beeBin,
              birthday: this.formItem.birthday,
              startTime: this.formItem.startTime,
              produceSpend: this.formItem.produceSpend,
              fertilizationType: this.formItem.fertilizationType,
              generation: this.formItem.generation
            }
          }).then(res => {
            if (res.data !== 0) {
              this.$set(this.formItem, "checkId", res.data);
              //console.log(res.data)
              //console.log(this.formItem)
              this.$Message.success("第一面分析成功");
              this.addCurrentStep();
              this.fullLoadingShow = false;
            } else {
              this.$Message.error("服务器错误");
              this.fullLoadingShow = false;
            }
          });

          //失败
        },
        onCancel: () => {
          this.$Message.info("去做好准备工作吧");
        }
      });
    },
    backConfirm() {
      this.$Modal.confirm({
        title: "将蜂脾的另一面放入机器中了吗？",
        okText: "放好了",
        cancelText: "还没好",
        onOk: () => {
          this.$Message.success("正在分析，请稍后");
          //发起第一次分析请求
          //成功
          this.noticeText1 = "正在分析蜂脾另一面，预计五分钟，请稍后...";
          this.fullLoadingShow = true;
          this.$http({
            method: "post",
            url: api.check.bCheck,
            data: this.formItem.checkId
          }).then(res => {
            if (res.data === 1) {
              this.$Message.success("第二面分析成功");
              this.addCurrentStep();
              this.fullLoadingShow = false;
              this.toCheckReport();
            } else {
              this.$Message.error("服务器错误");
              this.fullLoadingShow = false;
            }
          });
          //失败
        },
        onCancel: () => {
          this.$Message.info("将蜂脾的另一面放入机器中吧");
        }
      });
    },
    startTocheck() {
      //console.log('start to check');
      this.formItem.birthday = getCurrentDate();
      this.formItem.startTime = getCurrentDate();
      this.currentStep = 0;
      this.showNewCheckPanel = true;
    },
    rowClassName(row, index) {
      if (index % 2 == 1) {
        return "demo-table-info-row";
      } else if (index % 2 == 0) {
        return "demo-table-error-row";
      }
      return "";
    },
    initGraph(type) {
      //console.log('init graph')
      //console.log(this.checkReportData);
      //console.log(this.graphOption);
      this.checkMode = true;

      if (type === "封盖率") {
        //初始化A面图形
        this.graphOption.title.text = "A面封盖率";
        this.graphOption.series[0].data[0].value =
          this.checkReportData.aCoverRate * 100;
        this.graphOption.series[0].data[1].value =
          100 - this.checkReportData.aCoverRate * 100;
        //console.log(this.myChart1)
        this.myChart1.setOption(this.graphOption);
        //初始化B面图形
        this.graphOption.title.text = "B面封盖率";
        this.graphOption.series[0].data[0].value =
          this.checkReportData.bCoverRate * 100;
        this.graphOption.series[0].data[1].value =
          100 - this.checkReportData.bCoverRate * 100;
        this.myChart2.setOption(this.graphOption);
        //初始化综合图形
        this.graphOption.title.text = "综合封盖率";
        let average =
          ((this.checkReportData.averageCoverRate +
            this.checkReportData.averageCoverRate) /
            2) *
          100;
        this.graphOption.series[0].data[0].value = average;
        this.graphOption.series[0].data[1].value = 100 - average;
        this.myChart3.setOption(this.graphOption);
      } else {
        this.barOption.series[0].data.splice(
          0,
          1,
          this.checkReportData.aBornCount
        );
        this.barOption.series[0].data.splice(
          1,
          1,
          this.checkReportData.bBornCount
        );
        this.barOption.series[0].data.splice(
          2,
          1,
          this.checkReportData.averageBornCount
        );
        this.barOption.series[0].data.splice(
          3,
          1,
          this.checkReportData.aBornCount + this.checkReportData.bBornCount
        );
        //console.log(this.barOption)
        this.myChart4.setOption(this.barOption);
      }
    },
    //切换蜂场名输入方式
    siteEditMode() {
      //console.log(this.formItem.siteName);
      if (this.formItem.siteName === "selfName") {
        this.siteMode = !this.siteMode;
        this.formItem.siteName = "";
      }
    },
    //切换蜂场名输入方式
    siteEditMode1() {
      this.siteMode = !this.siteMode;
      this.formItem.siteName = "";
    },
    //切换蜂场分类输入方式
    changeCategoryMode() {
      if (this.formItem.honeycombType === "selfCategory") {
        this.categoryMode = !this.categoryMode;
        this.formItem.honeycombType = "";
      }
    },
    //切换蜂场分类输入方式
    changeCategoryMode1() {
      this.categoryMode = !this.categoryMode;
      this.formItem.honeycombType = "";
    },
    minusCurrentStep() {
      this.currentStep--;
    },
    addCurrentStep() {
      this.currentStep++;
    }
  },
  data() {
    return {
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      checkType: "产卵力",
      slide1: [
        {
          src: "../../static/img/beewait.png",
          msrc: "../../static/img/beewaitbig.png",
          alt: "正面",
          title: "蜂脾第一面",
          w: 1600,
          h: 900
        },
        {
          src: "../../static/img/beewait.png",
          msrc: "../../static/img/beewait.png",
          alt: "反面",
          title: "蜂脾第二面",
          w: 1600,
          h: 900
        }
      ],
      noticeText1: "",
      fullLoadingShow: false,
      stepDivShow: [true, false, false, false],
      formItem: {
        projectName: "",
        beeSiteName: "",
        beeType: "",
        checkType: "",
        honeycombType: null,
        beeBin: null,
        birthday: null,
        startTime: null,
        produceSpend: null,
        fertilizationType: null,
        generation: null
      },
      siteMode: false,
      categoryMode: false,
      currentStep: 0,
      showNewCheckPanel: false,
      percent: 0,
      checkMode: false,
      imgUrl: "./../../static/img/fix.png",
      checkReportData: [],
      barOption: {
        title: {
          text: "产卵个数表",
          x: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["产卵个数"]
        },
        color: ["#41b883"],
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: ["A面产卵个数", "B面产卵个数", "平均产卵个数", "产卵总个数"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "产卵个数",
            type: "bar",
            data: [32, 9, 23, 89]
          }
        ]
      },
      graphOption: {
        title: {
          text: "封盖率",
          subtext: "单位（百分比）",
          x: "center"
        },
        color: [
          "#41b883",
          "#dee7e3",
          "#2f4554",
          "#61a0a8",
          "#d48265",
          "#91c7ae",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}% 占比"
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: 0,
          data: ["已封盖", "未封盖"]
        },
        series: [
          {
            name: "蜂脾封盖率",
            type: "pie",
            radius: "48%",
            center: ["50%", "50%"],
            data: [
              {
                value: 90,
                name: "已封盖"
              },
              {
                value: 10,
                name: "未封盖"
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 5,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      tabs: 1
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
@color1: #41b883;
@color2: #2c3e50;

.collect {
  margin-bottom: 40px;
  padding: 20px;
}

.graph-text1 {
  text-align: center;
  font-size: 16px;
  margin-top: 40px;
  font-weight: bold;
  color: #000;
}

#imgarea,
#inputarea,
.result {
  margin: -20px 20px 20px 20px;
  padding: 20px 10px;
}

#inputarea {
  position: relative;
}

#imgarea {
  position: relative;
  text-align: center;
}

.ia-title {
  text-align-last: left;
}

.ia-content {
  text-align: center;
  width: 100%;
}

.ia-notice {
  text-align: center;
}

.button-area {
  margin: 30px 0 10px 0;
}

.button-area1 {
  text-align: left;
}

.graph-area {
  margin: 10px 0;
  margin-left: -80px;
}

.graph-area1 {
  position: relative;
  margin-top: 60px;
  margin-left: 50%;
  width: 40px;
  left: -20px;
  transform: scale(2);
}

.table-area {
  margin-top: 20px;
  margin-left: 30px;
  width: 95%;
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

.history-area {
  margin-top: 20px;
  text-align: center;
  padding: 0 5%;
  height: auto;
  margin-bottom: 130px;
}

.check-start {
  position: relative;
  top: 0;
  left: 0;
  height: 160px;
  width: 100%;
  text-align: center;
}

.start {
  font-size: 16px;
  position: relative;
  text-align: center;
  top: -60px;
  color: #41b886;
  text-shadow: 1px 1px #fff;
  cursor: pointer;
}

.center {
  position: relative;
  width: 100px;
  margin-left: 50%;
  left: -50px;
  transform: scale(1.2);
  cursor: pointer;
}

.check-inputarea {
  margin-top: 50px;
  width: 100%;
}

.form-area {
  margin-left: 25%;
  width: 50%;
}

.model-content {
  margin-top: 50px;
  width: 80%;
  margin-left: 10%;
  text-align: center;
}

.form-label {
  margin: 40px;
  height: 50px;
  width: 100%;
  text-align: center;
}

.tab {
  position: relative;
  width: 100%;
  height: auto;
  text-align: center;

  .tab-img {
    text-align: center;
    position: relative;
    width: 200px;
    height: 200px;
    margin: 60px 0 0px 50%;
    left: -100px;
    font-weight: bold;
  }

  .tab-text {
    font-size: 20px;
    margin-bottom: 40px;
    font-weight: bold;
  }
}

.result-img {
  cursor: pointer;
}

.menu {
  margin-top: 40px;
  //border:1px solid red;
}

.formarea {
  text-align: left;
}

.my-tag {
  width: 200px;
  font-size: 14px;
}

#graphArea1,
#graphArea2,
#graphArea3 {
  width: 320px;
  height: 300px;
  text-align: center;
}

#graphArea4 {
  display: block;
  width: 500px;
  height: 400px;
  margin-left: 100px;
}

.button-group {
  position: absolute;
  left: 20px;
  top: 10px;
}
</style>
