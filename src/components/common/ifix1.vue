<template>
<div class="fix">
    <img :src="imgUrl" alt="" width="38" height="auto">
    </div>
</template>

<script>
export default {
    name: "ifix",
    props: {
        imgUrl: {
            type:String,
            default: '../../../static/img/fixblack.png'
        }
    }

}
</script>

<style lang="less">
.fix {
    position: absolute;
    top: -10px;
    left: 15px;
    z-index: 999;
}
</style>
