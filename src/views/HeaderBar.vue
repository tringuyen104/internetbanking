<template>
  <div class="nav-position border-bottom headerbar-custom">
    <b-navbar toggleable="lg" type="light" variant="light" id="nav-bar">
      <b-navbar-brand :to="{ name: 'home' }">TienMo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" ref="navbarToggle"/>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto headerbar-custom_right">
          <template v-if="isLogin">
            <b-nav-item :to="{ name: 'transactionManagement' }">{{
              $t("lstTransaction")
            }}</b-nav-item>
            <b-nav-item :to="{ name: 'bankingTransfers' }">{{
              $t("transfers")
            }}</b-nav-item>
            <li id="header-popup-over-debt" class="nav-item b-nav-dropdown dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle nav-link-custom"
              >{{$t('debtReminder')}}</a>
              <b-popover
                :target="'header-popup-over-debt'"
                triggers="hover"
                :placement="'bottom'"
                class="dropdown-menu"
              >
                  <b-link class="dropdown-item" :to="{ name: 'createDebtReminder' }">{{$t("createDebtReminder")}}</b-link>
                  <b-link class="dropdown-item" :to="{ name: 'debtReminderManagement' }">{{$t("debtReminderManagement")}}</b-link>
              </b-popover>
            </li>
            <li id="header-popup-over-account" class="nav-item b-nav-dropdown dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle nav-link-custom"
              >{{$t('account')}}</a>
              <b-popover
                :target="'header-popup-over-account'"
                triggers="hover"
                :placement="'bottom'"
                class="dropdown-menu"
              >
                  <b-link class="dropdown-item" :to="{ name: 'cards' }">{{$t("lstCard")}}</b-link>
                  <b-link class="dropdown-item" :to="{ name: 'recipientList'}">{{$t('recipientList')}}</b-link>
              </b-popover>
            </li>
          </template>
          <b-nav-item :to="{ name: 'login' }" v-show="!isLogin">{{
            $t("signin")
          }}</b-nav-item>
          <!-- <b-nav-item @click.prevent="signOut" v-show="isLogin">{{
            $t("signOut")
          }}</b-nav-item> -->
          <b-nav-item v-show="isLogin">
            <div style="margin-top: 4px;cusor: pointer;" @click="showProfile = !showProfile" id="popup-over-profile">
               <a href="#" id="nav-popup-profile" >
                 <i class="far fa-user-circle fa-2x"></i>
              </a>
            </div>
              <b-popover
                :target="'popup-over-profile'"
                :placement="'bottomleft'"
                triggers="hover"
                :class="'dropdown-menu custom-dropdown-item'"
              >
                  <a class="dropdown-item" href="#">{{userName}}</a>
                  <b-link class="dropdown-item" :to="{ name: 'changePassword'}">{{$t('changePassword')}}</b-link>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item" @click.prevent="signOut">{{$t("signOut")}}</button>
              </b-popover>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { loginHanlder } from '../mixins/LoginHandler'
export default {
  data () {
    return {
      showProfile: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.login.isLogin
    },
    userName () {
      let json = atob(this.$store.state.login.user)
      let userName = !json ? '' : json// JSON.parse(json).username
      return userName
    }
  },
  methods: {
    signOut () {
      loginHanlder.signOutUser()
    }
  }
}
</script>
<style lang="scss">
#nav-bar {
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
}

.form-inline {
  margin: auto;
}

.border-bottom {
  border-bottom: 0.5em;
}

.headerbar-custom {
  .headerbar-custom_right {
    li {
      margin: auto;
    }
  }
}

.popover-body {
  a, button {
    font-size: 12.5pt;
    }
}
</style>
