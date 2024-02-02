<!-- 故障类型选择弹窗 -->
<template>
    <el-dialog 
        title="信息补充"
        :visible="isShow"
        @close="closeWin"
    >

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="closeWin">确认</el-button>
            <el-button type="primary" @click="closeWin">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>

</script>

<style scoped>

</style>
