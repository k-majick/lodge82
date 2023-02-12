<template>
  <div class="calendar__indicator">
    {{ displayDate }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectedDate: {
    type: Object,
    required: true,
  },
});

const displayDate = props.selectedDate.format('MMMM YYYY');
</script>
