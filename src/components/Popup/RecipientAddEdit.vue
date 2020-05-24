<template>
  <div>
    <b-modal ref="modal-otp" hide-footer :title="title" :id="idPopup">
      <loading
        :active.sync="isLoading"
        :is-full-page="true"
      />
      <div class="d-block recipient-popup">
        <div class="flex col-sm-12 col-xs-12 col-lg-12">
            <div class="flex-end flex status-bank">
                <label class="flex-end status-bank-title">{{$t('outSideBank')}}</label>
                <div class="status-bank-value">
                    <input type="checkbox" v-model="isOutside" class="flex-end check-box" />
                </div>
            </div>
        </div>
        <br />
        <div class="form-group">
            <search-input
                :placeholder="$t('accountNumber')"
                ref="searchInput"
                @searchValue="updateAccountId"
                :updateSearch="seachUpdate"
                :name="'accountNumber'"
                :validate="true"
            />
        </div>
        <form-field-error :validation-errors="errors" :field="'OTP'" />
        <div class="form-group" v-if="isOutside">
            <label for="bank">{{ $t("bank") }}</label>
            <v-select
                :name="'bank'"
                :clearable="false"
                :options="banks"
                v-model="accountInfo.bankId"
                @input="changeBankId"
                :reduce="bank => bank.id"
                label="bankName"
                v-validate="!isOutside ? '' : 'required'"
            />
        </div>
        <form-field-error :validation-errors="errors" :field="'bank'" />
        <div class="form-group">
            <label for="suggestionName">{{ $t("suggestionName") }}</label>
            <input
                type="text"
                class="form-control"
                name="suggestionName"
                v-validate="'required'"
                v-model="accountInfo.nameSuggestion"
            />
        </div>
        <form-field-error :validation-errors="errors" :field="'suggestionName'" />
      </div>
      <div class="d-flex">
        <b-button
          class="mt-3 col-md-6"
          variant="primary"
          block
          @click="comfirm"
          >{{ action }}</b-button
        >
        <b-button
          class="mt-3 col-md-6"
          variant="light"
          block
          @click="hide"
          >{{ $t("cancel") }}</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import BankApi from '../.././mixins/Bank/BankApi'
import AccountApi from '../../mixins/Account/AccountApi'
import UserApi from '../../mixins/User/UserApi'
export default {
  mixins: [BankApi, AccountApi, UserApi],
  props: {
    idPopup: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    recipient: {
      type: Object
    }
  },
  data () {
    return {
      isOutside: false,
      isLoading: false,
      isSearch: true,
      accountInfo: {
        id: '',
        nameSuggestion: '',
        bankId: ''
      },
      seachUpdate: '',
      banks: []
    }
  },
  created () {
    this.getBanks()
  },
  methods: {
    resetData () {
      // this.recipient = {
      //   id: '',
      //   suggestionName: ''
      // }
      this.seachUpdate = ''
      this.isOutside = false
    },
    changeBankId (value) {
      if (!this.accountInfo.id) {
        return
      }
      this.accountInfo.bankId = value
      this.findAcountByAccountId(this.accountInfo.id)
    },
    updateAccountId (value) {
      this.accountInfo.id = value
    },
    comfirm () {
      this.$refs.searchInput.$validator.validateAll().then(inpuValid => {
        this.$validator
          .validateAll()
          .then(valid => {
            if (valid) {
              this.isEdit ? this.editRecipient() : this.createRecipient()
            }
          })
          .catch(errors => {})
      })
    },
    hide () {
      // this.resetData()
      this.$bvModal.hide(this.idPopup)
    },
    parseData () {
      return {
        'accountId': this.accountInfo.id,
        'bankId': this.isOutside ? this.accountInfo.bankId : null,
        'nameSuggestion': this.accountInfo.nameSuggestion
      }
    },
    editRecipient () {
      let obj = this.parseData()
      this.updateRecipient(this.recipient.id, obj).then(res => {
        this.$helper.toast.success(this, this.$t('updateRecipientSuccess'))
        this.$emit('doneUpdate')
        this.hide()
      }, err => {
        this.$helper.notification.error(this, err)
      })
    },
    createRecipient () {
      this.isLoading = true
      let obj = this.parseData()
      this.addRecipient(obj).then(res => {
        this.$helper.toast.success(this, this.$t('newRecipientSuccess'))
        this.isLoading = false
        this.$emit('doneUpdate')
        this.hide()
      }, err => {
        this.isLoading = false
        this.$helper.notification.error(this, err)
      })
    },
    getBanks () {
      this.fetchBankAssociated().then(res => {
        this.$set(this, 'banks', res.data)
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.$set(this, 'banks', [])
      })
    },
    findAcountByAccountId (accountId) {
      this.isLoading = true
      if (!accountId || accountId.trim() === '') {
        return
      }

      let bankId = this.accountInfo.bankId

      if (this.isOutside && (!bankId || bankId.trim() === '')) {
        this.$helper.toast.warning(this, this.$t('notification.pleaseChoiceBank'))
        this.isLoading = false
        return
      }

      if (!this.isOutside) {
        bankId = null
      }

      return this.fetchAccountByAccountId(accountId, bankId).then(
        res => {
          if (!res.data || res.data.length === 0) {
            this.$helper.toast.warning(this, this.$t('notification.notFound'))
          }
          this.accountInfo.nameSuggestion = res.data.ownerName
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
    findAccount (value) {
      value = value.toString().trim()
      if (!value || value === '' || !this.isSearch) {
        this.isSearch = true
        return
      }
      this.$helper.callOneTimes(this.findAcountByAccountId, 1000, value)
    }
  },
  computed: {
    title () {
      return this.isEdit ? this.$t('editRecipient') : this.$t('createRecipient')
    },
    action () {
      return this.isEdit ? this.$t('update') : this.$t('create')
    }
  },
  watch: {
    'accountInfo.id' (val, old) {
      this.findAccount(val)
    },
    recipient (val, old) {
      if (val.bankId && val.bankId !== '') {
        this.isOutside = true
      } else {
        this.isOutside = false
      }
      this.isSearch = false

      // let account = {
      //   id: val.accountId,
      //   bankId: val.bankId,
      //   suggestionName: val.nameSuggestion
      // }
      let cloneData = Object.assign({}, val)
      this.$set(this, 'seachUpdate', cloneData.accountId)
      this.$set(this, 'accountInfo', cloneData)
      // this.accountInfo.suggestionName = val.nameSuggestion
      // this.accountInfo.bankId = val.bankId
    },
    isOutside () {
      this.$validator.pause()
      this.$nextTick(() => {
        // this.$validator.reset()
        this.$validator.resume()
      })
    }
  }
}
</script>
<style lang="scss">
.recipient-popup {
    .status-bank-value {
        margin-left: 5px;
    }
}
</style>
