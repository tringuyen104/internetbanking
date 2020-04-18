<template>
  <div class="col-lg-4 col-md-6 col-sm-12 panel-card">
    <div class="card card-font">
      <div class="d-flex flex-column">
        <div class="p-2 card-title">
          <h4>{{ cardNumber }}</h4>
        </div>
        <div class="p-2">
          <div class="card-number">
            <h5>{{ $t("cardType") }}</h5>
          </div>
          <div class="card-amount">{{ cardType }}</div>
        </div>
        <div class="p-2">
          <div class="card-number">
            <h5>{{ $t("overbalance") }}</h5>
          </div>
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
      type: Number
    }
  },
  computed: {
    cardType () {
      console.log(this.type)
      return this.$store.state.account.type[this.type]
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
  width: 400px;
  text-align: left;
  padding: 10px;
  margin-bottom: 50px;
  color: #e9ecef;
  border-radius: 20px;
  box-sizing: border-box;
  // background-image: url(https://image.ibb.co/bVnMrc/g3095.png),
  //   linear-gradient(
  //     to right bottom,
  //     #fd696b,
  //     #fa616e,
  //     #f65871,
  //     #f15075,
  //     #ec4879
  //   );
  background-image: url(https://image.ibb.co/bVnMrc/g3095.png),
    linear-gradient(
      to right bottom,
      #c9e0df,
      #67b9bd,
      #6ec7ae,
      #61e1cf,
      #bedecf
    );
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.card-title {
  border-bottom: solid rgba(104, 129, 126, 0.667);
}
</style>
