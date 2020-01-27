<template>
  <div>
    <form>
    <div class="form-group">
      <label for="inputAddress">{{ $t('realname') }}</label>
      <input type="text" class="form-control" id="realname" :placeholder="$t('examname')" />
    </div>
    <div class="form-group">
      <label for="inputAddress2">{{ $t('email') }}</label>
      <input type="text" class="form-control" id="email" :placeholder="$t('exammail')" />
    </div>
    <div class="form-group">
      <label for="inputAddress2">{{ $t('phone') }}</label>
      <input type="text" class="form-control" id="phone" :placeholder="$t('examphone')" />
    </div>
    <div class="form-group">
      <label for="inputAddress">{{ $t('address') }}</label>
      <input
        type="text"
        class="form-control"
        id="address"
        :placeholder="$t('examaddress')"
      />
    </div>
    <div class="float-right">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
  </div>
</template>
