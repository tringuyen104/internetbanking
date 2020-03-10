<template>
  <div class="nav-position border-bottom">
    <b-navbar toggleable="lg" type="light" variant="light" id="nav-bar">
      <b-navbar-brand :to="{ name: 'home' }">TienMo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="isLogin">
            <b-nav-item :to="{ name: 'transactionManagement' }">{{
              $t("lstTransaction")
            }}</b-nav-item>
            <b-nav-item-dropdown :text="$t('debtReminder')" right>
              <b-dropdown-item :to="{ name: 'createDebtReminder' }">{{
                $t("createDebtReminder")
              }}</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'debtReminderManagement' }">{{
                $t("debtReminderManagement")
              }}</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown :text="$t('transfers')" right>
              <b-dropdown-item :to="{ name: 'bankingTransfers' }">{{
                $t("inSide")
              }}</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'bankingTransfersOutside' }">{{
                $t("outSide")
              }}</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown :text="$t('payment')" right>
              <b-dropdown-item :to="{ name: 'cards' }">{{
                $t("lstCard")
              }}</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <b-nav-item :to="{ name: 'login' }" v-show="!isLogin">{{
            $t("signin")
          }}</b-nav-item>
          <b-nav-item @click.prevent="signOut" v-show="isLogin">{{
            $t("signOut")
          }}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import BrowserStorage from '../mixins/BrowserStorage'
export default {
  mixins: [BrowserStorage],
  computed: {
    isLogin () {
      return this.$store.state.login.isLogin
    }
  },
  methods: {
    signOut () {
      this.removeItemInSessionStorage('token')
      this.removeItemInSessionStorage('currentUser')
      this.$store.commit('updateLogin', false)
      this.$router.replace('/dang-nhap')
    }
  }
}
</script>
<style lang="scss">
// @import url("https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text&display=swap");
// .logo-font {
//   font-family: "Libre Barcode 39 Text", cursive;
//   font-size: 1.5em;
// }
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
</style>
