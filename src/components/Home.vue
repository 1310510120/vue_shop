<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <span>电商后台管理</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-menu unique-opened background-color="#333744" text-color="#fff" active-text-color="#ffd04b" router default-active="2">
            <!-- 一级菜单的模板区域 -->
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i :class="iconObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              
              <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template>
               <i class="el-icon-location"></i>
                <span>{{subItem.authName}}</span>
              </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-row>
      </el-aside>
      <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //左侧菜单数据
      menuList: [],
      iconObj:{
        '125': 'el-icon-user',
        '103': 'el-icon-info',
        '101': 'el-icon-help',
        '102': 'el-icon-bell',
        '145': 'el-icon-s-home'
      }
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data;
      console.log(res);
    }
  }
};
</script>
 
<style lang='less' scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}

</style>