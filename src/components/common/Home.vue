<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <Header></Header>
    </el-col>
    <el-col :span="24" class="remain">
      <LeftNav :navMenus="menuData"></LeftNav>
      <Main :navMenus="menuData"></Main>
    </el-col>
  </el-row>
</template>
<script>
import LeftNav from "@/components/common/LeftNav";
import Main from "@/components/common/Main";
import Header from "@/components/common/Header";
import store from "@/vuex/store";
export default {
  name: "Home",
  components: {
    LeftNav,
    Main,
    Header
  },
  store,
  data() {
    return {
      menuData: [
        {
          entity: {
            id: "HE",
            name: "故障数据统计与分析",
            // icon图标定义
            icon: "icon iconfont el-icon-connection",
            // 跳转路径
            path: "home"
          }
        },
        {
          //一级
          entity: {
            id: "FD",
            name: "故障诊断",
            // icon图标定义
            icon: "icon iconfont el-icon-connection",
            // 跳转路径
            path: "faultDiagnosis"
          }
        },
        {
          entity: {
            id: "JS",
            name: "技术支持",
            // icon图标定义
            icon: "icon iconfont el-icon-connection",
          },
          childs: [
            {
              entity: {
                id: "CM",
                name: "案例管理",
                // 跳转路径
                path: "caseManage"
              }
            },
            {
              entity: {
                id: "JSXX",
                name: "技术学习",
                path: "study"
              }
            }
          ]
        },
        // {
        //   entity: {
        //     id: "DB",
        //     name: "维修案例数据分析",
        //     icon: "icon iconfont icon-viewgallery",
        //     path: "Dashboard"
        //   }
        // }
      ]
    };
  },
  mounted() {
    const that = this;
    let iClientWidth = document.body.clientWidth;
    if (iClientWidth < 500) {
      that.$store.commit("isShowModify", 4);
    } else if (iClientWidth >= 500 && iClientWidth < 800) {
      that.$store.commit("isShowModify", 3);
    } else if (iClientWidth >= 800 && iClientWidth < 1100) {
      that.$store.commit("isShowModify", 2);
    }
    if (iClientWidth < 800) {
      that.$store.commit("collapseToTrue");
    }
    if (iClientWidth < 800) {
      that.$store.commit("isActiveToFalse");
    }
    window.onresize = function() {
      let clientWidth = document.body.clientWidth;
      if (iClientWidth < 500) {
        that.$store.commit("isShowModify", 4);
      } else if (iClientWidth >= 500 && clientWidth < 800) {
        that.$store.commit("isShowModify", 3);
      } else if (clientWidth >= 800 && clientWidth < 1100) {
        that.$store.commit("isShowModify", 2);
      } else {
        that.$store.commit("isShowModify", 1);
      }
      if (clientWidth < 800 && that.$store.state.collapsed == false) {
        that.$store.commit("collapseToTrue");
      } else if (clientWidth >= 800 && that.$store.state.collapsed == true) {
        that.$store.commit("collapseToFalse");
      }
      if (clientWidth < 800) {
        that.$store.commit("isActiveToFalse");
      } else {
        that.$store.commit("isActiveToTrue");
      }
    };
  }
};
</script>
<style>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
}
.header {
  height: 60px;
  line-height: 60px;
}
.remain {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0px;
}
.btn-custom-cancel {
  float: right;
  margin-left: 10px;
}
</style>
