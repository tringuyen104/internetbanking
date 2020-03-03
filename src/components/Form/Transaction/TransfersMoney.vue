<script>
import Transaction from './Transaction.vue'
export default {
  extends: Transaction,
  data () {
    return {
      fields: this.$table.fields.transaction.forward,
      idTable: 'table-transfers-money',
      items: [{
        isActive: true,
        age: 40,
        id: 1,
        creator: 'Dickerson',
        created: new Date(),
        money: '12.000.000'
      }]
    }
  },
  created () {
    this.$set(this, 'items', this.$helper.sortAsc(this.items, 'created'))
  },
  methods: {
    fetchDataTransfer (searchText) {
      console.log('transfer')
      this.getHistoryTransaction(searchText, this.$helper.typeTransaction.transfers)
    }
  }
}
</script>
