<template>
  <form class="form-label" @submit.prevent="changePassword">
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
export default {
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
    changePassword () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          alert('success')
        }
      })
    }
  }
}

</script>
