<template>
  <form class="form-label" @submit.prevent="search">
    <h2 class="form-title">{{ $t('deltoreditemployee') }}</h2>
    <div class="form-row">
      <div class="input-group mb-3">
        <input type="text" class="form-control" name="username" placeholder="Tên đăng nhập" v-validate="'required'" v-model="username"/>
        <button type="submit" class="btn btn-primary">{{ $t('search') }}</button>
      </div>
      <form-field-error :validation-errors="errors" :field="'username'"></form-field-error>
    </div>
    <BaseUserInfo v-if="showUserInfo" :userInfo="userInfo" @cancel='hideEmployeeInfor' />
  </form>
</template>

<script>
import BaseUserInfo from './../Form/BaseUserInfo'
import FormFieldError from '../Errors/FormFieldError.vue'
import UserApi from '../../mixins/User/UserApi'
export default {
  mixins: [UserApi],
  components: {
    BaseUserInfo,
    FormFieldError
  },
  data () {
    return {
      showUserInfo: false,
      username: '',
      userInfo: {
        username: '',
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: ''
      }
    }
  },
  methods: {
    search () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.getUserInfoByUsername(this.username).then(res => {
            this.showUserInfo = true
            this.userInfo.id = res.data.id
            this.userInfo.email = res.data.email
            this.userInfo.firstName = res.data.firstName
            this.userInfo.lastName = res.data.lastName
            this.userInfo.phone = res.data.phone
            this.userInfo.username = this.username
          }, error => {
            error = this.$t('notification.errorOccurred')
            this.$helper.toast.error(this, error)
          })
        }
      })
    },

    hideEmployeeInfor () {
      this.showUserInfo = false
    }
  }
}
</script>

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
.handle-btn {
  button {
    margin-left: 5px;
  }
}
</style>
