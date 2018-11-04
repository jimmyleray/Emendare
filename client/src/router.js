import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Explore from '@/views/Explore.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'v-btn--active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue')
    },
    {
      path: '/group/:id',
      name: 'group',
      component: () => import('@/views/Group.vue')
    },
    {
      path: '/text/:id',
      name: 'text',
      component: () => import('@/views/Text.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SignIn.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignUp.vue')
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})
