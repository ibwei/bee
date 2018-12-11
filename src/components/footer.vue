<template>
<div class="footer">
    <div class="memo">BEIOT <br />蜜蜂生长发育形态自动识别与异常检测系统<br />Copyright © 2018 </div>
    </div>
</template>

<script>
export default {
    name: 'myfooter',
    mounted() {
        this.$emit('add-load')
    },
    created() {
        this.$emit('add-load')
    }
}
</script>

<style lang="less" scoped>
@color1: #41b883;
@color2: #2c3e50;

.footer {
    position: absolute;
    font-family: "Microsoft YaHei" !important;
    width: 100%;
    background: @color1;
    text-align: center;
    z-index: 2;
    left:0px;
	bottom:-2px;
	height: 100px;

    .memo {
        line-height: 1.5em;
        font-family: "Microsoft YaHei" !important;
        font-size: 14px;
		color: #fff;
		padding: 20px 0;
    }
}
</style>
