<template>
  <form class="form-label col-lg-6 col-md-12 col-sm-12 margin-auto" @submit.prevent="submit">
    <h2 class="form-title">{{ $t('changePass') }}</h2>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label for="inputPassword4">{{ $t('oldPass') }}</label>
          <input
            type="password"
            class="form-control"
            name="oldPass"
            v-validate="'required'"
            v-model="model.oldPass"
          />
        </div>
        <form-field-error :validation-errors="errors" :field="'oldPass'"></form-field-error>
        <div class="form-group col-md-12">
          <label for="inputPassword4">{{ $t('newPass') }}</label>
          <input
            type="password"
            class="form-control"
            name="newPass"
            v-validate="'required'"
            v-model="model.newPass"
          />
        </div>
        <form-field-error :validation-errors="errors" :field="'newPass'"></form-field-error>
        <div class="form-group col-md-12">
          <label for="inputPassword4">{{ $t('confirmPass') }}</label>
          <input
            type="password"
            class="form-control"
            name="confirmPass"
            v-validate="'required'"
            v-model="model.confirmPass"
          />
        </div>
        <form-field-error :validation-errors="errors" :field="'confirmPass'"></form-field-error>
        <div class="col-md-12 submitbtn">
        <div class="float-right">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
      </div>
  </form>
</template>

<style lang="scss">
.padding-nav {
  padding-left: 25%;
  padding-right: 25%;
}
.form-label {
  text-align: left;
}
.form-title {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
<script>
import FormFieldError from '../Errors/FormFieldError.vue'
import UserApi from '../../mixins/User/UserApi'
import BrowserStorage from '../../mixins/BrowserStorage'
export default {
  mixins: [
    UserApi,
    BrowserStorage ],
  data () {
    return {
      model: {
        oldPass: '',
        newPass: '',
        confirmPass: ''
      }
    }
  },
  components: { FormFieldError },
  methods: {
    submit () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          if (!this.checkPassword(this.model.newPass, this.model.confirmPass)) {
            this.$helper.toast.warning(this, this.$t('notification.passwordNotMacth'))
            return
          }
          this.changePasswordUser()
        }
      })
    },

    convertUItoPostModel () {
      return {
        newPassword: this.model.newPass,
        oldPassword: this.model.oldPass
      }
    },

    checkPassword (newPassword, confirmPassword) {
      if (newPassword === confirmPassword) {
        return true
      }
      return false
    },

    changePasswordUser () {
      let obj = this.convertUItoPostModel()
      console.log(obj)
      this.changePassword(this.convertUItoPostModel()).then(res => {
        this.$helper.toast.success(this, this.$t('notification.changePasswordSuccess'))
        this.clearDataAndNavigateToHomePage()
      }, err => {
        this.$helper.toast.error(this, err.message)
      })
    },

    clearDataAndNavigateToHomePage () {
      this.removeItemInSessionStorage('token')
      this.removeItemInSessionStorage('currentUser')
      this.removeItemInSessionStorage('r')
      this.$store.commit('updateLogin', false)
      this.$store.commit('updateR', '')
      this.$router.replace({ name: 'home' })
    }
  }
}

</script>
