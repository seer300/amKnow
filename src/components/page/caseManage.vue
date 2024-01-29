<template>
    <div>
        <div>
            <el-link type="primary">个人收藏案例</el-link>
        </div>
        <hr>
        <!-- 案例表格 -->
        <div>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="carSeries" placeholder="车系">
                        <el-option v-for="item in cars" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="value" placeholder="车型">
                        <el-option v-for="item in cars" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="">查询</el-button>
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
                        <el-link type="primary">查看详情</el-link>
                        <el-link type="primary">收藏</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            // 搜索筛选条件
            formInline: {
                user: '',
                region: ''
            },
            // 车系选择数组
            cars: ['大众', '宝马', '奔驰', '比亚迪'],
            // 用户选择的车系
            carSeries: null,
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

}

</script>

<style scoped></style>
