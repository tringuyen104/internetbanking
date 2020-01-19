import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HeaderBar from '../views/HeaderBar.vue'
import SideBar from '../views/SideNav.vue'
import Login from '../components/User/Login.vue'
import Register from '../components/Form/Register.vue'
import ListCard from '../components/User/ListCard.vue'
import BankingTransfers from '../components/Banking/BankingTransfers.vue'
import CreateDebtReminder from '../components/DebtReminder/DebtReminderCreate.vue'
import DebtReminderUnPay from '../components/DebtReminder/DebtReminderUnPay.vue'
import DebtReminderManager from '../components/DebtReminder/DebtReminderManager.vue'

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
    path: '/sidebar',
    name: 'sidebar',
    component: SideBar
  },
  {
    path: '/dang-nhap',
    name: 'login',
    components: {
      headerbar: HeaderBar,
      default: Login
    }
  },
  {
    path: '/dang-ki',
    name: 'register',
    component: Register
  },
  {
    path: '/danh-sach-tai-khoan',
    name: 'cards',
    components: {
      headerbar: HeaderBar,
      default: ListCard
    }
  },
  {
    path: '/chuyen-tien-cung-ngan-hang',
    name: 'bankingTransfers',
    components: {
      headerbar: HeaderBar,
      default: BankingTransfers
    }
  },
  {
    path: '/tao-nhac-no',
    name: 'createDebtReminder',
    components: {
      headerbar: HeaderBar,
      default: CreateDebtReminder
    }
  },
  {
    path: '/nhac-no-chua-thanh-toan',
    name: 'debtReminderUnPay',
    components: {
      headerbar: HeaderBar,
      default: DebtReminderUnPay
    }
  },
  {
    path: '/quan-ly-nhac-no',
    name: 'debtReminderManager',
    components: {
      headerbar: HeaderBar,
      default: DebtReminderManager
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
