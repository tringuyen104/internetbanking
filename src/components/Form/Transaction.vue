<template>
  <div>
    <b-table :items="data" :fields="fields" striped responsive="sm">
      <template v-slot:cell(created)="data">
        <span>{{ $moment(data.item.created).format("MM/DD/YYYY") }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
