<template>
  <div id="debtReminderForm" class="col-lg-6">
    <form @submit.prevent="transfers">
      <div class="form-group">
        <label for="account">{{ $t('accountNumber') }}</label>
        <input type="number" class="form-control" id="account" />
      </div>
      <!-- <div class="form-group" v-if="!isInside">
        <label for="bank">{{ $t('bank') }}</label>
        <select class="form-control" id="bank">
          <option>Account 1</option>
          <option>Account 2</option>
          <option>Account 3</option>
          <option>Account 4</option>
          <option>Account 5</option>
        </select>
      </div> -->
      <div class="form-group">
        <label for="accountName">{{ $t('name') }}</label>
        <input type="text" class="form-control" id="accountName" disabled />
      </div>
      <div class="form-group">
        <label for="amount">{{ $t('amount') }}</label>
        <input type="text" class="form-control" id="amount" />
      </div>
      <div class="form-group">
        <label for="content">{{ $t('content') }}</label>
        <textarea class="form-control" id="content" rows="2"></textarea>
      </div>
      <!-- <div class="form-group">
       <button type="submit" class="btn btn-primary">{{ $t('transfers') }}</button>
        <button type="button" class="btn btn-light" :to="{name: 'home'}">{{ $t('cancel') }}</button>
      </div>-->
      <button-form :titleSubmit="$t('debtReminder')"></button-form>
    </form>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
#debtReminderForm {
  margin: auto;
  border: solid;
  border-radius: 10px;
  padding: 15px 30px 0px;
  margin-top: 30px;
}

label {
  display: flex;
}
</style>
