<template>
  <div>
    <b-modal ref="my-modal" hide-footer :title="$t('editEmployee')" :id="id">
      <div class="d-block">
        <div>
          <!-- <div class="form-group">
            <label for="inputAddress">{{ $t('firstName') }}</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              :placeholder="$t('exlastname')"
              v-model="userInfo.firstName"
            />
          </div>
          <div class="form-group">
            <label for="inputAddress">{{ $t('lastName') }}</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              :placeholder="$t('exfirstname')"
              v-model="userInfo.lastName"
            />
          </div> -->
          <div class="form-group">
            <label for="inputAddress2">{{ $t('username') }}</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="userInfo.username"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="inputAddress2">{{ $t('email') }}</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="userInfo.email"
              name="email"
              v-validate="'email|required'"
            />
          </div>
           <form-field-error :validation-errors="errors" :field="'email'" />
          <!-- <div class="form-group">
            <label for="inputAddress2">{{ $t('phone') }}</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              :placeholder="$t('examphone')"
              v-model="userInfo.phone"
            />
          </div> -->
        </div>
      </div>
      <div class="d-flex margin-top-20">
        <b-button class="mt-3 col-md-6" variant="primary" block @click="edit">{{ $t("edit") }}</b-button>
        <b-button
          class="mt-3 col-md-6"
          variant="light"
          block
          @click="toggleModal"
        >{{ $t("cancel") }}</b-button>
      </div>
    </b-modal>
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
    },
    id: {
      type: String,
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
    edit () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.updateEmployeeInfo()
        }
      })
    },

    updateEmployeeInfo () {
      this.editEmployeeInfo(this.convertUItoPutModel(), this.userInfo.id).then(
        res => {
          this.$helper.toast.success(this, this.$t('notification.account.editEmployeeInfoSuccess'))
          this.$emit('success')
          this.toggleModal()
        },
        err => {
          this.$helper.toast.error(this, err.message)
        }
      )
    },

    convertUItoPutModel () {
      return {
        email: this.userInfo.email
        // firstName: this.userInfo.firstName,
        // id: this.userInfo.id,
        // lastName: this.userInfo.lastName,
        // phone: this.userInfo.phone,
        // username: this.userInfo.username
      }
    },

    toggleModal () {
      this.$refs['my-modal'].hide()
    }
  }
}
</script>
