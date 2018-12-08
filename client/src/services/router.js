import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'v-btn--active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/pages/Home')
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/components/pages/Explore')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/components/pages/Profile')
    },
    {
      path: '/group/:id',
      name: 'group',
      component: () => import('@/components/pages/Group')
    },
    {
      path: '/text/:id',
      name: 'text',
      component: () => import('@/components/pages/Text')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/components/pages/SignIn')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/components/pages/SignUp')
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import('@/components/pages/NotFound')
    }
  ]
})
