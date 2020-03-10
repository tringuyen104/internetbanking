<template>
  <div class="row" id="lstCard">
    <!-- <card :type="'Tai khoan the'" :amount="'123123123'" :cardNumber="'123123123'"></card>
    <card :type="'Tai khoan tiet kiem'" :amount="'s'" :cardNumber="'445'"></card>
    <card :type="'Tai khoan tiet kiem'" :amount="'444'" :cardNumber="'4555'"></card>

     <card :type="'Tai khoan the'" :amount="'123123123'" :cardNumber="'123123123'"></card>
    <card :type="'Tai khoan tiet kiem'" :amount="'s'" :cardNumber="'445'"></card>
    <card :type="'Tai khoan tiet kiem'" :amount="'444'" :cardNumber="'4555'"></card> -->
    <template v-for="item in data" v-bind="item.accountId">
      <card :type="item.type" :amount="item.balance" :cardNumber="item.accountId" v-bind:key="item.accountId"></card>
    </template>
  </div>
</template>
<script>
import Card from '../Form/Card.vue'
import UserApi from '../.././mixins/User/UserApi'
export default {
  mixins: [UserApi],
  components: { Card },
  data () {
    return {
      data: []
    }
  },
  created () {
    this.getListCard().then(response => {
      this.$set(this, 'data', response.data)
      console.log(response.data)
    })
  }
}
</script>
<style lang="scss">
// #lstCard {
//     margin-top: 40px;
// }
</style>
