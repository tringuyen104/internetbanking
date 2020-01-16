<template>
  <div class="col-lg-3 col-md-4 col-sm-6">
    <b-alert show :variant="typeAlert" >
      <div class="d-flex d-row">
        <i class="fas fa-user fa-lg col-sm-2 p-1"></i>
        <span class="p-1 color-span-debt">{{ data.creator }}</span>
      </div>
      <div class="d-flex d-row">
        <i class="fas fa-money-bill-wave fa-lg col-sm-2 p-1"></i>
        <span class="p-1 color-span-debt">{{ data.money }}</span>
      </div>
    </b-alert>
  </div>
</template>
<script>
export default {
  props: {
    typeAlert: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
