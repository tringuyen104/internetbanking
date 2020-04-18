<template>
  <div class="element">
    <div class="content d-flex flex-column col-sm-12 col-md-8 col-lg-5">
      <div id="title">
        <h1>{{ $t("changePassword") }}</h1>
      </div>
      <div class="form-login">
        <form @submit.prevent="changePassword">
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fab fa-500px fa-lg"></i>
              </span>
            </div>
            <input id="OTP"  name="OTP" class="form-control" type="text" v-bind:placeholder="$t('OTP')"
            v-validate="'required'" v-model="model.otp"/>
          </div>
          <form-field-error :validation-errors="errors" :field="'OTP'"></form-field-error>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-lock fa-lg"></i>
              </span>
            </div>
            <input id="password"  name="password" class="form-control" v-bind:placeholder="$t('password')" type="password"
              v-validate="'required'" v-model="model.password"/>
          </div>
          <form-field-error :validation-errors="errors" :field="'password'"></form-field-error>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-lock fa-lg"></i>
              </span>
            </div>
            <input id="rePassword"  name="rePassword" class="form-control" v-bind:placeholder="$t('rePassword')"
            type="password" v-validate="'required'" v-model="model.rePassword"/>
          </div>
          <form-field-error :validation-errors="errors" :field="'rePassword'"></form-field-error>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">{{ $t('changePassword') }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import FormFieldError from '../../Errors/FormFieldError.vue'
import UserApi from '../../../mixins/User/UserApi'
import urlApi from '../../../mixins/url'
export default {
  mixins: [UserApi],
  data () {
    return {
      model: {
        otp: '',
        password: '',
        rePassword: ''
      },
      email: ''
    }
  },
  components: { FormFieldError },
  created () {
    // this.$root.$i18n.locale = 'es'
    // this.app.i18n = new VueI18n({
    //   locale: 'es',
    //   fallbackLocale: 'es'
    // })
  },
  methods: {
    changePassword () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.recoverPasswordByEmail(this.convertUIModelToPostModel(), this.$router.history.current.params.email).then(res => {
            this.$helper.toast.success(this, this.$t('notification.changePasswordSuccess'))
            this.$router.replace({ name: 'home' })
          }, err => {
            this.$helper.toast.error(this, err.message)
          })
        }
      })
    },

    convertUIModelToPostModel () {
      return { email: this.$router.history.current.params.email,
        password: this.model.password,
        redirect: urlApi.user.recoverPasswordByEmail + this.$router.history.current.params.email,
        token: this.model.otp
      }
    }
  }
}
</script>
<style lang="scss">
</style>
