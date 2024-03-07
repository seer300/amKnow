<template>
    <div>
        <div style="margin-top: 10px;">
            <el-button type="primary" plain @click="showCollectTable">{{ collectText }}</el-button>
        </div>
        <el-divider></el-divider>
        <!-- 全部案例表格 -->
        <div v-show="!isShowCollectTable">
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
                        <el-input v-model="dataFilter.keyword" placeholder="故障件"></el-input>
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
        <!-- 个人收藏案例表格 -->
        <div v-show="isShowCollectTable">
            <!-- 操作框 -->
            <el-col :span="24" class="toolbar">
                <el-button type="primary">按条件查询</el-button>
                <el-button type="danger">移除案例</el-button>
            </el-col>

            <el-table :data="tableData" :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                highlight-current-row height="500" style="border:1px solid #dfe6ec;">
                <!-- 多选头 -->
                <el-table-column type="selection" width="55"></el-table-column>

                <el-table-column type="index" label="ID" align="center"></el-table-column>
                <el-table-column prop="series" label="车系" align="center"></el-table-column>
                <el-table-column prop="model" label="车型" align="center"></el-table-column>
                <el-table-column prop="faultySystem" label="故障系统" align="center"></el-table-column>
                <el-table-column prop="faultyDesc" label="故障描述" align="center"></el-table-column>
                <el-table-column
                    prop="tag"
                    label="标签"
                    width="100"
                    :filters="[{ text: '发动机', value: '发动机' }, { text: '轮胎', value: '轮胎' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">

                    <template slot-scope="scope">
                        <el-tag :type="scope.row.tag === '发动机' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="showDetails(scope.row)">查看详情</el-link>
                        <el-link type="primary" @click="">标签管理</el-link>
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
                    faultyDesc: "发动机积碳严重",
                    tag: "发动机"
                },
                {
                    id: "02",
                    series: "大众",
                    model: "捷达",
                    faultySystem: "发动机",
                    faultyDesc: "发动机积碳严重",
                    tag: "发动机"
                },
                {
                    id: "03",
                    series: "大众",
                    model: "捷达",
                    faultySystem: "轮胎",
                    faultyDesc: "轮胎破损",
                    tag: "轮胎"
                },
                {
                    id: "04",
                    series: "大众",
                    model: "捷达",
                    faultySystem: "发动机",
                    faultyDesc: "发动机积碳严重",
                    tag: "发动机"
                },
                {
                    id: "05",
                    series: "大众",
                    model: "捷达",
                    faultySystem: "轮胎",
                    faultyDesc: "轮胎破损",
                    tag: "轮胎"
                }
            ],
            // 用户点击个人收藏案例时，动态控制表格渲染情况
            isShowCollectTable: false,
            collectText: "查看个人收藏案例",
            // 收藏案例数据
            collectTableData: [],
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
        closeCaseDialog(){
            this.dialogShow = false;
        },
        // 点击收藏案例按钮
        showCollectTable(){
            this.isShowCollectTable = !this.isShowCollectTable;
            this.collectText = this.isShowCollectTable ? "查看全部案例" : "查看个人收藏案例";
            
        },

        // 表格用函数
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        }
    }
}

</script>

<style scoped></style>
