<template>
    <el-dialog 
        title="案例信息"
        :visible="isShow"
        @close="closeWin"
    >
        <el-form>
            <h1>{{ caseDetails.id }}</h1>
            <h1>{{ caseDetails.series }}</h1>
            <h1>{{ caseDetails.model }}</h1>
        </el-form>
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

<style scoped></style>