import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingView,
    },

    {
      path: '/auth',
      component: AuthLayout,
      children: [
        { path: 'login', name: 'Login', component: LoginView },
        { path: 'signup', name: 'Signup', component: SignupView },
      ],
    },

    {
      path: '/app',
      component: AppLayout,
      children: [
        { path: 'dashboard', name: 'Dashboard', component: DashboardView },
        { path: 'tickets', name: 'Tickets', component: TicketsView },
      ],
    },
  ],
})

export default router
