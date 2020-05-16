<template>
  <div class="col-lg-6" id="transfersForm">
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
    />
    <div class="flex">
      <h2 class="transfer-title">{{$t('transfersMoney')}}</h2>
      <div class="flex-end flex status-transfers">
        <label class="flex-end status-transfers-title">{{$t('transfersOutsideBank')}}</label>
        <div class="status-transfers-value">
          <input type="checkbox" v-model="isOutside" class="flex-end" />
        </div>
      </div>
    </div>
    <br />
    <form @submit.prevent="showConfirmationPopup">
      <div class="form-group">
        <label for="account">{{ $t("accountDestination") }}</label>
        <v-select
          :class="'hide-clear'"
          :clearable="false"
          :options="cards.map(item => { return item.accountId})"
          v-model="transactionInfo.accountId"
          @input="(value) => { transactionInfo.accountId = value}"
        ></v-select>
      </div>
      <div class="form-group">
        <div class="flex">
          <label for="recipientAccount">{{ $t("recipientAccount") }}</label>
          <i
            class="fas fa-address-book fa-lg flex-end saving-user-list"
            :title="$t('lstAccountSaved')"
            @click="showSavingUsers"
          ></i>
        </div>
        <input
          type="text"
          class="form-control"
          id="recipientAccount"
          name="recipientAccount"
          v-model="transactionInfo.accountTarget.accountId"
          v-validate="'numeric|required'"
        />
      </div>
      <form-field-error :validation-errors="errors" :field="'recipientAccount'" />
      <div class="form-group" v-if="isOutside"  :key="'96568A72-6D11-4D14-9EF0-6503C98D2B47'">
        <label for="bank">{{$t("bank")}}</label>
        <v-select
          :name="'bank'"
          :clearable="false"
          :options="banks"
          v-model="transactionInfo.bankId"
          @input="changeBankId"
          :reduce="bank => bank.id"
          label="bankName"
          v-validate="'required'"
        ></v-select>
      </div>
      <form-field-error :validation-errors="errors" :field="'bank'" />
      <div class="form-group">
        <label for="accountName">{{ $t("name") }}</label>
        <input
          type="text"
          class="form-control"
          id="accountName"
          disabled
          v-model="transactionInfo.accountTarget.fullName"
        />
      </div>
      <div class="form-group">
        <label for="amount">{{ $t("amount") }}</label>
        <input
          type="text"
          class="form-control text-left"
          id="amount"
          name="amount"
          v-model="transactionInfo.amount"
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
        <textarea
          class="form-control"
          id="content"
          name="content"
          rows="2"
          v-model="transactionInfo.content"
          v-validate="'required'"
        ></textarea>
      </div>
      <form-field-error :validation-errors="errors" :field="'content'" />
      <div class="form-group">
        <label for="payments">{{ $t("payments") }}</label>
        <select class="form-control" id="payments" v-model="transactionInfo.feeType">
          <option
            v-for="option in feeType"
            :key="option.charge"
            :value="option.feeType"
          >{{$t(option.charge)}}</option>
        </select>
      </div>
      <button-form :titleSubmit="$t('transfers')"></button-form>
      <saving-users
        :accounts="accountsTransactions"
        :idPopup="idSavingPopup"
        @get-account-saving="getAccountBySaving"
      />
      <OTP :idPopup="idOTPopup" @submitOtp="submitOtp" />
      <payment-confirm :item="infoPayment" :idPopup="idPaymentConfirmPopup" @payment="showOTPPopup"/>
    </form>
  </div>
</template>
<script>
import OTP from '../Popup/OTP.vue'
import UserApi from '../.././mixins/User/UserApi'
import BankApi from '../.././mixins/Bank/BankApi'
import AccountApi from '../../mixins/Account/AccountApi'
import SavingUsers from '../Popup/SavingUsers'
import PaymentConfirm from '../Popup/PaymentConfirm'
import { define } from '../../common/define'

