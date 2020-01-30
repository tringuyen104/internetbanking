<template>
  <div class="element">
    <div class="content d-flex flex-column col-sm-12 col-md-8 col-lg-5">
      <div id="title">
        <h1>{{ $t("signup") }}</h1>
      </div>
      <div class="form-login">
        <form>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-user fa-lg"></i>
              </span>
            </div>
            <input name class="form-control" type="text" v-bind:placeholder="$t('signin')" />
          </div>
          <!-- <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-envelope fa-lg"></i>
              </span>
            </div>
            <input name class="form-control" v-bind:placeholder="$t('email')" type="email" />
          </div>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-phone fa-lg"></i>
              </span>
            </div>
            <input name class="form-control" v-bind:placeholder="$t('phone')" type="text" />
          </div>-->
          <!-- form-group end.// -->
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-lock fa-lg"></i>
              </span>
            </div>
            <input id="password" class="form-control" v-bind:placeholder="$t('password')" type="password"
              v-validate="'required'" />
            <form-field-error :validation-errors="errors" :field="'password'"></form-field-error>
          </div>
          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-lock fa-lg"></i>
              </span>
            </div>
            <input class="form-control" :placeholder="$t('rePassword')" type="password" />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">{{ $t('signup') }}</button>
          </div>
        </form>
      </div>
      <div class="margin-top">
        <p class="text-center">
          Have an account?
          <router-link to="login">{{ $t('signin') }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import FormFieldError from '../Errors/FormFieldError.vue'
export default {
  // components: { FormFieldError },
  created () {
    // this.$root.$i18n.locale = 'es'
    // this.app.i18n = new VueI18n({
    //   locale: 'es',
    //   fallbackLocale: 'es'
    // })
  }
}
</script>
<style lang="scss">
</style>
