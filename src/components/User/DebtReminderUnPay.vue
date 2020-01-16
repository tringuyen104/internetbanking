<template>
  <div>
    <div v-for="debt in debts" v-bind:key="debt.id">
      <debt-record :typeAlert="typeAltert" :data="debt"></debt-record>
    </div>
  </div>
</template>
<script>
import DebtRecord from '../Form/DebtRecord.vue'
export default {
  components: { DebtRecord },
  data () {
    return {
      debts: [],
      typeAltert: 'warning'
    }
  },
  created () {
    let obj = { creator: 'Tri Nguyen', money: '123123', id: 1 }
    this.debts.push(obj)
  }
}
</script>
