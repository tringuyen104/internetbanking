<template>
  <form>
    <div class="form-group">
      <label for="inputAddress">{{ $t('realname') }}</label>
      <input type="text" class="form-control" id="realname" :placeholder="$t('examname')" readonly />
    </div>
    <div class="form-group">
      <label for="inputAddress2">{{ $t('email') }}</label>
      <input type="text" class="form-control" id="email" :placeholder="$t('exammail')" readonly />
    </div>
    <div class="form-group">
      <label for="inputAddress2">{{ $t('phone') }}</label>
      <input type="text" class="form-control" id="phone" :placeholder="$t('examphone')" readonly />
    </div>
    <div class="form-group">
      <label for="inputAddress">{{ $t('address') }}</label>
      <input
        type="text"
        class="form-control"
        id="address"
        :placeholder="$t('examaddress')"
        readonly
      />
    </div>
  </form>
</template>
