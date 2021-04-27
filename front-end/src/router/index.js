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
      component: () => import('../components')
    },
    {
      path: '/auth',
      name: 'AuthMain',
      component: () => import('../components/auth')
    },
    {
      path: '/payment',
      name: 'AuthMain',
      component: () => import('../components/payment/openBanking.vue')
    },

    { path: "*", component: NotFound },
  ],
})

export default router