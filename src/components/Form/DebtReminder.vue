<template>
  <div id="debtReminderForm" class="col-lg-6">
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
    ></loading>
    <div class="title flex">
      <h2>{{ $t("createDebtReminder") }}</h2>
    </div>
    <br />
    <form @submit.prevent="submit">
      <search-input ref="searchInput" :placeholder="$t('accountNumber')" v-on:searchValue="searchValue" :updateSearch="searchUpdate" :name="'accountNumber'" :validate="true"/>
      <div class="form-group">
         <div class="flex">
            <label for="accountName">{{ $t("name") }}</label>
          <i
            class="fas fa-address-book fa-lg flex-end saving-user-list"
            :title="$t('lstAccountSaved')"
            @click="showSavingUsers"
          ></i>
        </div>
        <input type="text" class="form-control" id="accountName" disabled v-model="ownerName" />
      </div>
      <div class="form-group">
        <label for="amount">{{ $t("amount") }}</label>
        <input
          type="text"
          class="form-control text-left"
          id="amount"
          name="amount"
          v-model="debt.amount"
          v-validate="'required'"
          v-mask="{
            alias: 'numeric',
            groupSeparator: currency.groupSeparator,
            autoGroup: true,
            digits: 2,
            digitsOptional: false,
            suffix: currency.suffix,
            placeholder: '0'
          }"
        />
      </div>
      <form-field-error :validation-errors="errors" :field="'amount'" />
      <div class="form-group">
        <label for="content">{{ $t("content") }}</label>
        <textarea class="form-control" name="content" rows="2" v-model="debt.content" v-validate="'required'"></textarea>
      </div>
      <form-field-error :validation-errors="errors" :field="'content'" />
      <button-form :titleSubmit="$t('debtReminder')"></button-form>
    </form>
    <saving-users
        :accounts="accountsTransactions"
        :idPopup="idSavingPopup"
        @get-account-saving="getAccountSaved"
      />
  </div>
</template>
<script>
import DebtApi from '../../mixins/Debt/DebtApi'
import UserApi from '../.././mixins/User/UserApi'
import AccountApi from '../../mixins/Account/AccountApi'
import { define } from '../../common/define'
import SavingUsers from '../Popup/SavingUsers'

export default {
  mixins: [ DebtApi, AccountApi, UserApi ],
  components: { SavingUsers },
  data () {
    return {
      debt: {
        amount: '',
        content: ''
      },
      ownerName: '',
      searchUpdate: '',
      currency: define.currency,
      isLoading: false,
      isSearch: true,
      search: '',
      accountsTransactions: [],
      idSavingPopup: 'popup-saving-user'
    }
  },
  created () {
    this.getAccountTransactionsList()
  },
  methods: {
    submit () {
      this.$refs.searchInput.$validator.validateAll().then(searchValid => {
        this.$validator.validateAll().then(valid => {
          if (valid && searchValid) {
            this.createDebtReminderUser()
          }
        })
      })
    },
    getAccountTransactionsList () {
      this.fetchAccountTransactionsList().then(res => {
        let resData = this.mapAccounts(res.data)
        console.log(resData)
        this.$set(this, 'accountsTransactions', resData)
      })
    },
    mapAccounts (accounts) {
      if (!accounts || accounts.length === 0) {
        return []
      }
      let filterAccounts = Object.assign([], accounts).filter(item => { return !item.bankId || item.bankId === '' })
      return filterAccounts.map(item => {
        item.fullName = item.lastName + ' ' + item.firstName
        return item
      })
    },
    showSavingUsers () {
      this.$bvModal.show(this.idSavingPopup)
    },
    getAccountSaved (account) {
      this.isSearch = !this.isSearch
      this.$set(this, 'searchUpdate', account.accountId)
      this.$set(this, 'search', account.accountId)
      this.$set(this, 'ownerName', account.fullName)
    },
    createDebtReminderUser () {
      let obj = this.parseData()
      this.createDebtReminder(obj).then(res => {
        this.$helper.toast.success(this, this.$t('debtReminderSuccess'))
      }, err => {
        this.$helper.notification.error(this, err)
      })
    },
    parseData () {
      return {
        'amount': this.$helper.parseCurrency(this.debt.amount), // this.debt.amount.replace(this.currency.suffix, '').replace(this.currency.groupSeparator, ''),
        'content': this.debt.content,
        'createDate': this.$moment(new Date()).format(define.formatTimeZoneLocal),
        'debtor': this.search,
        'status': 'NEW'
      }
    },
    findAcountByAccountId (accountId) {
      this.isLoading = true
      if (!accountId || accountId.trim() === '') {
        return
      }
      return this.fetchAccountByAccountId(accountId).then(
        res => {
          if (!res.data) {
            this.$helper.toast.warning(this, this.$t('notification.notFound'))
          }
          this.$set(this, 'ownerName', res.data.ownerName)
          this.isLoading = false
          // eslint-disable-next-line handle-callback-err
        }, err => {
          this.isLoading = false
          this.$helper.toast.error(
            this,
            this.$t('notification.contactToAdmin')
          )
        }
      )
    },
    searchUser (value, oldVal) {
      if (!this.isSearch) {
        this.isSearch = true
        return
      }
      if (value !== oldVal) {
        this.results = []
      }

      if (!value || value.trim() === '') { return }
      this.$helper.callOneTimes(this.findAcountByAccountId, 1000, value)
    },
    searchValue (val) {
      this.$set(this, 'search', val)
    }
  },
  watch: {
    search (val, oldVal) {
      this.searchUser(val, oldVal)
    },
    amount (val, oldVal) {
      let checkAmount = this.$helper.checkAmount(this.amount)
      if (!checkAmount) {
        this.amount = ''
      }
    }
  }
}
</script>
<style lang="scss">
#debtReminderForm {
  margin: auto;
  border: solid;
  border-radius: 10px;
  padding: 15px 30px 0px;
  margin-top: 30px;

  .saving-user-list {
    font-size: 1.5em;
    &:hover {
      cursor: pointer;
    }
  }

  label {
    display: flex;
  }
}

</style>
