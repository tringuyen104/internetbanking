<template>
  <!-- <form class="form-label" @submit.prevent="search">
    <h2 class="form-title">{{ $t('deltoreditemployee') }}</h2>
    <div class="form-row">
      <div class="input-group mb-3">
        <input type="text" class="form-control" name="username" placeholder="Tên đăng nhập" v-validate="'required'" v-model="username"/>
        <button type="submit" class="btn btn-primary">{{ $t('search') }}</button>
      </div>
      <form-field-error :validation-errors="errors" :field="'username'"></form-field-error>
    </div>
    <BaseUserInfo v-if="showUserInfo" :userInfo="userInfo" @cancel='hideEmployeeInfor' />
  </form>-->
  <div class="col-lg-8 col-md-12 col-sm-12 margin-auto transaction-management">
    <h2 class="form-title d-flex">{{ $t('deltoreditemployee') }}</h2>
     <loading
      :active.sync="isLoading"
      :is-full-page="true"
    ></loading>
    <b-table
      :id="idTable"
      :items="items"
      :fields="fields"
      striped
      responsive="sm"
      :perPage="perPage"
      :current-page="currentPage"
    >
      <template v-slot:cell(index)="row">{{ row.index + 1 }}</template>
      <template v-slot:cell(action)="row">
        <i
          class="fas fa-edit fa-lg blue-color remove-icon"
          @click="showEmployeeInfo(row.item, row.index, $event.target)"
          :title="$t('edit')"
        ></i>
        &nbsp;
        <i
          class="fas fa-times fa-lg red-color remove-icon"
          @click="deleteConfirmation(row.item, row.index, $event.target)"
          :title="$t('delete')"
        ></i>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      :aria-controls="idTable"
    ></b-pagination>
    <employee-info-popup :userInfo="userInfo" :id="idEmployeeInfo" @success="getAllEmpolyee"/>
    <confirm-delete-popup @remove="remove" :id="idConfirmDelete"/>
  </div>
</template>

<script>
// import BaseUserInfo from './../Form/BaseUserInfo'
import EmployeeInfoPopup from './../Popup/PopupEmpoyeeInfo'
import ConfirmDeletePopup from './../Popup/PopupConfirmDelete'
import UserApi from '../../mixins/User/UserApi'
export default {
  mixins: [UserApi],
  components: {
    EmployeeInfoPopup,
    ConfirmDeletePopup
  },
  data () {
    return {
      showUserInfo: false,
      isLoading: false,
      username: '',
      items: [],
      isEdit: false,
      fields: this.$table.fields.employee,
      filter: '',
      perPage: 5,
      currentPage: 1,
      idTable: 'edit-employee-table',
      idConfirmDelete: 'delete-employee',
      idEmployeeInfo: 'employee-info',
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
  created () {
    this.getAllEmpolyee()
  },
  methods: {
    getAllEmpolyee () {
      this.isLoading = true
      this.fetchAllEmployee().then(res => {
        this.isLoading = false
        console.log(res)
        this.items = res.data
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.isLoading = false
        this.$helper.toast.error(this, err.response.data.message)
      })
    },
    search () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.getUserInfoByUsername(this.username).then(
            res => {
              this.showUserInfo = true
              this.userInfo.id = res.data.id
              this.userInfo.email = res.data.email
              this.userInfo.firstName = res.data.firstName
              this.userInfo.lastName = res.data.lastName
              this.userInfo.phone = res.data.phone
              this.userInfo.username = this.username
            },
            error => {
              error = this.$t('notification.errorOccurred')
              this.$helper.toast.error(this, error)
            }
          )
        }
      })
    },

    deleteConfirmation (item) {
      this.$set(this, 'userInfo', Object.assign({}, item))
      this.$bvModal.show(this.idConfirmDelete)
    },

    showEmployeeInfo (item) {
      this.$set(this, 'userInfo', Object.assign({}, item))
      this.$bvModal.show(this.idEmployeeInfo)
    },

    remove () {
      this.removeEmployee(this.userInfo.id).then(res => {
        this.$helper.toast.success(this, this.$t('notification.account.removeEmployeeSuccess'))
        this.getAllEmpolyee()
      }, err => {
        this.$helper.toast.error(this, err.message)
      })
    },

    hideEmployeeInfor () {
      this.showUserInfo = false
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  }
}
</script>

<style lang="scss">
.margin-auto {
  margin: auto;
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
