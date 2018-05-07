import Vue from 'vue'
import Router from 'vue-router'

import GeneralCase from '../views/GeneralCase.vue'
import Home from '../components/Home.vue'
import AutoCase from '../views/AutoCase.vue'
import Page404 from '../components/404.vue'
import TestView from '../views/TestView.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
    },
    {
      path: '/case',
      name: '普通用例',
      component: GeneralCase,
    },
    {
      path: '/autocase',
      name: '自动化用例',
      component: AutoCase
    },
    {
      path: '*',
      hidden: true,
      component: Page404
    },
    {
      path: '/testview',
      name: 'TESTVIEW',
      component: TestView
    }

  ]
})

// export default router
