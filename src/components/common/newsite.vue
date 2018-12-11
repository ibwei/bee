<template>
<div class="imodel">
    <Form :model="formItem" :label-width="100" ref="newSiteData">
        <FormItem label="项目名称">
            <Input v-model="formItem.projectName" type="text"   placeholder="请输入项目名称" autocomplete="on"></Input>
        </FormItem>
        <FormItem label="蜂场名" v-if="editSite" >
            <Row>
                <Col span="18">
                <Input v-model="formItem.beeSiteName" type="text"   placeholder="请输入蜂场名" autocomplete="on"></Input>
                </Col>
                <Col span="6">
                <Button type="primary" @click="siteEditMode1">切换选择已有</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="蜂场名" v-if="!editSite" >
            <Select v-model="formItem.beeSiteName" filterable  label  @on-open-change="siteEditMode">
                <Option v-for="(item,index) of $store.state.global.beeSiteList" :key="index" value="item">{{item}}</Option>
                <Option value="selfName" style="background:#41b883">我要自己输入新的蜂场名</Option>
            </Select>
        </FormItem>
        <FormItem label="蜂场地区">
            <al-cascader v-model="formItem.siteArea" />
        </FormItem>
        <FormItem label="详细地址">
            <Input v-model="formItem.stieDetailAddress" type="text"   placeholder="请输入详细地址" autocomplete="on"></Input>
        </FormItem>
        <FormItem label="分类" v-if="categoryMode">
            <Row>
                <Col span="18">
                <Input v-model="formItem.category" type="text"   placeholder="请输入分类名" autocomplete="on">
            </Input>
                </Col>
                <Col span="6">
                <Button type="primary" @click="changeCategoryMode1">切换选择已有</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="分类" v-if="!categoryMode">
            <Select v-model="formItem.category" filterable  label @on-open-change="changeCategoryMode">
                <Option v-for="(item,index) of $store.state.global.projectTypeList" :key="index" value="item">{{item}}</Option>
                <Option value="selfCategory" style="background:#41b883">我想创建新的分类</Option>
            </Select>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="formItem.memo" type="textarea"  placeholder="需要备注的内容写在这里"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('newSiteData')" >确定</Button>
        </FormItem>
    </Form>
</div>
</template>

<script>
import api from '../../api/index'
import getCurrentDate from '../../utils/index'
import { error } from 'util';
export default {
    components: {

    },
    data() {
        return {
            formItem: {
                siteName: '',
                category: '',
                beeBinCount: 0,
                honeycombCount: 0,
                siteArea: [],
                stieDetailAddress: '',
                memo: '',
                address:'',
                created_at:''
            },
            editSite: false,
            categoryMode: false
        }
    },
    methods: {
        handleSubmit(name) {
           let address = ''
           for(let i= 0;i<this.formItem.siteArea.length;i++){
               address+=this.formItem.siteArea[i].name
           }
           this.formItem.created_at=getCurrentDate();
           this.formItem.address+=address+this.formItem.stieDetailAddress
           this.$http({
               method:'post',
               url:api.project.newProject,
               data:{
                   userId:this.$store.state.user.userId,
                   projectName:this.formItem.projectName,
                   siteArea:this.formItem.address,
                   category:this.formItem.category,
                   memo:this.formItem.memo,
                   beeBinCount:this.formItem.beeBinCount,
                   honeycombCount:this.formItem.honeycombCount,
                   created_at:this.formItem.create_at
               }
           }).then((res)=>{
                this.$emit('new-finish',res.data)
           })
            
        },
        //切换蜂场名输入方式
        siteEditMode() {
            console.log(this.formItem.beeSiteName);
            if (this.formItem.beeSiteName === 'selfName') {
                this.editSite = !this.editSite
                this.formItem.beeSiteName = ""
            }

        },
        //切换蜂场名输入方式
        siteEditMode1() {
            this.editSite = !this.editSite
            this.formItem.beeSiteName = ""

        },
        //切换蜂场分类输入方式
        changeCategoryMode() {
            if (this.formItem.category === 'selfCategory') {
                this.categoryMode = !this.categoryMode
                this.formItem.category = ""
            }
        },
        //切换蜂场分类输入方式
        changeCategoryMode1() {
            this.categoryMode = !this.categoryMode
            this.formItem.category = ""
        }
        
    }
}
</script>

<style lang="less" scoped>

</style>
