import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Research from '@/components/Research'
import Analysis from '@/components/Analysis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/research',
      name: 'Research',
      component: Research
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: Analysis
    }
  ]
})
