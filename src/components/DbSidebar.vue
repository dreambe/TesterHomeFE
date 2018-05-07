<!-- <template> -->
    <!-- <li class="el-menu-item is-active" style="">{{msg}}</li> --><!--
  <el-row>
    <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu">测试用例</i></template>
        <el-menu-item-group>
          <template slot="title">普通用例</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="自动化用例">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">测试用例</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">自动化测试用例</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </el-row>
</template> -->

<template>
    <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
    <el-menu  :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>测试用例</template>
        <!-- <el-menu-item-group> -->
         <!--  <template slot="title">普通用例</template> -->
          <el-menu-item index="1-1"  @click="go_case">普通用例</el-menu-item>
          <el-menu-item index="1-2" @click="go_autocase">自动化用例</el-menu-item>
          <el-menu-item index="1-3" @click="go_testview">TestView</el-menu-item>
        <!-- </el-menu-item-group> -->
<!--         <el-menu-item-group title="自动化用例">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>(待补充需求)</template>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>设置</template>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>

  export default {
    name: 'db-sidebar',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      go_case(){
        this.$router.push({path:'/case'})
      },
      go_autocase(){
        this.$router.push({path:'/autocase'})
      },
      go_testview(){
        this.$router.push({path:'/testview'})
      }
    }
  }

</script>

<style>
    li {
        padding-left: 20px;
    }
    .el-aside {
      color: #333;
  }
</style>
