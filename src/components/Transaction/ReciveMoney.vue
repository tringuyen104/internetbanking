<script>
import Transaction from '../Form/Transaction.vue'
export default {
  extends: Transaction,
  data () {
    return {
      fields: this.$table.fields.transaction.recive,
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
  }
}
</script>
