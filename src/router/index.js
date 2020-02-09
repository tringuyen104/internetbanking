import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HeaderBar from '../views/HeaderBar.vue'
import Login from '../components/User/Login.vue'
import Register from '../components/Form/Register.vue'
import ListCard from '../components/User/ListCard.vue'
import CreateUser from '../components/Employee/CreateUser.vue'
import Recharge from '../components/Employee/Recharge.vue'
import ExchangeHistory from '../components/Employee/ExchangeHistory.vue'
import CreateEmployee from '../components/Admin/CreateEmployee.vue'
import DeleteOrEditEmployee from '../components/Admin/DeleteOrEditEmployee.vue'
import InsertUserInfo from '../components/Form/InsertUserInfo.vue'
import DisplayUserInfo from '../components/Form/DisplayUserInfo.vue'
import HeaderEmployee from '../components/Employee/HeaderEmployee.vue'
import HeaderAdmin from '../components/Admin/HeaderAdmin.vue'
import PaymentDebtReminder from '../components/Form/Transaction/PaymentDebtReminder.vue'
import ReciveMoney from '../components/Form/Transaction/ReciveMoney.vue'
import Transaction from '../components/Form/Transaction/Transaction.vue'
import TransfersMoney from '../components/Form/Transaction/TransfersMoney.vue'
import ChangePass from '../components/Form/ChangePass.vue'
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
    path: '/tao-tai-khoan',
    name: 'createuser',
    components: {
      headerbar: HeaderBar,
      default: CreateUser
    }
  },
  {
    path: '/nap-tien',
    name: 'recharge',
    components: {
      headerbar: HeaderBar,
      default: Recharge
    }
  },
  {
    path: '/lich-su-giao-dich',
    name: 'exchangehistory',
    components: {
      headerbar: HeaderBar,
      default: ExchangeHistory
    }
  },
  {
    path: '/them-nhan-vien',
    name: 'createemployee',
    components: {
      headerbar: HeaderBar,
      default: CreateEmployee
    }
  },
  {
    path: '/xoa-sua-nhan-vien',
    name: 'deleteoreditemployee',
    components: {
      headerbar: HeaderBar,
      default: DeleteOrEditEmployee
    }
  },
  {
    path: '/nhap-thong-tin-tai-khoan',
    name: 'insertuserinfo',
    components: {
      default: InsertUserInfo
    }
  },
  {
    path: '/hien-thong-tin-tai-khoan',
    name: 'displayuserinfo',
    components: {
      default: DisplayUserInfo
    }
  },
  {
    path: '/header-employee',
    name: 'headeremployee',
    components: {
      headerbar: HeaderBar,
      default: HeaderEmployee
    }
  },
  {
    path: '/header-admin',
    name: 'headeradmin',
    components: {
      headerbar: HeaderBar,
      default: HeaderAdmin
    }
  },
  {
    path: '/PaymentDebtReminder',
    name: 'paymentDebtReminder',
    components: {
      headerbar: HeaderBar,
      default: PaymentDebtReminder
    }
  },
  {
    path: '/ReciveMoney',
    name: 'reciveMoney',
    components: {
      headerbar: HeaderBar,
      default: ReciveMoney
    }
  },
  {
    path: '/Transaction',
    name: 'transaction',
    components: {
      headerbar: HeaderBar,
      default: Transaction
    }
  },
  {
    path: '/transfersMoney',
    name: 'transfersMoney',
    components: {
      headerbar: HeaderBar,
      default: TransfersMoney
    }
  },
  {
    path: '/doi-mat-khau',
    name: 'changePass',
    components: {
      headerbar: HeaderBar,
      default: ChangePass
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
