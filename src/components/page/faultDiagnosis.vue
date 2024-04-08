<!-- 故障诊断页面 -->
<template>
    <div>
        <el-row class="row-class">
            <el-col :span="18">
                <el-row class="row-class">
                    <el-col :span="6">
                        <el-input v-model="fKGFlag_val" placeholder="请输入标签" style="width: 80%;"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="carModel_val" placeholder="请输入车型" style="width: 80%;"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="carSeries_val" placeholder="请输入车系" style="width: 80%;"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="faultKM_max_val" placeholder="请输入最大里程" style="width: 80%;"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="faultKM_min_val" placeholder="请输入最小里程" style="width: 80%;margin-top: 5px;"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="fFaultDesc_val" placeholder="请输入故障关键字" style="width: 80%;margin-top: 5px;"></el-input>
                    </el-col> 
                </el-row>

                <!-- 案例输入框 -->
                <el-input type="textarea" :rows="8" placeholder="请描述你遇到的问题" v-model="textarea"></el-input>
                <el-button type="primary" @click="submitDescribe">开始分析</el-button>

                <!-- 显示控制盒子 -->
                <div v-show="resultdiv">
                    <!-- 分析结果内容框 -->
                    <el-row class="row-class">
                        <h3>诊断结果为：</h3>
                        <div>{{ resultDescription }}</div>
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
            textarea: '',
            // 分析结果
            resultDescription: "发动机系统故障",
            // 结果区域显示控制
            resultdiv: false,
            // 相似案例数据,服务器返回
            caseDatas: [],
            //最大最小里程
            faultKM_max_val: null,
            faultKM_min_val: null,
            carSeries_val: null,
            carModel_val: null,
            fFaultDesc_val: null,
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
    },
    // 业务函数集
    methods:{
        submitDescribe() {
            const formData = new FormData();
            // 填充用户输入的故障信息
            if (this.fFaultDesc_val != null) {
                formData.append('FFaultDesc', this.fFaultDesc_val);   
            }else{
                alert("故障关键字是必须填写的！");
                return;
            }
            if (this.carModel_val != null) {
                formData.append('FProModel', this.carModel_val);
            }
            if (this.carSeries_val != null) {
                formData.append('FProSerie', this.carSeries_val);
            }
            if (this.fKGFlag_val != null) {
                formData.append('FKGFlag', this.fKGFlag_val);
            }
            if (this.faultKM_min_val != null) {
                formData.append('min', this.faultKM_min_val);
            }
            if (this.faultKM_max_val != null) {
                formData.append('max', this.faultKM_max_val);
            }

            // 请求服务器，获取相似案例
            axios.post('http://127.0.0.1:8081/api/ClainMain/getData', formData).then(response => {
                console.log(response.data);

                this.caseDatas = response.data;
                this.dialogShow = true;
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });


            // 获取可能存在的一并故障现象，并弹窗让用户选择
            // this.faultPhenomenon.push({
            //     faultText: "发动机异响",
            //     isSelect: false
            // });
            // this.faultPhenomenon.push({
            //     faultText: "机油灯警告",
            //     isSelect: false
            // });
            // this.faultPhenomenon.push({
            //     faultText: "车身异响",
            //     isSelect: false
            // });
            // this.faultPhenomenon.push({
            //     faultText: "漏油",
            //     isSelect: false
            // });
            // this.faultPhenomenon.push({
            //     faultText: "无法启动",
            //     isSelect: false
            // });
            // this.faultPhenomenon.push({
            //     faultText: "水箱温度过高",
            //     isSelect: false
            // });
        },
        // 用户取消选择故障现象
        closeDialog(){
            this.dialogShow = false;
            this.faultPhenomenon = [];
        },
        // 用户选择完故障现象点击确定
        confirmDialog(){
            
            // 关闭弹窗
            this.closeDialog();
            // 修改resultDescription,显示结果描述
            this.resultdiv = true;
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
</style>
