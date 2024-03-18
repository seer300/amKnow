<template>
  <header class="header">
    <el-row type="flex" justify="center">
      <el-col :span="24" style="text-align: center;">多特征融合的汽车故障诊断服务系统</el-col>
    </el-row>
  </header>
</template>
<script>
import store from "@/vuex/store";
export default {
  data() {
    return {
    };
  },
  store,
  mounted() {
  },
  computed: {
    getCollapse() {
      return this.$store.state.collapsed;
    }
  },
  methods: {
    //退出
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        cancelButtonClass: "btn-custom-cancel"
      })
        .then(() => {
          sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
.header {
  background-color: #f6db63;
  color: #053343;
}
.logo {
  height: 100%;
  text-align: center;
  font-size: 24px;
  border-right: 1px solid #eef1f6;
}
.logo-width {
  width: 230px;
}
.logo-collapse-width {
  width: 60px;
}
.collapse-tool {
  padding: 0px 20px;
  width: 20px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
}
.user {
  height: 60px;
  text-align: right;
  padding-right: 20px;
  float: right;
}
.user-span {
  cursor: pointer;
  height: 60px;
}
.head-portrait {
  width: 40px;
  border-radius: 20px;
  margin: 10px 35px 10px 35px;
  float: right;
}
.icon-span {
  padding-left: 4px;
}
</style>
