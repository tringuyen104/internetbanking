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
            <b-nav-item-dropdown :text="$t('debtReminder')" right>
              <b-dropdown-item :to="{ name: 'createDebtReminder' }">{{$t("createDebtReminder")}}</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'debtReminderManagement' }">{{$t("debtReminderManagement")}}</b-dropdown-item>
            </b-nav-item-dropdown>
             <b-nav-item-dropdown :text="$t('account')" right>
              <b-dropdown-item :to="{ name: 'cards' }">{{$t("lstCard")}}</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'recipientList'}">{{$t('recipientList')}}</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown :html="`<i class='far fa-user-circle fa-2x'/>`" right no-caret>
              <b-dropdown-item href="#">{{ userName }}</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'changePassword' }">{{ $t("changePassword")}}</b-dropdown-item>
              <b-dropdown-item @click.prevent="signOut">{{ $t("signOut") }}</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-if="!isLogin">
             <b-nav-item :to="{ name: 'login' }" v-show="!isLogin">{{ $t("signin") }}</b-nav-item>
          </template>
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
