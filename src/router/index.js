import Vue from 'vue'
import VueRouter from 'vue-router'
import Client1 from '../components/Client1'
import Discussion from '../components/Discussion'
import Client2 from '../components/Client2'

Vue.use(VueRouter)

const routes = [
  { path: '/client-1', component: Client1 },
  { path: '/client-2', component: Client2 },
  { path: '/client-2/dashboard', component: Discussion},
]

const router = new VueRouter({
  routes
})

export default router
