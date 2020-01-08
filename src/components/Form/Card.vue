<template>
  <div class="col-lg-6 col-md-6 col-sm-12 panel-card">
    <div class="card card-font">
      <div class="d-flex flex-column">
        <div class="p-2 card-title">
          <h2>{{ type }}</h2>
        </div>
        <div class="p-2">
          <div class="card-number">{{ $t('cardOwner') }}</div>
          <div class="card-amount">{{ cardNumber }}</div>
        </div>
        <div class="p-2">
          <div class="card-number">{{ $t('amount') }}</div>
          <div class="card-amount">{{ amount }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      required: true,
      type: String
    },
    cardNumber: {
      required: true,
      type: String
    },
    amount: {
      required: true,
      type: String
    }
  }
}
</script>
<style lang="scss">
.card {
  font: 16px/1.5 "Helvetica Neue", Helvetica, sans-serif;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 425px;
  text-align: left;
  padding: 30px;
  margin-bottom: 50px;
  color:#e9ecef;
  border-radius: 20px;
  box-sizing: border-box;
  color: #000;
}

.card-title {
  border-bottom: solid rgba(104, 129, 126, 0.667)
}
</style>
