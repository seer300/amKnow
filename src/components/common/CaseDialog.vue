<template>
    <el-dialog 
        title="故障案例"
        :visible="isShow"
        @close="closeWin"
    >
        <!-- 车辆基本信息 -->
        <el-descriptions title="车辆基本信息">
            <el-descriptions-item label="案例ID">{{ caseDetails.id }}</el-descriptions-item>
            <el-descriptions-item label="所属品牌">{{ caseDetails.series }}</el-descriptions-item>
            <el-descriptions-item label="产品型号">{{ caseDetails.model }}</el-descriptions-item>
        </el-descriptions>
        <!-- 重大信息 -->
        <el-descriptions title="重大信息" :column="2">
            <el-descriptions-item label="重大报告编号">18100000000</el-descriptions-item>
            <el-descriptions-item label="车架号">WBA3B5C54KF901234</el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="1">
            <el-descriptions-item label="故障描述">仪表盘上的发动机故障指示灯突然亮起，并且车辆动力下降，加速性能减弱。同时，驾驶员反映在行驶中车辆有轻微抖动现象，特别是在怠速时更为明显。</el-descriptions-item>
            <el-descriptions-item label="故障原因">经过专业的汽车诊断设备读取故障码后，发现存在“P0300”故障码，该故障码代表了多缸失火（Random/Multiple Cylinder Misfire Detected）。进一步检查发现，气缸内的火花塞磨损严重，点火间隙过大，导致点火效率降低，无法正常点燃混合气，从而引发多个气缸工作不正常，造成发动机运行不稳定和动力下降。此外，对燃油系统进行检查后发现燃油压力调节器出现故障，造成燃油供应不足，也是导致发动机失火的一个重要原因。</el-descriptions-item>
            <el-descriptions-item label="解决方案">技术人员更换了所有磨损严重的火花塞，并将点火间隙调整至厂商推荐值，确保各缸能够正常点火。其次，更换了故障的燃油压力调节器，确保燃油供给系统恢复到正常工作状态。</el-descriptions-item>
        </el-descriptions>
        <el-divider>案例评分</el-divider>
        <el-rate v-model="v1" style="width: 125px;margin: 0 auto;"></el-rate>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="closeWin">关闭</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        // 传入参数，是否显示
        isShow: Boolean,
        // 传入参数，显示的案例信息
        caseDetails: Object
    },
    data() {
        console.log("dialog:",this);

        return {
            // 案例评分

        };
    },
    methods: {
        // 用户关闭窗口
        closeWin(){
            // 调用父级组件关闭方法
            this.$parent.closeCaseDialog();
        }
    }
};
</script>

<style scoped>
    .texttitle{
        color: black;
    }
    .textbody{
        color: black;
        margin-top: 5px;
    }

</style>