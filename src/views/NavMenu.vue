<template>
  <div class="navMenu">

    <label v-for="navMenu in navMenus">
      <el-menu-item @click="show_cases" v-if="navMenu.childs==null&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                    :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name" :route="navMenu.entity.value"
                    >
        <i :class="navMenu.entity.icon"></i>
        <span slot="title">{{navMenu.entity.alias}}</span>
      </el-menu-item>

      <el-submenu v-if="navMenu.childs&&navMenu.entity&&navMenu.entity.state==='ENABLE'"
                  :key="navMenu.entity.id" :data="navMenu" :index="navMenu.entity.name">
        <template slot="title">
          <i :class="navMenu.entity.icon"></i>
          <span> {{navMenu.entity.alias}}</span>
        </template>
        <NavMenu :navMenus="navMenu.childs"></NavMenu>
      </el-submenu>
    </label>

  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {}
    },
    methods: {
      show_cases(){
        alert("xxxxxxxxx")
      }
    }
  }
</script>

<style scoped>

</style>