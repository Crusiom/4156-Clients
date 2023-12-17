import Vue from 'vue'
import VueRouter from 'vue-router'
import Discussion from '../components/Discussion'
import Client from '../components/Client'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Client },
  { path: '/dashboard', component: Discussion},
]

const router = new VueRouter({
  routes
})

export default router
