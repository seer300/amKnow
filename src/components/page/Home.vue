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
        <!-- 故障年份选择器 -->
        <!-- <el-row>
            <el-col :span="12">
                <div style="font-size: large;font-weight: bold;color: black;">每月故障走势图</div>
            </el-col>
            <el-col :span="12">
                <el-select v-model="selectYear" placeholder="请选择年份" style="float: right;">
                    <el-option
                        v-for="(item, index) in years"
                        :key="index"
                        :value="item">
                    </el-option>
                </el-select>
            </el-col>
        </el-row> -->
        <!-- 故障数量走势图 -->
        <el-row>
            <el-col :span="24">
                <div class="trendChart" id="chartBar"></div>
            </el-col>
        </el-row>
        <!-- 热点故障表格 -->
        <!-- <el-row>
            <p style="font-size: large;font-weight: bold;color: black;">热点解决方案</p>
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
                            <el-link type="primary" @click="collectionCase(scope.row)" style="margin-left: 8px;">收藏</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row> -->
        <!-- 故障条形图 饼图 -->
        <el-row style="margin-top: 10px;">
            <el-col :span="12">
                <div class="barChart" id="bar-Chart"></div>
            </el-col>
            <el-col :span="12">
                <div class="barChart" id="pie-Chart"></div>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-col :span="12">
                <el-row>
                    <el-col :span="12">
                        <div style="font-size: large;font-weight: bold;color: black;">故障-时间</div>
                    </el-col>
                    <el-col :span="12">
                        <el-select v-model="selectYear" placeholder="请选择年份" style="float: right;">
                            <el-option
                                v-for="(item, index) in years"
                                :key="index"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <div class="barChart" id="bar-Chart-2"></div>
            </el-col>
            <el-col :span="12">
                <div class="barChart" id="bar-Chart-3"></div>
            </el-col>
        </el-row>
        <!-- 弹窗标签 -->
        <!-- <CaseDialog :isShow="dialogShow" :caseDetails="caseDetails"></CaseDialog> -->
    </div>
</template>

<script>
import echarts from "echarts";
import CaseDialog from "@/components/common/CaseDialog";
// 引入 Axios
import axios from 'axios';

export default {
    // 当前页面组件用到的子组件
    components: {
        CaseDialog
    },
    data() {
        return {
            // 表格数据数组
            tableData: [],
            // 弹窗是否展示
            dialogShow: false,
            // 用户点击查看详情时，选择的案例数据
            caseDetails: {},
            // 年份选择数组
            years: [ 2024,2023,2022 ],
            // 用户选择的年份
            selectYear: null,
        }
    },
    // 组件挂载生命周期函数
    mounted: function () {
        // 开始绘制图表
        this.drawCharts();
        this.drawBarChart();
        this.drawBarChart23();
    },
    methods: {
        drawCharts(){
            // 请求服务器
            axios.get('http://8.137.80.44:8081/api/chart/faultType').then(response => {
                let datas = [];

                for (const iterator of response.data) {
                    datas.push({
                        value: iterator.faultType_count,
                        name: iterator.F_Category_name
                    });
                }

                let o1 = {
                    title: {
                        text: "故障类型与频率",
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right'
                    },
                    series: [
                        {
                            name: "维修次数",
                            type: "pie",
                            radius: "55%",
                            center: ["50%", "60%"],
                            data: datas,
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
                this.o1chart = echarts.init(document.getElementById("bar-Chart"));
                this.o1chart.setOption(o1);
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });

            // 故障件热点分析 饼图绘制
            // 请求服务器
            axios.get('http://8.137.80.44:8081/api/chart/faultComponent').then(response => {
                let datas = [];

                for (const iterator of response.data) {
                    datas.push({
                        value: iterator.C,
                        name: iterator.F_PART
                    });
                }

                let o2 = {
                    // 图表标题配置
                    title:{
                        // 主标题文本，支持使用 \n 换行
                        text: "故障件与更换"
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right'
                    },
                    series: [
                        {
                            // name: 'Access From',
                            type: 'pie',
                            radius: '50%',
                            data: datas,
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
                
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });
        },
        drawBarChart() {
            // 请求服务器
            axios.get('http://8.137.80.44:8081/api/chart/carmodel').then(response => {
                console.log("车型故障数据：", response.data);
                let carModels = [];
                let carModelCases = [];

                for (const iterator of response.data) {
                    carModels.push(iterator.F_ProModel);
                    carModelCases.push(iterator.fault_count);
                }

                console.log(carModels);
                console.log(carModelCases);

                let option = {
                    title: { text: "车型与故障率" },
                    tooltip: {},
                    xAxis: {
                        axisLabel: {
                            interval: 0
                        },
                        data: carModels
                    },
                    yAxis: {},
                    series: [
                        {
                            name: "维修次数",
                            type: "bar",
                            data: carModelCases
                        }
                    ]
                };
                this.chartColumn = echarts.init(document.getElementById("chartBar"));
                this.chartColumn.setOption(option);
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });
        },
        drawBarChart23(){
            // 故障-车型分布 条形图绘制
            var c2 = {
                // title: {
                //     text: "故障-时间"
                // },
                tooltip: {
                    trigger: "axis"
                },
                // legend: {
                //     data: ["轿车"]
                // },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        name: "轿车",
                        type: "line",
                        stack: "故障数量",
                        data: [100, 150, 80, 120, 180, 200, 140,160,110,90,130,170]
                    },
                ]
            };
            this.c2chart = echarts.init(document.getElementById("bar-Chart-2"));
            this.c2chart.setOption(c2);

            // 请求服务器
            axios.get('http://8.137.80.44:8081/api/chart/area').then(response => {
                let areas = [];
                let areaCases = [];

                for (const iterator of response.data) {
                    areas.push(iterator.F_FaultAdd);
                    areaCases.push(iterator.fault_count);
                }
                // 故障-车型分布 条形图绘制
                var c3 = {
                    // 图表标题配置
                    title:{
                        // 主标题文本，支持使用 \n 换行
                        text: "故障-地区"
                    },
                    xAxis: {
                        type: 'category',
                        data: areas
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: areaCases,
                            type: 'bar'
                        }
                    ]
                };
                this.c3chart = echarts.init(document.getElementById("bar-Chart-3"));
                this.c3chart.setOption(c3);
                
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });
        },
        showDetails(rowdata){
            // 展示弹窗
            this.dialogShow = true;
            // 修改用户指定的数据
            this.caseDetails = rowdata;
        },
        // 用户关闭查看案例弹窗
        closeCaseDialog(){
            this.dialogShow = false;
        },
        // 用户收藏案例
        collectionCase(rowdata){
            alert("收藏成功！");
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
