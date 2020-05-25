import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '../store/index'
import Home from '../views/Home.vue'
import HeaderBar from '../views/HeaderBar.vue'
import SideBar from '../views/SideNav.vue'
import Login from '../components/User/Login.vue'
import RecoverPassword from '../components/Form/ForgetPassword/RecoverPassword.vue'
import ListCard from '../components/User/ListCard.vue'
import BankingTransfers from '../components/Banking/Transfers.vue'
import CreateDebt from '../components/DebtReminder/Create.vue'
import UnPaidDebt from '../components/DebtReminder/UnPaid.vue'
import ManagementDebt from '../components/DebtReminder/Management.vue'
import TransactionManagement from '../components/User/TransactionManagement.vue'
import NotFound from '../components/Errors/NotFound.vue'
import ForgetPassword from '../components/Form/ForgetPassword/ForgetPassword.vue'
import RecipientList from '../components/User/RecipientList.vue'
import ChangePassword from '../components/Form/ChangePassword.vue'
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
    name: 'recoverPassword',
    component: RecoverPassword
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
  {
    path: '/danh-sach-nguoi-nhan',
    name: 'recipientList',
    components: {
      headerbar: HeaderBar,
      default: RecipientList
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

  // banking end
  // debtreminder start
  {
    path: '/tao-nhac-no',
    name: 'createDebtReminder',
    components: {
      headerbar: HeaderBar,
      default: CreateDebt
    },
    meta: { requiredLogin: true }
  },
  {
    path: '/nhac-no-chua-thanh-toan',
    name: 'debtReminderUnPay',
    components: {
      headerbar: HeaderBar,
      default: UnPaidDebt
    },
    meta: { requiredLogin: true }
  },
  {
    path: '/quan-ly-nhac-no',
    name: 'debtReminderManagement',
    components: {
      headerbar: HeaderBar,
      default: ManagementDebt
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
  },
  {
    path: '/doi-mat-khau',
    name: 'changePassword',
    components: {
      headerbar: HeaderBar,
      default: ChangePassword
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
  const isLogin = store.state.login.isLogin
  // const currentUser = { isLogin: isLogin }

  if (Object.entries(authorize).length !== 0 && authorize.constructor === Object) {
    if (!isLogin) {
      // not logged in so redirect to login page with the return url
      // return next({ path: '/login', query: { returnUrl: to.path } })
      return next({ name: 'login' })
    }
    // check if route is restricted by role
    // if (authorize.length && !authorize.includes(currentUser.role)) {
    //   // role not authorised so redirect to home page
    //   return next({ path: '/' })
    // }
    // if (authorize.length && !authorize.includes(currentUser.role)) {
    //   // role not authorised so redirect to home page
    //   return next({ path: '/' })
    // }
  }

  if (isLogin && to.name === 'login') { return next({ name: 'home' }) }

  next()
})
export default router
