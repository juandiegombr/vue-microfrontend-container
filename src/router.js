import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FirstWrapper from './views/FirstWrapper.vue'
import SecondWrapper from './views/SecondWrapper.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/first',
      name: 'first',
      component: FirstWrapper
    },
    {
      path: '/second',
      name: 'second',
      component: SecondWrapper
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
