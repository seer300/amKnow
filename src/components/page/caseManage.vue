<template>
    <div>
        <div>
            <el-link type="primary">个人收藏案例</el-link>
        </div>
        <hr>
        <!-- 案例表格 -->
        <div>
            <!-- 条件搜索框 -->
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-select v-model="dataFilter.carSeries" placeholder="车系">
                            <el-option v-for="item in cars" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="dataFilter.carType" placeholder="车型">
                            <el-option v-for="item in cars" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="dataFilter.keyword" placeholder="故障关键词"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchData">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-table :data="tableData" :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                highlight-current-row height="500" style="border:1px solid #dfe6ec;">
                <el-table-column type="index" label="ID" align="center"></el-table-column>
                <el-table-column prop="series" label="车系" align="center"></el-table-column>
                <el-table-column prop="model" label="车型" align="center"></el-table-column>
                <el-table-column prop="faultySystem" label="故障系统" align="center"></el-table-column>
                <el-table-column prop="faultyDesc" label="故障描述" align="center"></el-table-column>

                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="showDetails(scope.row)">查看详情</el-link>
                        <el-link type="primary" @click="">收藏</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 弹窗标签 -->
        <CaseDialog :isShow="dialogShow" :caseDetails="caseDetails"></CaseDialog>
    </div>
</template>

<script>
import CaseDialog from "@/components/common/CaseDialog";

export default {
    // 当前页面组件用到的子组件
    components: {
        CaseDialog
    },

    data() {
        // TODO:此处应该从后端获取数据,目前直接返回模拟数据

        return {
            // 弹窗是否展示
            dialogShow: false,
            // 用户点击查看详情时，选择的案例数据
            caseDetails: {},
            // 搜索条件
            dataFilter: {
                // 用户选择的车系
                carSeries: null,
                // 关键词
                keyword: null,
                // 选择的车型
                carType: null
            },
            // 车系选择数组
            cars: ['大众', '宝马', '奔驰', '比亚迪'],
            // 表格数据数组
            tableData: [
                {
                    id: "01",
                    series: "大众",
                    model: "捷达",
                    faultySystem: "发动机",
                    faultyDesc: "发动机积碳严重"
                },
                {
                    id: "02",
                    series: "大众",
                    model: "捷达",
                    faultySystem: "发动机",
                    faultyDesc: "发动机积碳严重"
                },
                {
                    id: "03",
                    series: "大众",
                    model: "捷达",
                    faultySystem: "发动机",
                    faultyDesc: "发动机积碳严重"
                },
                {
                    id: "04",
                    series: "大众",
                    model: "捷达",
                    faultySystem: "发动机",
                    faultyDesc: "发动机积碳严重"
                },
                {
                    id: "05",
                    series: "大众",
                    model: "捷达",
                    faultySystem: "发动机",
                    faultyDesc: "发动机积碳严重"
                }
            ]
        }
    },
    methods: {
        // 用户点击查看案例的调用函数
        showDetails(rowdata){
            // 展示弹窗
            this.dialogShow = true;
            // 修改用户指定的数据
            this.caseDetails = rowdata;

        },
        // 用户点击搜索案例时的调用函数
        searchData(){
            // 获取到用户的筛选条件

            // 请求后端条件搜索数据

        },
        // 用户关闭查看案例弹窗
        closeDialog(){
            this.dialogShow = false;
        }
    }
}

</script>

<style scoped></style>