export default {
  mixins: [UserApi, BankApi, AccountApi],
  components: {
    OTP: OTP,
    SavingUsers,
    PaymentConfirm
  },
  data () {
    return {
      isOutside: false,
      isLoading: false,
      isSearch: true,
      currency: define.currency,
      idOTPopup: 'transfers',
      idSavingPopup: 'savingPopup',
      idPaymentConfirmPopup: 'transfers-payment-popup-id',
      infoPayment: {},
      cards: [],
      banks: [],
      accountsTransactions: [],
      confirmationId: '',
      transactionInfo: {
        accountTarget: {
          accountId: null,
          fullName: ''
        },
        amount: '',
        content: '',
        feeType: '',
        bankId: ''
      },
      feeType: [
        {
          charge: 'chargeSender',
          feeType: define.feeType.sender
        },
        {
          charge: 'chargeReceiver',
          feeType: define.feeType.receiver
        }
      ]
    }
  },
  created () {
    this.getAccountTransactionsList()
    this.getCards()
    this.getBanks()
    this.transactionInfo.feeType = this.feeType[0].feeType
  },
  methods: {
    parseData () {
      if (this.isOutside) {
        return this.parseDataOutside()
      }
      return this.parseDataInside()
    },
    parseDataInside () {
      return {
        amount: this.$helper.parseCurrency(this.transactionInfo.amount),
        content: this.transactionInfo.content,
        feeType: this.transactionInfo.feeType,
        source: this.transactionInfo.accountId,
        target: this.transactionInfo.accountTarget.accountId,
        type: define.method.transfers
      }
    },
    showOTPPopup () {
      this.$bvModal.show(this.idOTPopup)
    },
    showConfirmationPopup () {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          let obj = this.parseData()
          this.createRequestTransaction(obj).then(
            res => {
              let sendItem = Object.assign({}, res.data)
              sendItem.fullName = this.transactionInfo.accountTarget.fullName
              this.$set(this, 'infoPayment', sendItem)
              this.$set(this, 'confirmationId', res.data.id)
              this.$bvModal.show(this.idPaymentConfirmPopup)
            }, err => {
              this.$helper.notification.error(this, err)
            }
          )
        }
      })
    },
    parseDataOutside () {
      return {
        amount: parseInt(
          this.transactionInfo.amount
            .split(this.currency.groupSeparator)
            .join('')
            .replace(this.currency.suffix, '')
        ),
        bankId: this.transactionInfo.bankId,
        content: this.transactionInfo.content,
        feeType: this.transactionInfo.feeType,
        source: this.transactionInfo.accountId,
        target: this.transactionInfo.accountTarget.accountId,
        type: define.method.transfers
      }
    },
    parseDataConfirm (otpCode) {
      return {
        id: this.confirmationId,
        otpCode: otpCode
      }
    },
    getCards () {
      this.getListCard().then(response => {
        this.$set(this, 'cards', response.data)
        this.transactionInfo.accountId = response.data[0].accountId
      })
    },
    getAccountTransactionsList () {
      this.fetchAccountTransactionsList().then(res => {
        let resData = this.mapAccounts(res.data)
        this.$set(this, 'accountsTransactions', resData)
      })
    },
    showSavingUsers () {
      this.$bvModal.show(this.idSavingPopup)
    },
    mapAccounts (accounts) {
      if (!accounts || accounts.length === 0) {
        return []
      }
      return accounts.map(item => {
        item.fullName = item.lastName + ' ' + item.firstName
        return item
      })
    },
    getAccountBySaving (account) {
      this.transactionInfo.accountTarget = account
      if (account.bankId && account.bankId !== '') {
        this.$set(this, 'isOutside', true)
      } else {
        this.$set(this, 'isOutside', false)
      }
      this.isSearch = false
      this.transactionInfo.bankId = account.bankId
    },
    getBanks () {
      this.fetchBankAssociated().then(res => {
        this.$set(this, 'banks', res.data)
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.$set(this, 'banks', [])
      })
    },
    submitOtp (otpCode) {
      let obj = this.parseDataConfirm(otpCode)
      this.confirmRequestTransaction(obj).then(res => {
        this.$helper.toast.success(this, this.$t('transfersSuccess'))
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.$helper.notification.error(this, err)
      })
    },
    changeBankId (value) {
      let accountId = this.transactionInfo.accountTarget.accountId
      if (accountId.trim() === '') {
        return
      }
      this.transactionInfo.bankId = value
      this.findAcountByAccountId(accountId)
    },
    findAccount (value) {
      value = value.trim()
      if (!value || value === '' || !this.isSearch) {
        this.isSearch = true
        return
      }
      this.$helper.callOneTimes(this.findAcountByAccountId, 1000, value)
    },
    findAcountByAccountId (accountId) {
      this.isLoading = true
      if (!accountId || accountId.trim() === '' || isNaN(accountId)) {
        this.isLoading = false
        this.$helper.toast.warning(this, this.$t('notification.pleaseCheckAccountId'))
        return
      }
      let bankId = this.transactionInfo.bankId
      if (this.isOutside && (!bankId || bankId.trim() === '')) {
        this.isLoading = false
        this.$helper.toast.warning(this, this.$t('notification.pleaseChoiceBank'))
        return
      }

      if (!this.isOutside) {
        bankId = null
      }

      return this.fetchAccountByAccountId(accountId, bankId).then(
        res => {
          if (!res.data || res.data.length === 0 || Object.entries(res.data).length === 0) {
            this.$helper.toast.warning(this, this.$t('notification.notFound'))
          }
          this.transactionInfo.accountTarget.fullName = res.data.ownerName
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
    }
  },
  watch: {
    'transactionInfo.amount' (val, oldVal) {
      let checkAmount = this.$helper.checkAmount(this.transactionInfo.amount)
      if (!checkAmount) {
        this.transactionInfo.amount = ''
      }
    },

    isOutside () {
      this.$validator.pause()
      this.$nextTick(() => {
        // this.$validator.reset()
        this.$validator.resume()
      })
    },

    'transactionInfo.accountTarget.accountId' (val, oldVal) {
      this.findAccount(val)
    }
  }
}
</script>
<style lang="scss" scoped>
#transfersForm {
  margin: auto;
  border: solid;
  border-radius: 10px;
  padding: 15px 30px 0px;

  .transfer-title {
    font-size: xx-large;
  }
  label {
    display: flex;
  }

  .saving-user-list {
    font-size: 1.5em;
    &:hover {
      cursor: pointer;
    }
  }

  .status-transfers-title {
    margin: auto;
    font-weight: 600;
  }

  .status-transfers-value {
    margin: auto;

    input {
      width: 30px;
      height: 20px;
      margin-right: -5px;
    }
  }
}
.v-select .dropdown-toggle .clear {
  visibility: hidden;
}
</style>
