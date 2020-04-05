<template>
  <div class="col-lg-6" id="transfersForm">
    <OTP :idPopup="idOTPopup" @submitOtp="submitOtp" />
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
    <form @submit.prevent="transfers">
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
      <div class="form-group" v-if="isOutside">
        <label for="bank">{{$t("bank")}}</label>
        <v-select
          :name="'bank'"
          :clearable="false"
          :options="banks"
          v-model="transactionInfo.bankId"
          @input="(value) => { transactionInfo.bankId = value }"
          :reduce="bank => bank.id"
          label="bankName"
          v-validate="!isOutside ? '' : 'required'"
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
    </form>
  </div>
</template>
<script>
import OTP from '../Popup/OTP.vue'
import UserApi from '../.././mixins/User/UserApi'
import BankApi from '../.././mixins/Bank/BankApi'
import SavingUsers from '../Popup/SavingUsers'
import { define } from '../../common/define'

export default {
  mixins: [UserApi, BankApi],
  components: {
    OTP: OTP,
    SavingUsers
  },
  data () {
    return {
      isOutside: false,
      idOTPopup: 'transfers',
      idSavingPopup: 'savingPopup',
      currency: define.currency,
      cards: [],
      banks: [],
      accountsTransactions: [],
      confirmationId: '',
      transactionInfo: {
        accountTarget: {
          accountId: null
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
        amount: parseInt(
          this.transactionInfo.amount
            .split(this.currency.groupSeparator)
            .join('')
            .replace(this.currency.suffix, '')
        ),
        content: this.transactionInfo.content,
        feeType: this.transactionInfo.feeType,
        source: this.transactionInfo.accountId,
        target: this.transactionInfo.accountTarget.accountId,
        type: define.method.transfers
      }
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
    },
    getBanks () {
      this.fetchBankAssociated().then(res => {
        this.$set(this, 'banks', res.data)
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.$set(this, 'banks', [])
      })
    }
  },
  watch: {
    'transactionInfo.amount' (val, oldVal) {
      let checkAmount = this.$helper.checkAmount(this.transactionInfo.amount)
      if (!checkAmount) {
        this.transactionInfo.amount = ''
      }
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
