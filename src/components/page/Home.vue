<template>
    <div>
        <el-row :gutter="10" style="height: 130px;margin-top: 5px;">
            <el-col :span="4">
                <div class="datadiv">
                    <div class="data-value">86</div>
                    <div class="data-illustrate">当日故障数</div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="datadiv">
                    <div class="data-value">34</div>
                    <div class="data-illustrate">三个月重大故障数</div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="datadiv">
                    <div class="data-value">10%</div>
                    <div class="data-illustrate">重大故障率</div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="datadiv">
                    <div class="data-value">1457</div>
                    <div class="data-illustrate">车型保有量</div>
                </div>
            </el-col>
            <el-col :span="4"><div class="datadiv">
                <div class="data-value">5</div>
                <div class="data-illustrate">平均故障车龄</div>
            </div></el-col>
            <el-col :span="4"><div class="datadiv">
                <div class="data-value">2567</div>
                <div class="data-illustrate">平均故障里程数</div>
            </div></el-col>
        </el-row>
        <!-- 故障数量走势图 -->
        <el-row>
            <el-col :span="24">
                <div class="trendChart" id="trend-Chart"></div>
            </el-col>
        </el-row>
        <!-- 热点故障表格 -->
        <el-row>
            <p>热点解决方案</p>
            <el-col :span="24">
                <el-table :data="tableData" :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                highlight-current-row height="220" style="border:1px solid #dfe6ec;">
                    <el-table-column type="index" label="ID" align="center"></el-table-column>
                    <el-table-column prop="series" label="车系" align="center"></el-table-column>
                    <el-table-column prop="model" label="车型" align="center"></el-table-column>
                    <el-table-column prop="faultySystem" label="故障系统" align="center"></el-table-column>
                    <el-table-column prop="faultyDesc" label="故障描述" align="center"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="showDetails(scope.row)">查看详情</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!-- 故障条形图 饼图 -->
        <el-row style="margin-top: 10px;">
            <el-col :span="12">
                <div class="barChart" id="bar-Chart"></div>
            </el-col>
            <el-col :span="12">
                <div class="barChart" id="pie-Chart"></div>
            </el-col>
        </el-row>
        <!-- 弹窗标签 -->
        <CaseDialog :isShow="dialogShow" :caseDetails="caseDetails"></CaseDialog>
    </div>
</template>

<script>
import echarts from "echarts";
import CaseDialog from "@/components/common/CaseDialog";

export default {
    // 当前页面组件用到的子组件
    components: {
        CaseDialog
    },
    data() {
        return {
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
                }
            ],
            // 弹窗是否展示
            dialogShow: false,
            // 用户点击查看详情时，选择的案例数据
            caseDetails: {},
            
        }
    },
    // 组件挂载生命周期函数
    mounted: function () {
        // 开始绘制图表
        this.drawCharts();
    },
    methods: {
        drawCharts(){
            var option = option = {
                // 图表标题配置
                title:{
                    // 主标题文本，支持使用 \n 换行
                    text: "故障走势图"
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }
                ]
            };
            this.chartColumn = echarts.init(document.getElementById("trend-Chart"));
            this.chartColumn.setOption(option);

            // 故障-车型分布 条形图绘制
            var o1 = {
                // 图表标题配置
                title:{
                    // 主标题文本，支持使用 \n 换行
                    text: "故障-车型分布"
                },
                xAxis: {
                    type: 'category',
                    data: ['大众', '日产', '本田', '宝马', '奔驰', '奥迪', '特斯拉']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }
                ]
            };
            this.o1chart = echarts.init(document.getElementById("bar-Chart"));
            this.o1chart.setOption(o1);

            // 故障件热点分析 饼图绘制
            var o2 = {
                // 图表标题配置
                title:{
                    // 主标题文本，支持使用 \n 换行
                    text: "故障件热点分析"
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    left: 'right'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '发动机' },
                            { value: 735, name: '轮胎' },
                            { value: 580, name: '变速箱' },
                            { value: 484, name: '车身蒙皮' },
                            { value: 300, name: '悬挂' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.o2chart = echarts.init(document.getElementById("pie-Chart"));
            this.o2chart.setOption(o2);
        },
        showDetails(rowdata){
            // 展示弹窗
            this.dialogShow = true;
            // 修改用户指定的数据
            this.caseDetails = rowdata;
        },
        // 用户关闭查看案例弹窗
        closeDialog(){
            this.dialogShow = false;
        }
    }
}
</script>

<!-- scoped代表这些CSS规则只在当前文件生效 -->
<style scoped>
    .datadiv{
        background-color: #f6db63;
        border-radius: 10px;
        height: 100px;
        margin-top: 14px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    /* 数据值的样式 */
    .data-value{
        color: #ea330d;
        font-size: xx-large;
    }
    .data-illustrate{
        color: #4c2826;
        font-size: medium;
    }

    .trendChart{
        height: 350px;
    }

    .barChart{
        height: 350px;
    }

</style>
