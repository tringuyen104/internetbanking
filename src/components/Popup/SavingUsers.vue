<template>
  <b-modal ref="modelSavingUsers" hide-footer :title="$t('lstAccountSaved')" :id="idPopup">
    <div class="d-block text-center saving-users">
      <div class="add-saving-user flex">
        <i class="fas fa-user-plus fa-lg flex-end"
        @click="showRecipientPopup"
        :title="$t('createRecipient')"/>
      </div>
      <search-input :placeholder="$t('usernameOrAccountNumber')" @searchValue="searchValue" />
      <template v-for="account in users">
        <div class="saving-users-content" @click="comfirm(account)" :key="account.accountId">
          <i class="far fa-user fa-2x saving-users-content__left_icon"></i>
          <div class="saving-users-content__right">
            <label class="saving-user-name">
              <strong>{{account.fullName}}</strong>
            </label>
            <div class="flex">
              <i class="fas fa-credit-card saving-account-number-icon"></i>
              <label class="saving-account-number">{{account.accountId}}</label>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="d-flex saving-button">
      <b-button class="col-xs-12" variant="primary" block @click="toggleModal">{{ $t("cancel") }}</b-button>
    </div>
    <recipient-popup
      :idPopup="idRecipientPopup"
      :isEdit="false"
      :recipient="recipient"
      @doneUpdate="reloadData"
    />
  </b-modal>
</template>
<script>
import RecipientPopup from '../Popup/RecipientAddEdit'
import UserApi from '../../mixins/User/UserApi'
export default {
  components: { RecipientPopup },
  mixins: [ UserApi ],
  props: {
    idPopup: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      idRecipientPopup: 'recipient-saving-popup',
      users: [],
      originalUsers: [],
      recipient: {
        id: '',
        nameSuggestion: '',
        bankId: ''
      }
    }
  },
  created () {
    this.getAccountTransactionsList()
  },
  methods: {
    comfirm (account) {
      this.$emit('get-account-saving', account)
      this.toggleModal()
    },
    toggleModal () {
      this.$bvModal.hide(this.idPopup)
    },
    searchValue (val, oldVal) {
      if (val === '' || !val) {
        this.$set(this, 'users', this.originalUsers)
        return
      }
      let result = this.filterAccounts(val)
      this.$set(this, 'users', result)
    },
    filterAccounts (value) {
      return this.originalUsers.filter(item => {
        return (
          item.fullName.toLowerCase().includes(value.toLowerCase()) ||
          item.accountId.includes(value)
        )
      })
    },
    reloadData () {
      this.getAccountTransactionsList()
    },
    showRecipientPopup () {
      this.$bvModal.show(this.idRecipientPopup)
    },
    getAccountTransactionsList () {
      this.fetchAccountTransactionsList().then(res => {
        let resData = this.mapAccounts(res.data)
        this.$set(this, 'users', resData)
        this.$set(this, 'originalUsers', resData)
      })
    },
    mapAccounts (accounts) {
      if (!accounts || accounts.length === 0) {
        return []
      }
      return accounts.map(item => {
        item.fullName = item.nameSuggestion
        return item
      })
    }
  }
}
</script>
<style lang="scss">
@import "src/scss/color.scss";

.saving-users {
  .saving-users-content {
    display: flex;
    border: 1px solid #cacac9;
    padding: 0.5em 0.5em 0.5em 1em;
    border-radius: 25px;
    margin-bottom: 0.5em;
    cursor: pointer;

    .saving-users-content__left_icon {
      margin-top: 12px;
    }

    .saving-users-content__right {
      display: table;
      padding-left: 20px;

      .saving-user-name {
        font-size: 16pt;
        margin-bottom: 0px;
        cursor: pointer;
        display: flex;
      }

      .saving-account-number-icon {
        color: $grey;
        margin-top: 6px;
        cursor: pointer;
      }

      .saving-account-number {
        color: $grey;
        font-size: 14pt;
        padding-left: 10px;
        cursor: pointer;
      }
    }
  }
}

.saving-button {
  margin-top: 20px;
}

.add-saving-user {
  padding-bottom: 10px;
  cursor: pointer;
}
</style>
