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
                    <el-table-column prop="name" label="案例名称" width="180"></el-table-column>
                    <el-table-column prop="date" label="日期"></el-table-column>
                    <el-table-column prop="desc" label="故障描述"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看案例</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </div>
    </div>
</template>

<script>
import faultDialog from "@/components/common/faultDialog";

export default {


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
                    name: "案例1",
                    date: "2024-01-01",
                    desc: "发动机故障，冷却油缺少"
                },
                {
                    name: "案例2",
                    date: "2024-01-02",
                    desc: "刹车故障，刹车盘磨损严重"
                },
                {
                    name: "案例3",
                    date: "2024-01-03",
                    desc: "空调异味，空调滤芯污染"
                },
                {
                    name: "案例4",
                    date: "2024-01-01",
                    desc: "发动机故障，冷却油缺少"
                },
                {
                    name: "案例5",
                    date: "2024-01-02",
                    desc: "刹车故障，刹车盘磨损严重"
                },
                {
                    name: "案例6",
                    date: "2024-01-03",
                    desc: "空调异味，空调滤芯污染"
                },
                {
                    name: "案例1",
                    date: "2024-01-01",
                    desc: "发动机故障，冷却油缺少"
                },
                {
                    name: "案例2",
                    date: "2024-01-02",
                    desc: "刹车故障，刹车盘磨损严重"
                },
                {
                    name: "案例3",
                    date: "2024-01-03",
                    desc: "空调异味，空调滤芯污染"
                }
            ]
        }
    },
    // 业务函数集
    methods:{
        submitDescribe() {
            // 获取到用户输入的描述
            console.log(this.textarea);

            // 请求服务器，发送描述
 

            // 修改resultDescription,显示结果描述

            this.resultdiv = true;
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
