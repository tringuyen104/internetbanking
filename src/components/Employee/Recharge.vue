<template>
  <form class="form-label" @submit.prevent="submit">
    <h2 class="form-title">{{ $t("recharge") }}</h2>
    <div class="form-group has-search">
      <span class="fa fa-search form-control-feedback"></span>
      <input type="text" class="form-control" :placeholder="$t('search')" name="search" v-model="search"
      v-validate="'required'"/>
    </div>
    <form-field-error :validation-errors="errors" :field="'search'" />
    <div class="form-group">
      <label for="amount"></label>
      <input
        type="number"
        class="form-control"
        id="amount"
        :placeholder="$t('insertmoney')"
        v-validate="'required'"
        name="amount"
        v-model="money"
      />
    </div>
    <form-field-error :validation-errors="errors" :field="'amount'" />
    <BaseAccountInfo :accountInfo="accountInfo"/>
    <div class="float-right">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>
<script>
import BaseAccountInfo from './../Form/BaseAccountInfo'
import UserApi from '../../mixins/User/UserApi'
import AccountApi from '../../mixins/Account/AccountApi'
export default {
  mixins: [UserApi, AccountApi],
  components: { BaseAccountInfo },
  data () {
    return {
      accountInfo: {
        accountId: '',
        ownerName: ''
      },
      money: null,
      search: '',
      timer: null
    }
  },
  methods: {
    submit () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.userRecharge()
        }
      }, error => {
        this.$helper.handlerError(error)
      })
    },
    userRecharge () {
      let obj = {
        money: this.money,
        accountId: this.accountInfo.accountId
      }
      this.$helper.toast.success(this, 'nap tien thanh cong' + obj.money)
      // this.recharge(obj).then(res => {
      //   this.$helper.toast.success(this, 'nap tien thanh cong')
      // }, err => {
      //   this.$helper.toast.error(this, 'nap tien that bai' + err.code)
      // })
    },
    searchUser (value) {
      this.$helper.callOneTimes(this.findAccount, 1000, value)
    },
    findAccount (value) {
      this.findAccountByAccountId(value).then(res => {
        if (!res.data) { return }
        this.$set(this, 'accountInfo', res.data)
      }, err => {
        console.log(err)
      })
    }
  },
  watch: {
    search (val, oldVal) {
      this.searchUser(val)
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

.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}
</style>
