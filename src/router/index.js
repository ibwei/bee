import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import collect from '@/components/collect'
import index from '@/components/main'
import analysis from '@/components/analysis'
import set from '@/components/set'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    component: index
  }, {
    path: '/infocenter',
    component: index
  }, {
    path: '/collect',
    component: collect
  },{
    path: '/analysis',
    component: analysis
  },{
    path:'/setting',
    component:set
  }]
})
