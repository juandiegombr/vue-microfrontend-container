import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FirstWrapper from './views/FirstWrapper.vue'
import SecondWrapper from './views/SecondWrapper.vue'
import ThirdWrapper from './views/ThirdWrapper.vue'

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
      path: '/second/:id',
      name: 'second-id',
      component: SecondWrapper
    },
    {
      path: '/third',
      name: 'third',
      component: ThirdWrapper
    }
  ]
})
