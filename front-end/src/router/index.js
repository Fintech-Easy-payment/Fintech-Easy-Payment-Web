import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

// const Home = { template: "<div>Home</div>" }
// const Auth = { template: "<div>Home</div>" }
const NotFound = { template: "<div>Not Found</div>" }

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/auth')
    },
    {
      path: '/signup',
      name: 'AuthMain',
      component: () => import('../components/auth/signup.vue')
    },
    {
      path: '/payment',
      name: 'PaymentMain',
      component: () => import('../components/payment/openBanking.vue')
    },
    {
      path: '/payment-result',
      name: 'PaymentResult',
      component: () => import('../components/payment/paymentResult.vue')
    },
    {
      path: '/authResult',
      name: 'authResult',
      component: () => import('../components/auth/certificationResult.vue')
    },

    { path: "*", component: NotFound },
  ],
})

export default router
