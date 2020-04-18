<template>
  <div>
    <form @submit.prevent="submit">
      <!-- <div class="form-group">
        <label for="userName">{{ $t("userName") }}</label>
        <input
          type="input"
          class="form-control"
          id="userName"
          name="userName"
          :placeholder="$t('userName')"
          v-validate="'required'"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">
            Button
          </button>
        </div>
      </div> -->
      <div class=" form-group">
        <label for="userName">{{ $t("userName") }}</label>
        <div class="input-group">
          <input
            type="input"
            class="form-control"
            id="userName"
            name="userName"
            :placeholder="$t('userName')"
            v-validate="'required'"
            v-model="user.userName"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="createUserName">
              {{ $t('createUserName') }}
            </button>
          </div>
        </div>
      </div>
      <form-field-error :validation-errors="errors" :field="'userName'" />
      <div class="form-group">
        <label for="firstName">{{ $t("firstName") }}</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          :placeholder="$t('exfirstname')"
          name="firstName"
          v-model="user.firstName"
          v-validate="'required'"
        />
      </div>
      <form-field-error :validation-errors="errors" :field="'firstName'" />
      <div class="form-group">
        <label for="lastName">{{ $t("lastName") }}</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          :placeholder="$t('exlastname')"
          name="lastName"
          v-model="user.lastName"
          v-validate="'required'"
        />
      </div>
      <form-field-error :validation-errors="errors" :field="'lastName'" />
      <div class="form-group">
        <label for="email">{{ $t("email") }}</label>
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
        <label for="phone">{{ $t("phone") }}</label>
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
      user: {
        userName: '',
        lastName: ''
      },
      idPopup: 'display-account-info'
    }
  },
  methods: {
    submit () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          if (this.role === 'staff' && this.role !== 'user') {
            this.createUserAccount()
          }
          if (this.role !== 'staff' && this.role !== 'user') {
            this.createEmployeeAccount()
          }
        }
      })
    },

    createEmployeeAccount () {
      this.createEmployee(this.convertUIToObject()).then(
        response => {
          console.log(response)
          this.$set(this, 'accountInfo', response.data)
          this.$bvModal.show(this.idPopup)
        },
        error => {
          this.$helper.handerError(error)
        }
      )
    },

    convertUIToObject () {
      return {
        'email': this.user.email,
        'firstName': this.user.firstName,
        'lastName': this.user.lastName,
        'phone': this.user.phone,
        'username': this.user.userName
      }
    },

    createUserAccount () {
      this.createUser(this.convertUIToObject()).then(
        response => {
          console.log(response)
          this.$set(this, 'accountInfo', response.data)
          this.$bvModal.show(this.idPopup)
        },
        error => {
          this.$helper.handerError(error)
        }
      )
    },
    createUserName () {
      let name = this.user.lastName
      if (!name || name === '') {
        this.$helper.toast.error(this, this.$t('pleaseInputLastName'))
        return
      }
      let timeStamp = this.$moment().unix()
      this.user.userName = timeStamp + name
      // this.$set(this, 'user.userName', timeStamp)
    }
  },
  computed: {
    role () {
      return atob(this.$store.state.user.r).toLowerCase()
    }
  }
}
</script>
<style lang="scss"></style>
