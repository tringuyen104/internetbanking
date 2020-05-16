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
// import BaseUserInfo from '../components/Form/BaseUserInfo'
import HeaderEmployee from '../components/Employee/HeaderEmployee.vue'
import HeaderAdmin from '../components/Admin/HeaderAdmin.vue'
// import PaymentDebtReminder from '../components/Form/Transaction/PaymentDebtReminder.vue'
// import ReciveMoney from '../components/Form/Transaction/ReciveMoney.vue'
// import Transaction from '../components/Form/Transaction/Transaction.vue'
// import TransfersMoney from '../components/Form/Transaction/TransfersMoney.vue'
// import TransactionManagement from '../components/Form/Transaction/TransactionManagement.vue'
import CrossCheck from '../components/Admin/CrossCheck.vue'
import ChangePass from '../components/Form/ChangePass.vue'
import ForgetPassword from '../components/Form/ForgetPassword/ForgetPassword.vue'
import ChangePassword from '../components/Form/ForgetPassword/ChangePassword.vue'
import NotFound from '../components/Errors/NotFound.vue'
import Forbiden from '../components/Errors/Forbiden'
import bcrypt from 'bcryptjs'
import { define } from '../common/define'

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
    },
    meta: {
      role: [define.role.employee]
    }
  },
  {
    path: '/nap-tien',
    name: 'recharge',
    components: {
      headerbar: HeaderBar,
      default: Recharge
    },
    meta: {
      role: [define.role.employee]
    }
  },
  {
    path: '/lich-su-giao-dich',
    name: 'exchangehistory',
    components: {
      headerbar: HeaderBar,
      default: ExchangeHistory
    },
    meta: {
      role: [define.role.employee]
    }
  },
  {
    path: '/them-nhan-vien',
    name: 'createemployee',
    components: {
      headerbar: HeaderBar,
      default: CreateEmployee
    },
    meta: {
      role: [define.role.ad]
    }
  },
  {
    path: '/xoa-sua-nhan-vien',
    name: 'deleteoreditemployee',
    components: {
      headerbar: HeaderBar,
      default: DeleteOrEditEmployee
    },
    meta: {
      role: [define.role.ad]
    }
  },
  {
    path: '/nhap-thong-tin-tai-khoan',
    name: 'insertuserinfo',
    components: {
      default: InsertUserInfo
    },
    meta: {
      role: [define.role.employee]
    }
  },
  // {
  //   path: '/hien-thong-tin-tai-khoan',
  //   name: 'displayuserinfo',
  //   components: {
  //     default: BaseUserInfo
  //   }
  // },
  {
    path: '/header-employee',
    name: 'headeremployee',
    components: {
      headerbar: HeaderBar,
      default: HeaderEmployee
    },
    meta: {
      role: [define.role.employee]
    }
  },
  {
    path: '/header-admin',
    name: 'headeradmin',
    components: {
      headerbar: HeaderBar,
      default: HeaderAdmin
    },
    meta: {
      role: [define.role.ad]
    }
  },
  {
    path: '/crossCheck',
    name: 'crossCheck',
    components: {
      headerbar: HeaderBar,
      default: CrossCheck
    },
    meta: {
      role: [define.role.ad]
    }
  },
  {
    path: '/doi-mat-khau',
    name: 'changePass',
    components: {
      headerbar: HeaderBar,
      default: ChangePass
    },
    meta: {
      role: [define.role.ad, define.role.employee]
    }
  },
  {
    path: '*',
    name: 'notFound',
    components: {
      headerbar: HeaderBar,
      default: NotFound
    }
  },
  {
    path: '/403',
    name: 'forbiden',
    components: {
      headerbar: HeaderBar,
      default: Forbiden
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
    path: '/doi-mat-khau/:email',
    name: 'changePassword',
    component: ChangePassword
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
  const role = localStorage.getItem('r')
  const isLogin = bcrypt.compareSync('isLogin', (localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : ''))
  console.log(role) 
  if (Object.entries(authorize).length > 0 && authorize.constructor === Object) {
    if (!role) {
      return next({ name: 'login' })
    }
    // check role employee
    if (!authorize.role.toString().includes(atob(role).toLowerCase())) {
      return next({ name: 'forbiden' })
    }
    // if (authorize.length && !authorize.includes(currentUser.role)) {
    //   // role not authorised so redirect to home page
    //   return next({ path: '/' })
    // }
  }

  if (isLogin && to.name === 'login') { return next({ name: 'home' }) }

  next()
})

export default router
