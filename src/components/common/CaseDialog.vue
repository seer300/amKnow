<template>
    <el-dialog 
        title="故障案例"
        :visible="isShow"
        @close="closeWin"
    >
        <!-- 车辆基本信息 -->
        <el-descriptions title="车辆基本信息">
            <el-descriptions-item label="案例ID">{{ caseDetails.F_PKId }}</el-descriptions-item>
            <el-descriptions-item label="所属品牌">{{ caseDetails.series }}</el-descriptions-item>
            <el-descriptions-item label="产品型号">{{ caseDetails.model }}</el-descriptions-item>
        </el-descriptions>
        <!-- 重大信息 -->
        <el-descriptions title="重大信息" :column="2">
            <el-descriptions-item label="重大报告编号">{{ caseDetails.F_ClaimCode }}</el-descriptions-item>
            <el-descriptions-item label="车架号">{{ caseDetails.model }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="1">
            <el-descriptions-item label="故障描述">{{ caseDetails.F_FaultDesc }}</el-descriptions-item>
            <el-descriptions-item label="故障原因">{{ caseDetails.F_FaultReason }}</el-descriptions-item>
            <el-descriptions-item label="解决方案">{{ caseDetails.F_SolveFault }}</el-descriptions-item>
        </el-descriptions>
        <el-divider>案例评分</el-divider>
        <el-rate v-model="C_Review" style="width: 125px;margin: 0 auto;" @change="updateRate"></el-rate>
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
        caseDetails: Object,
        // 评分数据
        value: Number
    },
    data() {
        return {
            C_Review: this.value
        };
    },
    methods: {
        // 用户关闭窗口
        closeWin(){
            // 调用父级组件关闭方法
            this.$parent.closeCaseDialog();
        },
        // 用户修改评分 可能是修改或添加
        updateRate(rate1){
            this.$parent.updateRate(rate1);
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