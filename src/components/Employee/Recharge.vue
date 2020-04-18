<template>
  <div class="">
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
    ></loading>
    <form class="form-label" @submit.prevent="submit">
      <h2 class="form-title">{{ $t("recharge") }}</h2>
      <div class="form-group has-search" id="divSearch">
        <span class="fa fa-search form-control-feedback"></span>
        <input
          type="text"
          class="form-control"
          :placeholder="$t('search')"
          name="search"
          id="search"
          v-model="search"
          v-validate="'required'"
          autocomplete="off"
          @click="showData = search.length > 0 && results.length > 0"
        />
        <ul
          v-show="showData"
          class="autocomplete-result-list autocomplete-result-custom"
          @blur="showData = false"
        >
          <template v-for="(result, index) in results">
            <li
              :key="results[index].id"
              v-bind="results[index]"
              class="autocomplete-result"
              @click.prevent="setValueAccount(result)"
            >
              {{ getResultValue(result) }}
            </li>
          </template>
        </ul>
      </div>
      <form-field-error :validation-errors="errors" :field="'search'" />
      <div class="form-group">
        <label for="amountofmoney">{{ $t('amountofmoney')}}</label>
        <input
          type="text"
          class="form-control text-left"
          id="amountofmoney"
          v-validate="'required'"
          name="amountofmoney"
          v-model="money"
          v-mask="{'alias': 'numeric', 'groupSeparator': currency.groupSeparator, 'autoGroup': true, 'digits': 2,
          'digitsOptional': false, 'suffix': currency.suffix, 'placeholder': '0'}"
        />
      </div>
      <form-field-error :validation-errors="errors" :field="'amountofmoney'" />
      <BaseAccountInfo :accountInfo="accountInfo" />
      <div class="form-group">
        <label for="content">{{ $t('content')}}</label>
        <textarea
          type="text"
          class="form-control"
          id="content"
          v-validate="'required'"
          name="content"
          v-model="content"
        />
      </div>
       <form-field-error :validation-errors="errors" :field="'content'" />
      <div class="float-right">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
    <popup-confirm :id="idPopup" :event="userRecharge" :accountInfo="infoTransfersMoney" />
  </div>
</template>
<script>
import BaseAccountInfo from './../Form/BaseAccountInfo'
import UserApi from '../../mixins/User/UserApi'
import AccountApi from '../../mixins/Account/AccountApi'
import PopupConfirm from '../Popup/PopupConfirm'
import '../../scss/autocomplete.scss'

export default {
  mixins: [UserApi, AccountApi],
  components: { BaseAccountInfo, PopupConfirm },
  props: {
    getResultValue: {
      type: Function,
      default: result => result.accountId
    }
  },
  data () {
    return {
      accountInfo: {
        accountId: '',
        ownerName: ''
      },
      search: '',
      money: '',
      results: [],
      showData: false,
      isLoading: false,
      fullPage: true,
      content: '',
      currency: {
        suffix: ' ₫',
        groupSeparator: ','
      },
      idPopup: 'confirmPopup'

    }
  },
  methods: {
    maskCheck: function (field) {
      if (field.target.inputmask.isComplete()) {
        console.log('is Complete')
      } else {
        console.log('is Incomplete')
      }
    },
    submit () {
      this.$validator.validateAll().then(
        valid => {
          if (valid) {
            // this.userRecharge()
            this.confrimTransfersMoney()
          }
        },
        error => {
          this.$helper.handlerError(error)
        }
      )
    },
    setValueAccount (value) {
      this.$set(this, 'accountInfo', value)
      this.showData = false
    },
    confrimTransfersMoney () {
      this.$bvModal.show(this.idPopup)
    },
    userRecharge () {
      let obj = {
        amount: parseInt(this.money.split(this.currency.groupSeparator).join('').replace(this.currency.suffix, '')),
        accountId: this.accountInfo.accountId,
        content: this.content,
        feeType: 'SENDER'
      }
      this.isLoading = true
      this.recharge(obj).then(res => {
        this.isLoading = false
        this.$helper.toast.success(this, 'nap tien thanh cong')
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.isLoading = false
        this.$helper.toast.error(this, 'nap tien that bai')
      })
    },
    searchUser (value, oldVal) {
      this.showData = false

      if (value !== oldVal) {
        this.results = []
      }

      if (!value || value.trim() === '') { return }
      this.$helper.callOneTimes(this.findAccount, 1000, value)
    },
    findAccount (value) {
      this.isLoading = true
      if (value.length === 16) {
        this.findAcountByAccountId(value).then(() => {
          this.isLoading = false
        // eslint-disable-next-line handle-callback-err
        }, err => {
          this.isLoading = false
        })
      } else {
        this.finAcountsByUserName(value).then(() => {
          this.isLoading = false
        // eslint-disable-next-line handle-callback-err
        }, err => {
          this.isLoading = false
        })
      }
    },
    findAcountByAccountId (accountId) {
      if (!accountId || accountId.trim() === '') {
        return
      }
      accountId = accountId.trim()
      return this.fetchAccountByAccountId(accountId).then(
        res => {
          if (!res.data) {
            this.$helper.toast.warning(this, this.$t('notification.notFound'))
          }
          this.$set(this, 'accountInfo', res.data)
          // eslint-disable-next-line handle-callback-err
        }, err => {
          console.log(err)
          this.$helper.toast.error(
            this,
            this.$t('notification.contactToAdmin')
          )
        }
      )
    },
    finAcountsByUserName (value) {
      if (!value || value.trim() === '') return
      return this.fetchAccountsByUserName(value).then(
        res => {
          if (!res.data || !res.data.length === 0) {
            this.$helper.toast.warning(this, this.$t('notification.notFound'))
          }

          if (res.data.length === 1) {
            this.$set(this, 'accountInfo', res.data[0])
          }
          if (res.data.length > 1) {
            this.$set(this, 'results', res.data)
            this.showData = true
          }
          // eslint-disable-next-line handle-callback-err
        }, err => {
          this.$helper.toast.error(
            this,
            this.$t('notification.contactToAdmin')
          )
        }
      )
    },
    formatCurrency (val) {
      let formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      })
      this.$set(this, 'money', formatter.format(val))
    }
  },
  computed: {
    infoTransfersMoney () {
      return {
        accountId: this.accountInfo.accountId,
        amount: this.money
      }
    }
  },
  watch: {
    search (val, oldVal) {
      this.searchUser(val, oldVal)
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

#divSearch {
  position: relative;
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

.autocomplete-result-custom {
  position: absolute;
  z-index: 1;
  width: 100%;
  // visibility: hidden;
}
</style>
