<template>
  <div class="element margin-top-32">
    <div class="content d-flex flex-column col-sm-12 col-md-8 col-lg-6">
      <div id="title">
        <h1>{{ $t("forgetPassword") }}</h1>
      </div>
      <br/>
      <div class="form-login">
        <form>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-envelope fa-lg"></i>
              </span>
            </div>
            <input class="form-control" type="text" v-bind:placeholder="$t('inputEmail')"
            v-validate="'required|email'" name="email" v-model="email"/>
          </div>
           <form-field-errors :validation-errors="errors" :field="'email'" />
          <div class="form-group">
            <button type="button" class="btn btn-primary btn-block" v-if="!showNext" @click="sendEmail">{{ $t('submit') }}</button>
            <button type="button" class="btn btn-primary btn-block" v-if="showNext" @click="redirectToChangePassword">{{ $t('next') }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import FormFieldErrors from '../../Errors/FormFieldError.vue'
import UserApi from '../../../mixins/User/UserApi'
import urlApi from '../../../mixins/url'
export default {
  mixins: [UserApi],
  components: { FormFieldErrors },
  data () {
    return {
      showNext: false,
      email: ''
    }
  },
  created () {
    // this.$root.$i18n.locale = 'es'
    // this.app.i18n = new VueI18n({
    //   locale: 'es',
    //   fallbackLocale: 'es'
    // })
  },
  methods: {
    sendEmail () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.recoverPasswordByEmail(this.convertUIModeltoPostModel(), this.email).then(res => {
            this.showNext = true
            this.$helper.toast.success(this, this.$t('notification.sendOTPtoEmailSuccess'))
          }, error => {
            error = this.$t('notification.errorOccurred')
            this.$helper.toast.error(this, error)
          })
        }
      })
    },

    convertUIModeltoPostModel () {
      return { redirect: urlApi.user.recoverPasswordByEmail + this.email }
    },

    redirectToChangePassword () {
      this.$router.push({ name: 'changePassword', params: { email: this.email } })
    }
  }
}
</script>
<style lang="scss">
.margin-top-32 {
    margin-top: 32px;
}
</style>
