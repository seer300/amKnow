<template>
    <div class="chart-container">
        <el-row>
            <el-col :span="24">
                <div id="chartBar" class="chart-style"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div id="chartPie" class="chart-style"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" class="chart-style"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div id="chart-Pie-rose" class="chart-style" style="height: 600px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chart-Pie-2" class="chart-style" style="height: 600px;"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
    name: "Dashboard",
    data() {
        return {
            chartBar: null,
            chartPie: null,
            chartPieRose: null,
            chartPie2: null
        };
    },

    methods: {
        drawBarChart() {
            var option = {
                title: { text: "车系-维修次数" },
                tooltip: {},
                xAxis: {
                    axisLabel: {
                        interval: 0
                    },
                    data: [
                        "朗逸",
                        "卡罗拉",
                        "捷达",
                        "速腾",
                        "汉兰达",
                        "本田CR-V",
                        "揽胜",
                        "奔驰GLC",
                        "RAV4荣放",
                        "奥德赛",
                        "保时捷911",
                        "日产GT-R",
                        "索罗德",
                        "五菱宏光",
                        "柯斯达"
                    ]
                },
                yAxis: {},
                series: [
                    {
                        name: "维修次数",
                        type: "bar",
                        data: [13, 16, 24, 21, 8, 13, 3, 6, 9, 9, 2, 4, 5, 18, 3]
                    }
                ]
            };
            this.chartColumn = echarts.init(document.getElementById("chartBar"));
            this.chartColumn.setOption(option);
        },
        drawPieChart() {
            var option = {
                title: {
                    text: "车型-维修次数",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: [
                        "朗逸",
                        "卡罗拉",
                        "捷达",
                        "速腾",
                        "汉兰达",
                        "揽胜",
                        "奔驰GLC",
                        "五菱宏光"
                    ]
                },
                series: [
                    {
                        name: "维修次数",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            { value: 5, name: "朗逸" },
                            { value: 4, name: "卡罗拉" },
                            { value: 10, name: "捷达" },
                            { value: 8, name: "速腾" },
                            { value: 6, name: "汉兰达" },
                            { value: 3, name: "揽胜" },
                            { value: 2, name: "奔驰GLC" },
                            { value: 20, name: "五菱宏光" }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            };
            this.chartPie = echarts.init(document.getElementById("chartPie"));
            this.chartPie.setOption(option);
        },
        drawLineChart() {
            var option = {
                title: {
                    text: "行驶里程-维修次数"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: ["轿车", "SUV", "MPV"]
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["1万公里", "3万公里", "5万公里", "8万公里", "10万公里", "15万公里", "20万公里"]
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "MPV",
                        type: "line",
                        stack: "平均故障次数",
                        data: [1, 3, 5, 6, 10, 13, 18]
                    },
                    {
                        name: "SUV",
                        type: "line",
                        stack: "平均故障次数",
                        data: [0.8, 2.56, 3.45, 5.5, 6.7, 9.5, 12.6]
                    },
                    {
                        name: "轿车",
                        type: "line",
                        stack: "平均故障次数",
                        data: [0.3, 1.32, 3.35, 5.36, 8.4, 15.44, 18.46]
                    }
                ]
            };
            this.chartLine = echarts.init(document.getElementById("chartLine"));
            this.chartLine.setOption(option);
        },
        drawPieRoseChart(){
            var option = {
                    title: { text: "故障件占比" },
                    legend: {
                        top: 'bottom'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    series: [
                        {
                        name: 'Nightingale Chart',
                        type: 'pie',
                        radius: [50, 250],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: [
                            { value: 40, name: '发动机控制单元' },
                            { value: 38, name: '节气门位置传感器' },
                            { value: 32, name: '燃油泵' },
                            { value: 30, name: '制动盘' },
                            { value: 28, name: '点火线圈' },
                            { value: 26, name: '轮胎' },
                            { value: 22, name: '空气悬架' },
                            { value: 18, name: '电池' }
                        ]
                        }
                    ]
                };
            this.chartPieRose = echarts.init(document.getElementById("chart-Pie-rose"));
            this.chartPieRose.setOption(option);
        },
        drawPie2Chart(){
            var option = {
                title: {
                    text: "故障件-里程占比分布",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: [
                        "5000公里以下",
                        "5000~10000公里",
                        "10000~15000公里",
                        "15000~20000公里",
                        "25000~30000公里",
                        "30000公里以上",
                    ]
                },
                series: [
                    {
                        name: "维修次数",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            { value: 15, name: "5000公里以下" },
                            { value: 20, name: "5000~10000公里" },
                            { value: 30, name: "15000~20000公里" },
                            { value: 40, name: "25000~30000公里" },
                            { value: 60, name: "30000公里以上" },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            };
            this.chartPie2 = echarts.init(document.getElementById("chart-Pie-2"));
            this.chartPie2.setOption(option);
        },
        drawCharts() {
            this.drawBarChart();
            this.drawPieChart();
            this.drawLineChart();
            this.drawPieRoseChart();
            this.drawPie2Chart();
        }
    },
    mounted: function () {
        this.drawCharts();
    }
};
</script>
<style scoped>

.el-col {
    padding: 30px 20px;
}

.chart-style {
    width: 100%;
    height: 400px;
}
</style>
