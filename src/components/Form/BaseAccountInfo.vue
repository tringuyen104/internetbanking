<template>
  <div>
    <div class="form-group">
      <label for="realname">{{ $t('realname') }}</label>
      <input type="text" class="form-control" id="realname" :value="accountInfo.fullName" readonly />
    </div>
    <div class="form-group">
      <label >{{ $t('accountId') }}</label>
      <input type="text" class="form-control" :value="accountInfo.accountId" readonly />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    accountInfo: {
      type: Object,
      required: true
    }
  }
}
</script>
