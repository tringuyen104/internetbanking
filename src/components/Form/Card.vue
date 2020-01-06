<template>
  <div class="col-lg-3 col-md-5 col-sm-5 panel-card">
    <div class="card card-font">
      <div class="card-number">{{ cardNumber }}</div>
      <div class="card-amount">{{ cardAmount }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cardNumber: {
      required: true,
      type: String
    },
    cardAmount: {
      required: true,
      type: String
    }
  }
}
</script>
<style lang="scss">
.card {
    font: 16px/1.5 'Helvetica Neue', Helvetica, sans-serif;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 425px;
    height: 270px;
    text-align: left;
    padding: 30px;
    margin-bottom: 50px;
    color: #fff;
    border-radius: 20px;
    box-sizing: border-box;
    background: url(data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABA…v4d/Xm/Lfrnjf4P//aAAgBAgMBPxD/ABDf94L/AMVf/9oACAEDAwE/EP8Az5if4En/ALXf/9k=) no-repeat 0 0 #141819;
}
</style>
