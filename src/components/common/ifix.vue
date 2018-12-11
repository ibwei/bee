<template>
<div class="fix1">
    <img :src="imgUrl" alt="" width="100" height="auto">
    </div>
</template>

<script>
export default {
    name: "ifix",
    props: {
        imgUrl: {
            type:String,
            default: '../../../static/img/fix3.png'
        }
    }

}
</script>

<style lang="less">
.fix1 {
    position: absolute;
    top: -3px;
    right: -4px;
    z-index: 999;
}
</style>
