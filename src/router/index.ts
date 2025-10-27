import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'

import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import Dashboard from '@/views/app/Dashboard.vue'
import Tickets from '@/views/app/Tickets.vue'
import { getUser } from '../lib/getUsers.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Home,
    },

    {
      path: '/auth',
      component: AuthLayout,
      children: [
        { path: 'login', name: 'Login', component: Login, meta: { requiresGuest: true } },
        { path: 'signup', name: 'Signup', component: Signup, meta: { requiresGuest: true } },
      ],
    },

    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requiresAuth: true },
        },
        { path: 'tickets', name: 'Tickets', component: Tickets, meta: { requiresAuth: true } },
      ],
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest
  const currentUser = getUser()

  if (requiresAuth && !currentUser) {
    next({ name: 'Login' })
  } else if (requiresGuest && currentUser) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

// start building the ticket app
