<template>
    <div>
        <el-row :gutter="10" style="height: 130px;margin-top: 5px;">
            <el-col :span="4">
                <div class="datadiv">
                    <div>86</div>
                    <div>当日故障数</div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="datadiv">
                    <div>34</div>
                    <div>三个月重大故障数</div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="datadiv">
                    <div>10%</div>
                    <div>重大故障率</div>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="datadiv">
                    <div>10%</div>
                    <div>车型保有量</div>
                </div>
            </el-col>
            <el-col :span="4"><div class="datadiv">
                <div>5</div>
                <div>平均故障车龄</div>
            </div></el-col>
            <el-col :span="4"><div class="datadiv">
                <div>779</div>
                <div>平均故障里程数</div>
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
                <div class="">

                    <el-table :data="tableData" :border="true" style="width: 100%">
                        <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="地址">
                        </el-table-column>
                    </el-table>
                </div>
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
    </div>
</template>

<script>
import echarts from "echarts";

export default {
    data() {
        return {
            tableData: [],

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
            var o1 = option = {
                // 图表标题配置
                title:{
                    // 主标题文本，支持使用 \n 换行
                    text: "故障-车型分布"
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
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }
                ]
            };
            this.o1chart = echarts.init(document.getElementById("bar-Chart"));
            this.o1chart.setOption(option);

            // 故障件热点分析 饼图绘制
            var o2 = option = {
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
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
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
            this.o2chart.setOption(option);
        }
    }
}
</script>

<!-- scoped代表这些CSS规则只在当前文件生效 -->
<style scoped>
    .datadiv{
        background-color: aquamarine;
        height: 100px;
        margin-top: 14px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .trendChart{
        height: 350px;
    }

    .barChart{
        height: 350px;
    }

</style>
