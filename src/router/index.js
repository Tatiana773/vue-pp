import Vue from 'vue'
import VueRouter from 'vue-router'
import VModelExample from '@/components/Examples/VModelExample.vue'
import SlotsExample from '@/components/Examples/SlotsExample'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: VModelExample
  },
  {
    path: '/add-item',
    name: 'add-item',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/components/AddItem/AddItem.vue')
  },
  {
    path: '/slots',
    name: 'slots',
    component: SlotsExample
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
