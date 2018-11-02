import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'

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
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/Groups.vue')
    },
    {
      path: '/group',
      name: 'group',
      component: () => import('@/views/Group.vue')
    },
    {
      path: '/texts',
      name: 'texts',
      component: () => import('@/views/Texts.vue')
    },
    {
      path: '/text',
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
