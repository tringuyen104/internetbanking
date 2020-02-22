import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HeaderBar from '../views/HeaderBar.vue'
import SideBar from '../views/SideNav.vue'
import Login from '../components/User/Login.vue'
import ChangePassword from '../components/Form/ChangePassword.vue'
import ListCard from '../components/User/ListCard.vue'
import BankingTransfers from '../components/Banking/BankingTransfers.vue'
import BankingTransfersOutside from '../components/Banking/BankingTransfersOutside.vue'
import CreateDebtReminder from '../components/DebtReminder/DebtReminderCreate.vue'
import DebtReminderUnPay from '../components/DebtReminder/DebtReminderUnPay.vue'
import DebtReminderManagement from '../components/DebtReminder/DebtReminderManagement.vue'
import TransactionManagement from '../components/User/TransactionManagement.vue'
import NotFound from '../components/Errors/NotFound.vue'
import ForgetPassword from '../components/Form/ForgetPassword/ForgetPassword.vue'

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
    path: '/doi-mat-khau/:email',
    name: 'changePassword',
    component: ChangePassword
  },
  {
    path: '/danh-sach-tai-khoan',
    name: 'cards',
    components: {
      headerbar: HeaderBar,
      default: ListCard
    },
    meta: { requiredLogin: true }
  },
  // banking start
  {
    path: '/chuyen-tien-cung-ngan-hang',
    name: 'bankingTransfers',
    components: {
      headerbar: HeaderBar,
      default: BankingTransfers
    },
    meta: { requiredLogin: true }
  },
  {
    path: '/chuyen-tien-khac-ngan-hang',
    name: 'bankingTransfersOutside',
    components: {
      headerbar: HeaderBar,
      default: BankingTransfersOutside
    },
    meta: { requiredLogin: true }
  },

  // banking end
  // debtreminder start
  {
    path: '/tao-nhac-no',
    name: 'createDebtReminder',
    components: {
      headerbar: HeaderBar,
      default: CreateDebtReminder
    },
    meta: { requiredLogin: true }
  },
  {
    path: '/nhac-no-chua-thanh-toan',
    name: 'debtReminderUnPay',
    components: {
      headerbar: HeaderBar,
      default: DebtReminderUnPay
    },
    meta: { requiredLogin: true }
  },
  {
    path: '/quan-ly-nhac-no',
    name: 'debtReminderManagement',
    components: {
      headerbar: HeaderBar,
      default: DebtReminderManagement
    },
    meta: { requiredLogin: true }
  },
  // debtreminder end
  // transaction start
  {
    path: '/quan-ly-giao-dich',
    name: 'transactionManagement',
    components: {
      headerbar: HeaderBar,
      default: TransactionManagement
    },
    meta: { requiredLogin: true }
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
  },
  {
    path: '/quen-mat-khau',
    name: 'forgetpassword',
    components: {
      headerbar: HeaderBar,
      default: ForgetPassword
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const authorize = to.meta
  const currentUser = { isLogin: true }// authenticationService.currentUserValue

  if (Object.entries(authorize).length !== 0 && authorize.constructor === Object) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      // return next({ path: '/login', query: { returnUrl: to.path } })
      return next({ name: 'login' })
    }

    // check if route is restricted by role
    // if (authorize.length && !authorize.includes(currentUser.role)) {
    //   // role not authorised so redirect to home page
    //   return next({ path: '/' })
    // }
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      return next({ path: '/' })
    }
  }

  next()
})
export default router
