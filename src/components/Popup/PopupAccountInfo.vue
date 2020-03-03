<template>
  <div>
    <b-modal ref="my-modal" hide-footer :title="$t('userInfo')" :id="id">
      <div class="d-block">
        <div>
          <label class="label-info">
            {{ $t("accountId") }} </label
          ><br />
          <i class="far fa-user fa-lg">
          </i>
            &emsp;<span>{{ userInfo.accountId }}</span>
        </div>
        <div class="margin-top-20">
          <label class="label-info">
            {{ $t("securityCode") }} </label
          ><br />
          <i class="fas fa-fingerprint fa-lg"></i>
          &emsp;<span>{{ userInfo.securityCode }}</span>
        </div>
      </div>
      <div class="d-flex margin-top-20">
        <b-button variant="light" block @click="toggleModal">{{
          $t("cancel")
        }}</b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    userInfo: {
      type: Object,
      required: true,
      default: () => ({})
    },
    id: {
      type: String,
      required: true
    }
  },
  created () {
    console.log(this.user)
  },
  methods: {
    toggleModal () {
      this.$refs['my-modal'].hide()
    }
  }
}
</script>
<style lang="scss">
.label-info {
  font-size: large;
}
</style>
