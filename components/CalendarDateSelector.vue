<template>
  <div class="calendar__selector">
    <button class="calendar__btn material-icons" @click="selectPrevious">
      keyboard_arrow_left
    </button>
    <button class="calendar__btn" @click="selectCurrent">
      {{ $t('calendar.today') }}
    </button>
    <button class="calendar__btn material-icons" @click="selectNext">
      keyboard_arrow_right
    </button>
  </div>
</template>

<script lang="ts" setup>
const { $dayjs } = useNuxtApp();

const props = defineProps({
  dateCurrent: {
    type: String,
    required: true,
  },
  dateSelected: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['selectDate']);

const selectPrevious = () => {
  const newSelectedDate = $dayjs(props.dateSelected).subtract(1, 'month');
  emit('selectDate', newSelectedDate);
};

const selectCurrent = () => {
  const newSelectedDate = $dayjs(props.dateCurrent);
  emit('selectDate', newSelectedDate);
};

const selectNext = () => {
  const newSelectedDate = $dayjs(props.dateSelected).add(1, 'month');
  emit('selectDate', newSelectedDate);
};
</script>
