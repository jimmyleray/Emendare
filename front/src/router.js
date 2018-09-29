import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Explore from './views/Explore.vue'

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
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/group',
      name: 'group',
      component: () => import('./views/Group.vue')
    },
    {
      path: '/text',
      name: 'text',
      component: () => import('./views/Text.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import('./views/NotFound.vue')
    }
  ]
})
