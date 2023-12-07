import Vue from 'vue'
import VueRouter from 'vue-router'
import Discussion from '../components/Discussion'
import Client2 from '../components/Client2'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Client2 },
  { path: '/dashboard', component: Discussion},
]

const router = new VueRouter({
  routes
})

export default router
