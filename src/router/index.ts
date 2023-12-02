import { LOGIN_PATH } from '@/modules/login/constants/route'
import { isNotAuthenticatedGuard } from '@/modules/login/guards/is-not-authenticated-guard'
import { STATUS_PATH } from '@/modules/status/constants/route'
import { isAuthenticatedGuard } from '@/modules/status/guards/is-authenticated-guard'
import { createRouter, createWebHistory } from 'vue-router'
import PageNotFoundView from '../views/PageNotFoundView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: LOGIN_PATH,
      name: 'login',
      component: () => import('@/modules/login/views/login-page.vue'),
      beforeEnter: isNotAuthenticatedGuard
    },
    {
      path: STATUS_PATH,
      name: 'status',
      component: () => import('@/modules/status/views/status-page.vue'),
      beforeEnter: isAuthenticatedGuard
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: PageNotFoundView
    }
  ]
})

export default router