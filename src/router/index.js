import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HeaderBar from '../views/HeaderBar.vue'
import SideBar from '../views/SideNav.vue'
import Login from '../components/User/Login.vue'
import Register from '../components/Form/Register.vue'
import ListCard from '../components/User/ListCard.vue'
import BankingTransfers from '../components/Banking/BankingTransfers.vue'
import BankingTransfersOutside from '../components/Banking/BankingTransfersOutside.vue'
import CreateDebtReminder from '../components/DebtReminder/DebtReminderCreate.vue'
import DebtReminderUnPay from '../components/DebtReminder/DebtReminderUnPay.vue'
import DebtReminderManagement from '../components/DebtReminder/DebtReminderManagement.vue'
import TransactionManagement from '../components/User/TransactionManagement.vue'
import NotFound from '../components/Errors/NotFound.vue'

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
  // banking start
  {
    path: '/chuyen-tien-cung-ngan-hang',
    name: 'bankingTransfers',
    components: {
      headerbar: HeaderBar,
      default: BankingTransfers
    }
  },
  {
    path: '/chuyen-tien-khac-ngan-hang',
    name: 'bankingTransfersOutside',
    components: {
      headerbar: HeaderBar,
      default: BankingTransfersOutside
    }
  },

  // banking end
  // debtreminder start
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
    name: 'debtReminderManagement',
    components: {
      headerbar: HeaderBar,
      default: DebtReminderManagement
    }
  },
  // debtreminder end
  // transaction start
  {
    path: '/quan-ly-giao-dich',
    name: 'transactionManagement',
    components: {
      headerbar: HeaderBar,
      default: TransactionManagement
    }
  },
  // end transaction
  // start not found
  {
    path: '*',
    name: 'notFound',
    components: {
      headerbar: HeaderBar,
      default: NotFound
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
