<template>
<div class="iselect"> 
    <Select v-model="model11" filterable>
                <Option v-for="item in list" :value="item.value" :color="success" :key="item.value">{{ item.label }}</Option>
            </Select>
</div>
</template>

<script>
export default {
  name: "iselect",
  props: {
    list: Array
  },
  data() {
    return {
      model11: ""
    };
  }
};
</script>

<style lang="less">
.iselect {
  display: inline-block;
  width: 70%;
}
</style>
