import { LOGIN_PATH, STATUS_PATH } from '@/constants/routes'
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { inject } from 'vue'
import { authenticationServiceInjectionKey } from '@/constants/injection-key'
import type { AuthenticationService } from '@/services/authentication-service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: LOGIN_PATH,
      meta: {
        title: 'Login page'
      },
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: STATUS_PATH,
      meta: {
        title: 'Service status page'
      },
      component: () => import('@/views/ServiceStatusView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/PageNotFoundView.vue')
    }
  ]
})

router.beforeEach((to: RouteLocationNormalized) => {
  const authenticationService = inject<AuthenticationService>(authenticationServiceInjectionKey)

  if (to.path === LOGIN_PATH && authenticationService?.isAuthenticated()) {
    router.push(STATUS_PATH)
  }

  if (to.path === STATUS_PATH && !authenticationService?.isAuthenticated()) {
    router.push(LOGIN_PATH)
  }
})

router.afterEach((to) => {
  document.title = 'Vue3 workshop @ 2023' + ` | ${to.meta.title}`
})

export default router
