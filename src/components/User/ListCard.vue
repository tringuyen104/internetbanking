<template>
  <div class="row" id="lstCard">
    <card :type="'Tai khoan the'" :amount="'123123123'" :cardNumber="'123123123'"></card>
    <card :type="'Tai khoan tiet kiem'" :amount="'s'" :cardNumber="'445'"></card>
    <card :type="'Tai khoan tiet kiem'" :amount="'444'" :cardNumber="'4555'"></card>

     <card :type="'Tai khoan the'" :amount="'123123123'" :cardNumber="'123123123'"></card>
    <card :type="'Tai khoan tiet kiem'" :amount="'s'" :cardNumber="'445'"></card>
    <card :type="'Tai khoan tiet kiem'" :amount="'444'" :cardNumber="'4555'"></card>
  </div>
</template>
<script>
import Card from '../Form/Card.vue'
export default { components: { Card } }
</script>
<style lang="scss">
// #lstCard {
//     margin-top: 40px;
// }
</style>
