<template>
  <div class="nav-position border-bottom">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand :to="{ name: 'home' }">TienMo</b-navbar-brand>
      <!-- <b-navbar><b-button type="button" @click.prevent="change">Change {{  ( !staff ? 'Employee' : 'Admin' )  }}</b-button>
      </b-navbar>-->

      <b-navbar-toggle target="nav-collapse"/>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto nav-items-right">
          <template v-if="role === 'staff'">
            <HeaderEmployee></HeaderEmployee>
          </template>
          <template v-if="role === 'admin'">
            <HeaderAdmin></HeaderAdmin>
          </template>

          <template v-if="isLogin">
            <b-nav-item-dropdown :html="`<i class='far fa-user-circle fa-2x'/>`" right no-caret :title="userName">
              <b-nav-item :to="{ name: 'changePass' }">{{ $t("changePass")}}</b-nav-item>
              <b-nav-item @click.prevent="signOut">{{ $t("signOut") }}</b-nav-item>
            </b-nav-item-dropdown>
          </template>
          <b-nav-item :to="{ name: 'login' }" v-show="!isLogin">{{ $t("signin") }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import HeaderEmployee from '../components/Employee/HeaderEmployee.vue'
import HeaderAdmin from '../components/Admin/HeaderAdmin.vue'
import BrowserStorage from '../mixins/BrowserStorage'
import { loginHanlder } from '../mixins/LoginHandler'

export default {
  components: {
    HeaderEmployee,
    HeaderAdmin
  },
  mixins: [BrowserStorage],
  methods: {
    signOut () {
      loginHanlder.signOutUser()
      // window.sessionStorage.clear()
      // this.$store.commit('updateLogin', false)
      // this.$store.commit('updateR', '')
      // this.$router.replace({ name: 'home' })
    }
  },
  computed: {
    role () {
      return atob(this.$store.state.user.r).toLowerCase()
    },
    isLogin () {
      return this.$store.state.user.isLogin
    },
    userName () {
      let userName = this.$store.state.user.userName
      return userName || ''
    }
  }
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text&display=swap");
.logo-font {
  font-family: "Libre Barcode 39 Text", cursive;
  font-size: 1.5em;
}

.form-inline {
  margin: auto;
}

.border-bottom {
  border-bottom: 0.5em;
}

.nav-items-right {
  li {
    margin: auto;
  }
}
</style>
