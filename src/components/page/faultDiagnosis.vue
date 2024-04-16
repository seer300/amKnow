<!-- 故障诊断页面 -->
<template>
    <div>
        <el-row class="row-class">
            <el-col :span="18">
                <el-row class="row-class">
                    <!-- <el-col :span="6">
                        <el-input v-model="fKGFlag_val" placeholder="请输入标签" style="width: 80%;"></el-input>
                    </el-col> -->
                    <el-col :span="6">
                        <el-select v-model="carModel_val" filterable placeholder="请选择车型">
                            <el-option
                            v-for="(value,index) in carModels"
                            :key="index"
                            :label="value"
                            :value="value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="carSeries_val" filterable placeholder="请选择车系">
                            <el-option
                            v-for="(value,index) in carSeries"
                            :key="index"
                            :label="value"
                            :value="value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="selfaultKMs" filterable placeholder="请选择行驶里程范围">
                            <el-option
                            v-for="item in faultKMs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>

                <!-- 案例输入框 -->
                <el-input type="textarea" :rows="8" placeholder="请描述你遇到的问题" v-model="textarea"></el-input>
                <el-button type="primary" @click="submitDescribe">开始分析</el-button>

                <!-- 显示控制盒子 -->
                <div v-show="resultdiv">
                    <!-- 分析结果内容框 -->
                    <el-row class="row-class">
                        <el-col :span="24" class="centered-content">
                            <div style="margin-right: 15px;">
                                诊断结果为: 
                                {{ resultDescription }}
                            </div>
                            <!-- 评价反馈 -->
                            <el-popover
                                placement="right"
                                width="200"
                                trigger="click"
                            >
                                <div>
                                    <p style="text-align: center;">本次故障诊断结果如何?</p>
                                    <div style="text-align: center; margin: 0">
                                        <el-rate v-model="modelResults" @change="evaluateModelResults"></el-rate>
                                    </div>
                                </div>
                                <el-button slot="reference">结果反馈</el-button>
                            </el-popover>
                        </el-col>
                    </el-row>
                    <!-- 相似案例表格 -->
                    <el-row class="row-class">
                        <h3>相似案例：</h3>
                        <el-table :data="caseDatas" style="width: 100%" height="400">
                            <el-table-column prop="F_PKId" label="案例ID" width="180"></el-table-column>
                            <el-table-column prop="bfb" label="相似度"></el-table-column>
                            <el-table-column prop="F_FaultReason" label="故障原因"></el-table-column>
                            <el-table-column fixed="right" label="操作" width="200">
                                <template slot-scope="scope">
                                    <el-button @click="showDetails(scope.row)" type="text">查看案例</el-button>
                                    <el-button @click="addCollectCase(scope.row)" type="text">收藏案例</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </div>
            </el-col>
            <!-- 热点表格 -->
            <el-col :span="6">
                <p>热点案例推荐</p>
                <el-table :data="tableData" :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                highlight-current-row height="750" style="border:1px solid #dfe6ec;">
                    <el-table-column type="index" label="ID" align="center"></el-table-column>
                    <el-table-column prop="F_FaultDesc" label="故障描述" align="center"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="showDetails(scope.row)">查看详情</el-link>
                            <el-link type="primary" @click="addCollectCase(scope.row)" style="margin-left: 8px;">收藏</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>            

        </el-row>
        <!-- 弹窗盒子 -->
        <faultDialog v-bind:dialogShow="dialogShow" v-bind:faultPhenomenon="faultPhenomenon"></faultDialog>
        <CaseDialog :isShow="caseDialogShow" :caseDetails="caseDetails" v-model="caseDetailsC_Review"></CaseDialog>
    </div>
</template>

<script>
import faultDialog from "@/components/common/faultDialog";
import CaseDialog from "@/components/common/CaseDialog";
// 引入 Axios
import axios from 'axios';
import { number } from "echarts/lib/export";

