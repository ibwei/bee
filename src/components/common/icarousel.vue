<template>
<div class="full-loading">
    <div class="full-content">
        
    </div>
</div>
</template>

<script>
import {
    HourGlass
} from 'vue-loading-spinner'

export default {
    name: "icarousel",
    components: {
        HourGlass
    },
    props: {
        noticeText: {
            type: String,
            default: "正在分析,预计五分钟，请稍后"
        }
    },
    mounted() {
        console.log(this.noticeText)
    },
    data() {
        return {
            show: true
        }
    }

}
</script>

<style lang="less" scoped>
.full-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    min-height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
    text-align: center;
}

.myloading {
    position: relative;
    top: 200px;
    margin-top: 30%;
    
}

.full-content {
    position: relative;
    margin-left: 50%;
    top: 250px;
    left: -150px;
    height: 300px;
    width: 300px;
    text-align: center;
    background: #fff;
}

.text {
    position: absolute;
    top: 200px;
    width: 300px;
    text-align: center;
    font-size: 16px;
    padding: 0 20px;

}
</style>
