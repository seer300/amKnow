<!-- 故障类型选择弹窗 -->
<template>
    <el-dialog 
        title="信息补充"
        :visible="dialogShow"
        @close="closeWin"
    >
        <span v-for="item in faultPhenomenon1" style="margin: 10px;">
            <el-checkbox v-model="item.isSelect" :label="item.faultText" border size="medium"></el-checkbox>
        </span>
        <el-divider></el-divider>
        <div>
            <el-input
                type="textarea"
                autosize
                placeholder="其他现象，请简洁描述"
                v-model="orderDesc">
            </el-input>
        </div>
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
        // 传入参数，可能存在的故障现象
        faultPhenomenon: Array
    },
    data() {
        return {
            // 拷贝一份来自父组件的数据，本地更新后再赋值给父组件
            faultPhenomenon1: this.faultPhenomenon,
            // 用户输入的其他现象描述
            orderDesc: null
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
