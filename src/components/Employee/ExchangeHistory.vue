<template>
  <form class="form-label">
    <h2 class="form-title">{{ $t("transaction") }}</h2>
    <div class="margin-auto">
      <div class="row">
        <div class="form-group has-search col-sm-12">
          <span class="fa fa-search form-control-feedback"></span>
          <input
            type="text"
            class="form-control"
            :placeholder="$t('accNumber')"
            name="search"
            v-model="search"
          />
        </div>
      </div>
      <br />
      <transaction-management :searchValue="search"/>
    </div>
  </form>
</template>
<script>
import TransactionManagement from '../Form/Transaction/TransactionManagement.vue'
// import datePicker from 'vue-bootstrap-datetimepicker'
// import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

export default {
  data () {
    return {
      fromDate: new Date(),
      toDate: new Date(),
      options: {
        format: 'DD/MM/YYYY',
        useCurrent: false
      },
      search: ''
    }
  },
  components: {
    TransactionManagement // ,
    // datePicker
  }
}
</script>
<style lang="scss">
.has-search .form-control {
  padding-left: 2.375rem;
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
</style>
