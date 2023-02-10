<template>
  <li
    class="calendar__day"
    :class="{
      'calendar__day--today': isToday,
      'calendar__day--current': isCurrentMonth,
      'calendar__day--selected': isSelected,
      'calendar__day--disabled': isDisabled,
      'calendar__day--blocked': isBlocked,
      'calendar__day--booked': isBooked,
      'calendar__day--inCart': inCart,
    }"
    @click="selectDay"
  >
    <span>{{ label }}</span>
  </li>
</template>

<script lang="ts" setup>
import $dayjs from "dayjs";

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
  isToday: Boolean,
  isCurrentMonth: Boolean,
  isSelected: Boolean,
  isDisabled: Boolean,
  isBlocked: Boolean,
  isBooked: Boolean,
  inCart: Boolean,
});

const emit = defineEmits(["selectDay"]);
const selectDay = () => emit("selectDay", props.day);
const label = $dayjs(props.day?.date).format("D");
</script>
