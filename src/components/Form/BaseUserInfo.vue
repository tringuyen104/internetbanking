<template>
  <div>
    <div class="form-group">
      <label for="inputAddress">{{ $t('firstName') }}</label>
      <input type="text" class="form-control" id="firstName" :placeholder="$t('exlastname')" v-model="userInfo.firstName"/>
    </div>
    <div class="form-group">
      <label for="inputAddress">{{ $t('lastName') }}</label>
      <input type="text" class="form-control" id="lastName" :placeholder="$t('exfirstname')" v-model="userInfo.lastName"/>
    </div>
    <div class="form-group">
      <label for="inputAddress2">{{ $t('email') }}</label>
      <input type="text" class="form-control" id="email" :placeholder="$t('exammail')" v-model="userInfo.email"/>
    </div>
    <div class="form-group">
      <label for="inputAddress2">{{ $t('phone') }}</label>
      <input type="text" class="form-control" id="phone" :placeholder="$t('examphone')" v-model="userInfo.phone"/>
    </div>
    <div class="float-right handle-btn">
      <button type="submit" class="btn btn-primary" @click="cancel">{{ $t('cancel') }}</button>
      <button type="submit" class="btn btn-primary" @click="remove">{{ $t('delete') }}</button>
      <button type="submit" class="btn btn-primary" @click="edit">{{ $t('edit') }}</button>
    </div>
  </div>
</template>

<script>
import UserApi from '../../mixins/User/UserApi'
export default {
  mixins: [UserApi],
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      originUserInfo: {
        email: '',
        firstName: '',
        lastName: '',
        phone: ''
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },

    edit () {
      this.editEmployeeInfo(this.convertUItoPutModel(), this.userInfo.id).then(res => {
        this.$helper.toast.success(this, this.$t('notification.account.editEmployeeInfoSuccess'))
      }, err => {
        this.$helper.toast.error(this, err.message)
      })
    },

    convertUItoPutModel () {
      return {
        email: this.userInfo.email,
        firstName: this.userInfo.firstName,
        id: this.userInfo.id,
        lastName: this.userInfo.lastName,
        phone: this.userInfo.phone,
        username: this.userInfo.username
      }
    },

    remove () {
      this.removeEmployee(this.userInfo.id).then(res => {
        this.$helper.toast.success(this, this.$t('notification.account.removeEmployeeSuccess'))
      }, err => {
        this.$helper.toast.error(this, err.message)
      })
    }
  }
}
</script>
