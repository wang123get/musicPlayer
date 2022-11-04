import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import routeList from '..'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  ...routeList
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

//导航守卫
router.beforeEach((to) => {})

export default router
