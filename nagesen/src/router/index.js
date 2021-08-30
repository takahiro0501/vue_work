import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../components/SignUp.vue'
import Dashboard from '../components/Dashboard.vue'
import SignIn from '../components/SignIn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/SignIn',
    name: 'SignIn',
    component: SignIn
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
