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
                        <el-select v-model="dataFilter.carSeries" placeholder="品牌">
                            <el-option v-for="item in cars" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="dataFilter.carType" placeholder="车型">
                            <el-option v-for="item in cars2" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="dataFilter.keyword" placeholder="故障件关键词"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchData">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-table :data="tableData" :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                highlight-current-row height="500" style="border:1px solid #dfe6ec;">
                <el-table-column prop="F_PKId" label="案例ID" align="center"></el-table-column>
                <el-table-column prop="F_ProModel" label="车系" align="center"></el-table-column>
                <el-table-column prop="F_ProSerie" label="车型" align="center"></el-table-column>
                <el-table-column prop="F_FaultDesc" label="故障描述" align="center"></el-table-column>

                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="showDetails(scope.row)">查看详情</el-link>
                        <el-link type="primary" @click="addCollectCase(scope.row)">收藏</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 个人收藏案例表格 -->
        <div v-show="isShowCollectTable">
            <!-- 操作框 -->
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-select v-model="dataFilter.carSeries" placeholder="品牌">
                            <el-option v-for="item in cars" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="dataFilter.carType" placeholder="车型">
                            <el-option v-for="item in cars2" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="dataFilter.keyword" placeholder="故障件关键词"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchStarData">按条件查询</el-button>
                    </el-form-item>
                    <el-button type="danger" @click="delCollectCase">移除案例</el-button>
                </el-form>
            </el-col>

            <el-table :data="collectTableData" :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                highlight-current-row height="500" style="border:1px solid #dfe6ec;"
                @select="handleSelect"
                @select-all="handleSelectAll">
                <!-- 多选头 -->
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="F_PKId" label="案例ID" align="center"></el-table-column>
                <el-table-column prop="F_ProModel" label="车系" align="center"></el-table-column>
                <el-table-column prop="F_ProSerie" label="车型" align="center"></el-table-column>
                <el-table-column prop="F_FaultDesc" label="故障描述" align="center"></el-table-column>

                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="showDetails(scope.row)">查看详情</el-link>
                        <el-link type="danger" @click="delCollectCase(scope.row)">移出收藏</el-link>
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
// 引入 Axios
import axios from 'axios';

export default {
    // 当前页面组件用到的子组件
    components: {
        CaseDialog
    },
    data() {
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
            // 品牌选择数组
            cars: ['大众', '宝马', '奔驰', '奥迪', '本田', '日产', '沃尔沃', '丰田'],
            cars2: ['卡罗拉', '凯美瑞', '科鲁兹', 'C级', '朗逸', '迈腾', '5系'],
            // 所有案例数据数组
            tableData: [],
            // 用户点击个人收藏案例时，动态控制表格渲染情况
            isShowCollectTable: false,
            collectText: "查看个人收藏案例",
            // 收藏案例数据
            collectTableData: [],
            selectedRows: [] // 用于存储选中的收藏案例数据
        }
    },
    mounted() {
        // 获取全部案例
        axios.get('http://8.137.80.44:8081/api/fault/all').then(response => {
            this.tableData = response.data;
        }).catch(error => {
            // 请求失败，打印错误信息
            console.error('请求失败:', error);
        });
        // 获取个人收藏案例
        axios.get('http://8.137.80.44:8081/api/fault/starlist').then(response => {
            this.collectTableData = response.data;
        }).catch(error => {
            // 请求失败，打印错误信息
            console.error('请求失败:', error);
        });
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
            // 判断用户是否有选条件
            if ( this.dataFilter.carSeries == null && this.dataFilter.carType == null && this.dataFilter.keyword == null ) {
                alert("请至少选择一个查询条件！");
                return;
            }
            // 请求后端条件搜索数据
            axios.get('http://8.137.80.44:8081/api/fault/findAppointFaults',{
                params: {
                    F_FaultDescKeyword: this.dataFilter.keyword,
                    F_ProSerie: this.dataFilter.carType,
                    F_ProModel: this.dataFilter.carSeries
                }
            }).then(response => {
                this.tableData = response.data;
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });

        },
        // 按条件搜索收藏案例
        searchStarData(){
            // 判断用户是否有选条件
            if ( this.dataFilter.carSeries == null && this.dataFilter.carType == null && this.dataFilter.keyword == null ) {
                alert("请至少选择一个查询条件！");
                return;
            }
            // 请求后端条件搜索数据
            axios.get('http://8.137.80.44:8081/api/fault/findAppointStarFaults',{
                params: {
                    F_FaultDescKeyword: this.dataFilter.keyword,
                    F_ProSerie: this.dataFilter.carType,
                    F_ProModel: this.dataFilter.carSeries
                }
            }).then(response => {
                this.collectTableData = response.data;
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });

        },
        // 用户关闭查看案例弹窗
        closeCaseDialog(){
            this.dialogShow = false;
        },
        // 点击查看收藏按钮
        showCollectTable(){
            this.isShowCollectTable = !this.isShowCollectTable;
            this.collectText = this.isShowCollectTable ? "查看全部案例" : "查看个人收藏案例";
            
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
                    axios.get('http://8.137.80.44:8081/api/fault/starlist').then(response => {
                        this.collectTableData = response.data;
                    }).catch(error => {
                        // 请求失败，打印错误信息
                        console.error('请求失败:', error);
                    });
                }else if (response.data == -1) {
                    alert("此案例已经收藏了！");
                }

            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });
        },
        // 用户删除收藏案例-单个
        delCollectCase(rowdata){
            axios.get('http://8.137.80.44:8081/api/fault/delstarcase',{
                params: {
                    F_PKId: rowdata.F_PKId,
                }
            }).then(response => {
                if (response.data == 1) {
                    alert("移出成功！");
                    axios.get('http://8.137.80.44:8081/api/fault/starlist').then(response => {
                        this.collectTableData = response.data;
                    }).catch(error => {
                        // 请求失败，打印错误信息
                        console.error('请求失败:', error);
                    });
                }
            }).catch(error => {
                // 请求失败，打印错误信息
                console.error('请求失败:', error);
            });
        },
        // 用户删除收藏案例-多个
        delCollectCase(){
            console.log(this.selectedRows);
            if (this.selectedRows.length == 0) {
                alert("至少选中一行数据！");
                return;
            }

            for (const row of this.selectedRows) {
                axios.get('http://8.137.80.44:8081/api/fault/delstarcase',{
                    params: {
                        F_PKId: row.F_PKId,
                    }
                }).then(response => {});
            }
            alert("移除成功！");
        },
        handleSelect(selection, row) {
            // selection 是当前已选中的所有行的数组
            // row 是当前被选中的行数据
            this.selectedRows = [...selection];
        },
        handleSelectAll(selection) {
            // selection 是当前已选中的所有行的数组
            this.selectedRows = [...selection];
        }
    }
}

</script>

<style scoped></style>
