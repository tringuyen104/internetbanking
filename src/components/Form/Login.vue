<template>
  <div class="element">
    <div class="content d-flex flex-column col-sm-12 col-md-8 col-lg-5">
      <div id="title">
        <h1>{{ $t("signin") }}</h1>
      </div>
      <br>
      <div class="form-login">
        <form action id="loginForm" @submit.prevent="validateForm">

          <form-error :condition="loginFail" :message="$t('notification.userNameOrPasswordWrong')"/>
          <div class="">
            <span class="text-style-1">{{ $t('userName') }}</span>
          </div>
          <div>
            <b-input id="userName" v-model="user.username" class="mb-2 mr-sm-2 mb-sm-0" size="lg" v-validate="'required'" name="userName"></b-input>
            <form-field-error :validation-errors="errors" :field="'userName'" />
            <!-- <span v-show="errors.has('userName')" class="is-danger">{{ errors.first('userName') }}</span> -->
          </div>
          <div class="margin-top-30">
            <span class="text-style-1">{{ $t('password') }}</span>
          </div>
          <div>
            <b-input type="password" id="password" v-model="user.password" class="mb-2 mr-sm-2 mb-sm-0" size="lg"
            v-validate="'required'" name="password"/>
            <form-field-error :validation-errors="errors" :field="'password'" />
          </div>
          <div class="margin-top-30">
            <!-- <div class="g-recaptcha" data-sitekey="6Ld0CdUUAAAAAENoFsqhyTyeaQEVHeJXKwdstfSs"
            capcha="6LfFLdwUAAAAAAO12GIa9mtvM8CgmfuzKIECHDLE"
            id="reCapcha"></div> -->
            <vue-recaptcha
                id="reCapcha"
                ref="recaptcha"
                @verify="onCaptchaVerified"
                @expired="onCaptchaExpired"
                sitekey="6Ld0CdUUAAAAAENoFsqhyTyeaQEVHeJXKwdstfSs">
            </vue-recaptcha>
          </div>
          <div id="btn-form" class="margin-top-30">
            <b-button
              id="btnLogin"
              block
              type="submit"
              size="lg"
              class="mb-2 mr-sm-2 mb-sm-0 margin-top"
              variant="primary"
            >{{ $t("signin") }}</b-button>
          </div>
        </form>
      </div>
      <!-- <div class="margin-top-30">
        <router-link :to="{name: 'register'}">{{ $t('signup') }}</router-link>
      </div> -->
      <div class="margin-top-30">
        <router-link :to="{name: 'forgetpassword'}">{{ $t('forgetPassword') }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import FormError from '../Errors/FormError'
import VueRecaptcha from 'vue-recaptcha'
import UserApi from '../../mixins/User/UserApi'
import { loginHanlder } from '../../mixins/LoginHandler'
export default {
  name: 'Login',
  mixins: [UserApi],
  data () {
    return {
      user: {
        reCAPTCHA: ''
      },
      reCapchaToken: '',
      loginFail: false
    }
  },
  components: { FormError, VueRecaptcha },
  methods: {
    validateForm () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          if (this.reCapchaToken === '') {
            alert('Please include recapcha')
            return
          }
          this.loginUser()
        }
      })
      // return !this.errors.any()
    },
    loginUser () {
      this.login(this.user).then(res => {
        loginHanlder.signInUser(res)
        // let currentUser = this.hashUser(res.data.userInfo)
        // this.setItemInLocalStorage('token', res.data.token)
        // this.setItemInLocalStorage('login', this.hashLogin())
        // this.setItemInLocalStorage('user', currentUser)
        // this.$store.commit('updateLogin', true)
        // this.$store.commit('updateUser', currentUser)
        // this.$router.replace({ name: 'home' })
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.loginFail = true
      })
    },
    // hashLogin () {
    //   var salt = bcrypt.genSaltSync(10)
    //   var hash = bcrypt.hashSync('isLogin', salt)
    //   return hash
    // },
    // hashUser (data) {
    //   let jsonData = JSON.stringify(data)
    //   let hash = btoa(jsonData)
    //   return hash
    // },
    onCaptchaVerified (recaptchaToken) {
      this.$set(this, 'reCapchaToken', recaptchaToken)
      this.user.reCAPTCHA = recaptchaToken
    },
    onCaptchaExpired () {
      this.$set(this, 'reCapchaToken', '')
      this.$refs.recaptcha.reset()
    }
  }
}
</script>
<style lang="scss">
.content {
  border: solid;
  border-color: #c4c9ce;
  border-radius: 30px;
  margin: auto;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #e9ecefc2;
}

#reCapcha {
  display: inline-table;
}

.btn-face:hover,
.btn-google:hover {
  color: chartreuse;
  text-decoration: none;
}

.btn-face {
  color: #fff;
  background-color: #3b5998;
}

.btn-google {
  background-color: white;
}

.text-style-1 {
  font-family: Montserrat-SemiBold;
  font-size: 16px;
  color: #555555;
  line-height: 1.5;
  display: flex;
}

.btn-face,
.btn-google {
  font-family: Montserrat-SemiBold;
  font-size: 18px;
  line-height: 1.2;
  // display: -webkit-box;
  // display: -webkit-flex;
  // display: -moz-box;
  // display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: calc((100% - 20px) / 2);
  height: 70px;
  border-radius: 10px;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.2);
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
  position: relative;
  z-index: 1;
}
</style>
