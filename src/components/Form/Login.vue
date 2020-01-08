<template>
  <div class="element">
    <div class="content d-flex flex-column col-sm-12 col-md-8 col-lg-5">
      <div id="title">
        <h1>{{ $t("signin") }}</h1>
      </div>
      <div class="form-login">
        <form action id="loginForm" @submit.prevent="validateForm">
          <!-- <div class="d-flex margin-top">
            <router-link to="login" class="btn-face m-b-20">
              <i class="fab fa-facebook-f fa-2x"></i>
            </router-link>
            <router-link to="login" class="btn-google m-b-20">
              <i class="fab fa-google fa-2x"></i>
            </router-link>
          </div> -->

          <div class="margin-top">
            <span class="text-style-1">{{ $t('userName') }}</span>
          </div>
          <div>
            <b-input id="userName" v-model="login.userName" class="mb-2 mr-sm-2 mb-sm-0" size="lg" v-validate="'required'" name="userName"></b-input>
            <form-field-errors :validation-errors="errors" :field="'userName'" />
            <!-- <span v-show="errors.has('userName')" class="is-danger">{{ errors.first('userName') }}</span> -->
          </div>
          <div class="margin-top">
            <span class="text-style-1">{{ $t('password') }}</span>
          </div>
          <div>
            <b-input id="password" class="mb-2 mr-sm-2 mb-sm-0" size="lg"></b-input>
          </div>
          <div id="btn-form">
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
      <div class="margin-top">
        <router-link to="register">{{ $t('signup') }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import FormFieldErrors from '../Errors/FormFieldError.vue'
export default {
  data () {
    return { login: {} }
  },
  components: { FormFieldErrors },
  methods: {
    validateForm () {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        console.log('error')
      }
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

.element {
  padding: 30px;
}

.margin-top {
  margin-top: 30px;
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
