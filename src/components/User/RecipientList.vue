<template>
  <div class="col-lg-6 col-md-12 col-sm-12 margin-auto recipient-list">
    <div class="title flex">
      <h2>{{$t('recipientList')}}</h2>
    </div>
    <br />
    <div class="row">
      <search-input
        :placeholder="placeholder"
        class="col-sm-6 col-xs-6 col-lg-6"
        @searchValue="filterValue"
      />
      <i class="fas fa-plus-square fa-3x flex-end add-button" :title="$t('addRecipientUser')" @click="addRecipientUser"></i>
    </div>
    <br>
    <b-table
      :id="idTable"
      :items="items"
      :fields="fields"
      striped
      responsive="sm"
      :perPage="perPage"
      :current-page="currentPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
    >
      <template v-slot:cell(index)="row">{{ row.index + 1 }}</template>
      <template v-slot:cell(action)="row">
         <i
          class="fas fa-edit fa-lg blue-color remove-icon"
          @click="edit(row.item, row.index, $event.target)"
          :title="$t('removeAccount')"
        ></i>
        &nbsp;
        <i
          class="fas fa-times fa-lg red-color remove-icon"
          @click="remove(row.item, row.index, $event.target)"
          :title="$t('removeAccount')"
        ></i>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      :aria-controls="idTable"
    ></b-pagination>
    <recipient-popup :idPopup="idRecipientPopup" :isEdit="isEdit" :recipient="recipient" @doneUpdate="reloadData"/>
  </div>
</template>

<script>
import UserApi from '../.././mixins/User/UserApi'
import RecipientPopup from '../.././components/Popup/RecipientAddEdit'
import { define } from '../../common/define'
export default {
  mixins: [UserApi, define],
  components: { RecipientPopup },
  data () {
    return {
      items: [],
      isEdit: false,
      fields: this.$table.fields.recipient,
      filter: '',
      recipient: {},
      idRecipientPopup: 'recipient-popup',
      filterOn: ['accountId', 'nameSuggestion'],
      perPage: 10,
      currentPage: 1,
      idTable: 'recipient-table'
    }
  },
  created () {
    this.getRecipientList()
  },
  methods: {
    getRecipientList () {
      this.fetchAccountTransactionsList().then(
        response => {
          let data = response.data
          if (data.length === 0) {
            data = [{}]
          }
          this.$set(this, 'items', data)
        // eslint-disable-next-line handle-callback-err
        }, err => {
          this.$set(this, 'items', [{}])
        }
      )
    },
    reloadData () {
      this.getRecipientList()
    },
    remove (item, index, event) {
      this.deleteRecipient(item.id).then(res => {
        this.reloadData()
      }, err => {
        this.$helper.notification.error(this, err)
      })
    },
    edit (item, index, event) {
      console.log(item)
      this.$set(this, 'isEdit', true)
      this.$set(this, 'recipient', item)
      this.$bvModal.show(this.idRecipientPopup)
    },
    filterValue (value) {
      this.$set(this, 'filter', value)
    },
    addRecipientUser () {
      this.$set(this, 'isEdit', false)
      this.$bvModal.show(this.idRecipientPopup)
    }
  },
  computed: {
    rows () {
      return this.items.length
    },
    placeholder () {
      let accountNumber = this.$t('accountNumber')
      let suggestionName = this.$t('suggestionName').toLowerCase()
      return `${accountNumber} hoặc ${suggestionName}`
    }
  }
}
</script>
<style lang="scss">
.recipient-list {

    .add-button {
        margin-right: 15px;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
