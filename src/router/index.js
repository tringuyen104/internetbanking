import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HeaderBar from '../views/HeaderBar.vue'
import Login from '../components/User/Login.vue'
import Register from '../components/Form/Register.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      headerbar: HeaderBar,
      default: Home
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/headerbar',
    name: 'headerbar',
    component: HeaderBar
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
