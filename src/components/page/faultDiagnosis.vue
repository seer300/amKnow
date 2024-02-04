<!-- 故障诊断页面 -->
<template>
    <div>
        <el-row class="row-class">
            <el-col :span="24">
                <!-- 案例输入框 -->
                <el-input type="textarea" :rows="8" placeholder="请描述你遇到的问题" v-model="textarea"></el-input>
            </el-col>
        </el-row>
        <!-- 提交按钮 -->
        <el-row class="row-class">
            <el-button type="primary" @click="submitDescribe">开始分析</el-button>
        </el-row>
        <!-- 显示控制盒子 -->
        <div v-show="resultdiv">
            <!-- 分析结果内容框 -->
            <el-row class="row-class">
                <h3>分析结果：</h3>
                <div>{{ resultDescription }}</div>
            </el-row>
            <!-- 相似案例表格 -->
            <el-row class="row-class">
                <h3>相似案例：</h3>
                <el-table :data="caseDatas" style="width: 100%" height="300">
                    <el-table-column prop="id" label="案例名称" width="180"></el-table-column>
                    <el-table-column prop="date" label="日期"></el-table-column>
                    <el-table-column prop="desc" label="故障描述"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="showDetails(scope.row)" type="text">查看案例</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </div>
        <!-- 弹窗盒子 -->
        <faultDialog v-bind:dialogShow="dialogShow" v-bind:faultPhenomenon="faultPhenomenon"></faultDialog>
        <CaseDialog :isShow="caseDialogShow" :caseDetails="caseDetails"></CaseDialog>
    </div>
</template>

<script>
import faultDialog from "@/components/common/faultDialog";
import CaseDialog from "@/components/common/CaseDialog";

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
            resultDescription: "发动机故障，冷却油缺少",
            // 结果区域显示控制
            resultdiv: false,
            // 相似案例数据,服务器返回
            caseDatas: [
                {
                    id: "案例1",
                    series: "大众",
                    model: "宝来",
                    date: "2024-01-01",
                    desc: "发动机故障，冷却油缺少"
                },
                {
                    id: "案例2",
                    series: "大众",
                    model: "宝来",
                    date: "2024-01-02",
                    desc: "刹车故障，刹车盘磨损严重"
                },
                {
                    id: "案例3",
                    series: "大众",
                    model: "宝来",
                    date: "2024-01-03",
                    desc: "空调异味，空调滤芯污染"
                }
            ],
            // 故障选择弹窗是否展示
            dialogShow: false,
            // 案例详情弹窗是否展示
            caseDialogShow: false,
            // 用户点击查看详情时，选择的案例数据
            caseDetails: {},
            // 可能存在的一并故障现象
            faultPhenomenon: []
        }
    },
    // 业务函数集
    methods:{
        submitDescribe() {
            // 获取到用户输入的描述
            console.log(this.textarea);

            // 请求服务器，发送描述

            // 获取可能存在的一并故障现象，并弹窗让用户选择
            this.faultPhenomenon.push({
                faultText: "发动机异响",
                isSelect: false
            });
            this.faultPhenomenon.push({
                faultText: "机油灯警告",
                isSelect: false
            });
            this.faultPhenomenon.push({
                faultText: "车身异响",
                isSelect: false
            });
            this.faultPhenomenon.push({
                faultText: "漏油",
                isSelect: false
            });
            this.faultPhenomenon.push({
                faultText: "无法启动",
                isSelect: false
            });
            this.faultPhenomenon.push({
                faultText: "水箱温度过高",
                isSelect: false
            });

            console.log(this.faultPhenomenon);

            this.dialogShow = true;
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
            // 展示弹窗
            this.caseDialogShow = true;
            // 修改用户指定的数据
            this.caseDetails = rowdata;

        },
        // 用户关闭查看案例弹窗
        closeCaseDialog(){
            this.caseDialogShow = false;
            // 修改用户指定的数据
            this.caseDetails = {};
        }
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
