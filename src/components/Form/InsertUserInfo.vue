<template>
  <div>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="userName">{{ $t("userName") }}</label>
        <input
          type="input"
          class="form-control"
          id="userName"
          name="userName"
          :placeholder="$t('userName')"
          v-validate="'required'"
        />
      </div>
      <form-field-error :validation-errors="errors" :field="'userName'" />
      <div class="form-group">
        <label for="inputAddress">{{ $t("realname") }}</label>
        <input
          type="text"
          class="form-control"
          id="realname"
          :placeholder="$t('examname')"
          name="realname"
          v-model="user.realName"
          v-validate="'required'"
        />
      </div>
      <form-field-error :validation-errors="errors" :field="'realname'" />
      <div class="form-group">
        <label for="inputAddress2">{{ $t("email") }}</label>
        <input
          type="text"
          class="form-control"
          id="email"
          :placeholder="$t('exammail')"
          v-model="user.email"
          v-validate="'required|email'"
          name="email"
        />
      </div>
      <form-field-error :validation-errors="errors" :field="'email'" />
      <div class="form-group">
        <label for="inputAddress2">{{ $t("phone") }}</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          :placeholder="$t('examphone')"
          v-model="user.phone"
          v-validate="'required'"
          name="phone"
        />
      </div>
      <form-field-error :validation-errors="errors" :field="'phone'" />
      <!-- <div class="form-group">
        <label for="inputAddress">{{ $t("address") }}</label>
        <input
          type="text"
          class="form-control"
          id="address"
          :placeholder="$t('examaddress')"
          v-model="user.address"
          v-validate="'required'"
          name="address"
        />
      </div>
      <form-field-error :validation-errors="errors" :field="'address'" /> -->
      <div class="float-right">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
    <PopupAccountInfo :userInfo="accountInfo" :id="idPopup" />
  </div>
</template>
<script>
import PopupAccountInfo from '../Popup/PopupAccountInfo'
import UserApi from '../../mixins/User/UserApi'

export default {
  mixins: [UserApi],
  components: { PopupAccountInfo },
  data () {
    return {
      accountInfo: {},
      user: {},
      idPopup: 'display-account-info'
    }
  },
  methods: {
    submit () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.createAccount()
        }
      })
    },
    createAccount () {
      // this.createUser(this.user).then(response => {
      //   this.$set(this, 'accountInfo', response.data)
      // }, error => {
      //   this.$helper.handerError(error)
      // }) // when complete api
      this.$set(this, 'accountInfo', {
        accountId: 123123123123123,
        securityCode: '3449940'

      })
      this.$bvModal.show(this.idPopup)
    }
  }
}
</script>
<style lang="scss"></style>
