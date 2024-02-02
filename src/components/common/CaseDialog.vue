<template>
    <el-dialog 
        title="案例信息"
        :visible="isShow"
        @close="closeWin"
    >
        <!-- 车辆基本信息 -->
        <div>
            <el-descriptions title="车辆基本信息">
                <el-descriptions-item label="案例ID">{{ caseDetails.id }}</el-descriptions-item>
                <el-descriptions-item label="车系">{{ caseDetails.series }}</el-descriptions-item>
                <el-descriptions-item label="车型">{{ caseDetails.model }}</el-descriptions-item>
            </el-descriptions>
        </div>
        <!-- 重大信息 -->
        <div>
            <h3 class="texttitle">重大信息</h3>
            <div class="textbody">故障描述：{{ null }}</div>
            <div class="textbody">故障原因：{{ null }}</div>
            <div class="textbody">处理意见：{{ null }}</div>
        </div>
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
        };
    },
    methods: {
        // 用户关闭窗口
        closeWin(){
            // 调用父级组件关闭方法
            this.$parent.closeDialog();
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