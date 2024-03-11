<!-- 收藏案例标签管理弹窗 -->
<template>
    <el-dialog 
        title="案例标签管理"
        :visible="dialogShow"
        @close="closeWin"
    >


        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmWin">确认</el-button>
            <el-button type="primary" @click="closeWin">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        // 传入参数，是否显示
        dialogShow: Boolean,
    },
    data() {
        return {
            
        };
    },
    methods: {
        // 用户关闭窗口
        closeWin(){
            // 调用父级组件关闭方法
            this.$parent.closeDialog();
        },
        // 用户点击确认
        confirmWin(){
            // 将用户选择的信息传递给父组件

            // 调用父组件的确认函数
            this.$parent.confirmDialog();
        }
    }
};
</script>

<style scoped>

</style>
