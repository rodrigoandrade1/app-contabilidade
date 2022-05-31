import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/configuracoes',
    name: 'configuracoes',
    component: () => import(/* webpackChunkName: "SettingsView" */ '../views/SettingsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ajuda',
    name: 'ajuda',
    component: () => import(/* webpackChunkName: "HelpView" */ '../views/HelpView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/LoginView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/registrar',
    name: 'registro',
    component: () => import(/* webpackChunkName: "RegisterView" */ '../views/RegisterView.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.authenticated === false) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
