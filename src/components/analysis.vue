<template>
<div class="analysis">
    <div class="content">
        <div class="graph">
            <rotate-square2 style="width:120px;height:120px;"></rotate-square2>
        </div>
        <div class="text">
            该模块正在测试中
        </div>
    </div>
</div>
</template>

<script>
import {RotateSquare2} from 'vue-loading-spinner'
export default {
    name: "analysis",
    components:{
        RotateSquare2,
    }

}
</script>

<style lang="less">
.analysis {
   position: relative;
   width: 100%;
   height: 100%;
   text-align: center;
}
.graph{
    position: relative;
    width: 120px;
    height: 120px;
    margin-left: 50%;
    left: -60px;
    margin-top: 200px;
    text-align: center;
}
.text{
    font-size: 20px;
    margin: 40px 0;
    font-weight: bold;
}
</style>
