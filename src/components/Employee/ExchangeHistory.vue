<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t('transaction') }}</h2>
    <div class="margin-auto">
      <transaction-management />
      <h6 class="red-color d-flex">{{ $t('last30DaysTransaction') }}</h6>
    </div>
  </form>
</template>
<script>
import TransactionManagement from '../Form/Transaction/TransactionManagement.vue'

export default {
  components: {
    TransactionManagement
  },
  methods: {
    exchangeHistory () {
      return ''
    }
  }
}
</script>
