<template>
<div class="imode2">
    <Form :model="this.formItem" :label-width="100" ref="newSiteData" v-if="this.formItem">
        <FormItem label="项目编号">
            <Input v-if="formItem.projectId" v-model="formItem.projectId" type="text"    disabled autocomplete="on"></Input>
        </FormItem>
        <FormItem label="项目名称">
            <Input v-model="formItem.projectName" type="text"   placeholder="请输入项目名称" autocomplete="on"></Input>
        </FormItem>
        <FormItem label="蜂场名">
            <Row>
                <Col span="24">
                <Input v-model="formItem.beeSiteName" type="text"   placeholder="请输入蜂场名" autocomplete="on"></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="地区">
            <Input v-model="formItem.address" type="text"   placeholder="请输入详细地址" autocomplete="on"></Input>
        </FormItem>
        <FormItem label="检测蜂箱数">
            <Input v-model="formItem.beeBinCount" type="text"  number  autocomplete="on"></Input>
        </FormItem>
        <FormItem label="检测蜂脾数">
            <Input v-model="formItem.honeycombCount" type="text"  number   autocomplete="on"></Input>
        </FormItem>
        <FormItem label="分类">
            <Row>
                <Col span="24">
                <Input v-model="formItem.category" type="text"   placeholder="请输入蜂场名" autocomplete="on">
            </Input>
                </Col>

            </Row>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="formItem.memo" type="textarea"  placeholder="需要备注的内容写在这里"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="saveEditData">确认修改</Button>
            <Button style="margin-left: 8px" type="default" @click="cancelEdit">取消修改</Button>
        </FormItem>
    </Form>
</div>
</template>

<script>
import api from "../../api/index";
export default {
    name: 'ieditsite',
    props: {
        formItem: Object
    },
    created(){
      //console.log(this.formItem);
    },
    mounted(){
      //console.log(this.formItem);
    },
    components: {},
    data() {
        return {
            editSite: false,
            categoryMode: false
        };
    },
    methods: {
        cancelEdit() {
            this.$emit("edit-finish", -1);
        },

        //修改保存的数据
        saveEditData() {
            //console.log(api.project.editProject);
            //console.log("正在保存修改的数据");
            this.$http({
                method: "post",
                url: api.project.editProject,
                data: this.formItem
            }).then(response => {
                this.$emit("edit-finish", response.data);
            });
        },
        //切换蜂场名输入方式
        siteEditMode() {
            //console.log(this.formItem.siteName);
            if (this.formItem.siteName === "selfName") {
                this.editSite = !this.editSite;
                this.formItem.siteName = "";
            }
        },
        //切换蜂场名输入方式
        siteEditMode1() {
            this.editSite = !this.editSite;
            this.formItem.siteName = "";
        },
        //切换蜂场分类输入方式
        changeCategoryMode() {
            if (this.formItem.category === "selfCategory") {
                this.categoryMode = !this.categoryMode;
                this.formItem.category = "";
            }
        },
        //切换蜂场分类输入方式
        changeCategoryMode1() {
            this.categoryMode = !this.categoryMode;
            this.formItem.category = "";
        },
        handleSubmit(name) {
            //console.log(this.formItem);
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$Message.success("Success!");
                } else {
                    this.$Message.error("Fail!");
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
</style>
