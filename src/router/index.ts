import { createRouter, createWebHistory } from 'vue-router'

import { LOGIN_PATH } from '@/modules/login/constants/route'
import { isNotAuthenticatedGuard } from '@/modules/login/guards/isNotAuthenticatedGuard/isNotAuthenticatedGuard'
import { STATUS_PATH } from '@/modules/status/constants/route'
import { isAuthenticatedGuard } from '@/modules/status/guards/isAuthenticatedGuard/isAuthenticatedGuard'
import PageNotFoundView from '@/views/PageNotFound/PageNotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: LOGIN_PATH,
      name: 'login',
      component: () => import('@/modules/login/views/LoginPage/LoginPage.vue'),
      beforeEnter: isNotAuthenticatedGuard
    },
    {
      path: STATUS_PATH,
      name: 'status',
      component: () => import('@/modules/status/views/StatusPage/StatusPage.vue'),
      beforeEnter: isAuthenticatedGuard
    },
    {
      path: '/:pathMaths(.*)*',
      name: 'page-not-found',
      component: PageNotFoundView
    }
  ]
})

export default router