export default {
    // 当前页面组件用到的子组件
    components: {
        faultDialog,
        CaseDialog
    },
    data() {
        return {
            // 用户输入描述
            textarea: null,
            // 分析结果
            resultDescription: "null",
            // 结果区域显示控制
            resultdiv: true,
            // 相似案例数据,服务器返回
            caseDatas: [],
            //最大最小里程
            faultKMs: [
                {
                    value: 0,
                    label: '0~5000公里'
                },
                {
                    value: 1,
                    label: '5000~1万公里'
                },
                {
                    value: 2,
                    label: '1万~2万公里'
                },
                {
                    value: 3,
                    label: '2万~5万公里'
                },
                {
                    value: 4,
                    label: '5万~10万公里'
                },
                {
                    value: 5,
                    label: '10万公里以上'
                },
            ],
            selfaultKMs: null,
            carSeries_val: null,
            carSeries: [],
            carModels: [],
            carModel_val: null,
            fKGFlag_val: null,

            // 故障选择弹窗是否展示
            dialogShow: false,
            // 案例详情弹窗是否展示
            caseDialogShow: false,
            // 用户点击查看详情时，选择的案例数据
            caseDetails: {},
            caseDetailsC_Review: null,
            // 可能存在的一并故障现象
            faultPhenomenon: [],
            tableData: [],
            modelResults: null,
        }
    },
    mounted() {
        // 获取热点案例
        axios.get('http://8.137.80.44:8081/api/fault/hot').then(response => {
            // 获取案例数据，重新赋值数组
            this.tableData = response.data;
        }).catch(error => {
            // 请求失败，打印错误信息
            console.error('请求失败:', error);
        });
        // 获取车型选项数据
        axios.get('http://8.137.80.44:8081/api/ClainMain/getCarModel').then(response => {
            let datas = [];
            for (const iterator of response.data) {
                datas.push(iterator.F_ProModel);
            }
            this.carModels = datas;
        }).catch(error => {
            // 请求失败，打印错误信息
            console.error('请求失败:', error);
        });
        // 获取车系选项数据
        axios.get('http://8.137.80.44:8081/api/ClainMain/getCarSeries').then(response => {
            let datas = [];
            for (const iterator of response.data) {
                datas.push(iterator.F_ProSerie);
            }
            this.carSeries = datas;
        }).catch(error => {
            // 请求失败，打印错误信息
            console.error('请求失败:', error);
        });
    },
    // 业务函数集
    methods:{
        submitDescribe() {
            this.modelResults = null;
            // 判断是否填写了故障描述
            if (this.textarea == null || this.textarea == "") {
                alert("请输入故障现象描述!");
                return;
            }
            // 请求模型，判断故障系统
            axios.post('http://localhost:10713/news/predict_label',{
                content: this.textarea
            }).then(response => {
                console.log(response.data);
                // 显示故障系统
                this.resultDescription = response.data.label;

                // 查找相似案例
                const formData = new FormData();
                if (this.carModel_val != null) {
                    formData.append('FProModel', this.carModel_val);
                }
                if (this.carSeries_val != null) {
                    formData.append('FProSerie', this.carSeries_val);
                }
                if (this.selfaultKMs != null) {
                    // 用户选择了里程
                    switch (this.selfaultKMs) {
                        case 0:
                            formData.append('min', 0);
                            formData.append('max', 5000);
                            break;
                        case 1:
                            formData.append('min', 5000);
                            formData.append('max', 10000);
                            break;
                        case 2:
                            formData.append('min', 10000);
                            formData.append('max', 20000);
                            break;
                        case 3:
                            formData.append('min', 20000);
                            formData.append('max', 50000);
                            break;
                        case 4:
                            formData.append('min', 50000);
                            formData.append('max', 100000);
                            break;
                        case 5:
                            formData.append('min', 100000);
                            formData.append('max', 1000000);
                            break;
                        default:
                            break;
                    }
                }
                // 故障系统类型
                formData.append('FKGFlag', this.fKGFlag_val);

            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });

            

            // 请求服务器，获取相似案例
            axios.post('http://8.137.80.44:8081/api/ClainMain/getData', formData).then(response => {
                console.log(response.data);

                this.caseDatas = response.data;
                // this.dialogShow = true;
                this.resultdiv = true;
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });

        },
        // 用户取消选择故障现象
        closeDialog(){
            this.dialogShow = false;
            this.faultPhenomenon = [];
        },
        // 用户点击查看案例的调用函数
        showDetails(rowdata){
            console.log("选择的数据",rowdata);
            // 修改用户指定的数据
            this.caseDetails = rowdata;
            // 请求获取评分数据
            axios.get('http://8.137.80.44:8081/api/grade/get',{
                params: {
                    fPkId: rowdata.F_PKId
                }
            }).then(response => {
                console.log("评分数据获取::",response.data);
                console.log("response.data.C_Review:", response.data.C_Review);
                // 评分数据加入
                this.caseDetailsC_Review = Number(response.data.C_Review);
                // 展示弹窗
                this.caseDialogShow = true;
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });

        },
        // 用户关闭查看案例弹窗
        closeCaseDialog(){
            this.caseDialogShow = false;
            // 修改用户指定的数据
            this.caseDetails = {};
        },
        // 用户修改评分 可能是修改或添加
        updateRate(rate){
            axios.get('http://8.137.80.44:8081/api/grade/update',{
                params: {
                    fPkId: this.caseDetails.F_PKId,
                    rate: String(rate)
                }
            }).then(response => {
                this.$message({
                    message: '评分数据已成功更新',
                    type: 'success'
                });
                this.caseDetailsC_Review = Number(rate);
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });
        },
        // 用户添加收藏案例
        addCollectCase(rowdata){
            console.log("选择的收藏案例信息：", rowdata);

            axios.get('http://8.137.80.44:8081/api/fault/addstarlist',{
                params: {
                    F_PKId: rowdata.F_PKId,
                }
            }).then(response => {
                console.log("添加案例成功：",response);

                if (response.data == 1) {
                    alert("收藏成功！");
                    this.refreshStarCase();
                }else if (response.data == -1) {
                    alert("此案例已经收藏了！");
                }

            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });
        },
        // 用户评价诊断结果
        evaluateModelResults(rate1){
            this.$message({
                showClose: true,
                type: 'success',
                message: '感谢你的反馈!'
            });
        },
    }
}
</script>

<style scoped>
.row-class {
    margin: 10px;
}
.resultdiv{
    height: 200px;
}

.centered-content {
  display: flex;
  align-items: center; /* 垂直居中 */
}
</style>
