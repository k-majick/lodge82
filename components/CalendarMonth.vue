<template>
  <div class="calendar">
    <CalendarDateIndicator :key="componentKey" :selected-date="selectedDate" />

    <div class="calendar__body">
      <ol class="calendar__days calendar__days--head">
        <CalendarWeekdays />
      </ol>
      <ul class="calendar__days calendar__days--main">
        <CalendarMonthDay
          v-for="day in days"
          :key="day.date"
          :day="day"
          :is-today="day.date === today"
          :is-current-month="day.isCurrentMonth"
          :is-selected="day.isSelected"
          :is-disabled="day.isDisabled"
          :is-blocked="day.isBlocked"
          :is-booked="day.isBooked"
          :in-cart="day.inCart"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Day from "@/types/common";
import { useUiStore } from "@/store/ui";
import CalendarWeekdays from "@/components/CalendarWeekdays.vue";

const uiStore = useUiStore();
const componentKey = ref(0);

const { $dayjs } = useNuxtApp();
$dayjs.locale(uiStore.currentLocale);

const selectedDate = ref($dayjs());
const numberOfDaysInMonth = $dayjs(selectedDate.value).daysInMonth();
const today = $dayjs().format("YYYY-MM-DD");
const year = selectedDate.value.format("YYYY");
const month = selectedDate.value.format("M");

const getWeekday = (date: string) => $dayjs(date).weekday();

const getPreviousMonthDays = (): Day[] => {
  const firstDayOfTheMonthWeekday = getWeekday(getCurrentMonthDays()[0].date);
  const previousMonth = $dayjs(`${year}-${month}-01`).subtract(1, "month");
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6;
  const previousMonthLastMondayDayOfMonth = $dayjs(
    getCurrentMonthDays()[0].date,
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => ({
    date: $dayjs(
      `${previousMonth.year()}-${previousMonth.month() + 1}-${
        previousMonthLastMondayDayOfMonth + index
      }`,
    ).format("YYYY-MM-DD"),
    isCurrentMonth: false,
    isSelected: false,
    isDisabled: $dayjs(
      `${previousMonth.year()}-${previousMonth.month() + 1}-${
        previousMonthLastMondayDayOfMonth + index
      }`,
    ).isBefore($dayjs().format("YYYY-MM-DD")),
    isBlocked: false,
    isBooked: false,
    inCart: false,
  }));
};

const getCurrentMonthDays = (): Day[] =>
  [...Array(numberOfDaysInMonth)].map((_, index) => ({
    date: $dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
    isCurrentMonth: true,
    isSelected: false,
    isDisabled: $dayjs(`${year}-${month}-${index + 1}`).isBefore(
      $dayjs().add(3, "day").format("YYYY-MM-DD"),
    ),
    isBlocked: false,
    isBooked: false,
    inCart: false,
  }));

const getNextMonthDays = (): Day[] => {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year}-${month}-${getCurrentMonthDays().length}`,
  );
  const nextMonth = $dayjs(`${year}-${month}-01`).add(1, "month");
  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => ({
    date: $dayjs(
      `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
    ).format("YYYY-MM-DD"),
    isCurrentMonth: false,
    isSelected: false,
    isDisabled: $dayjs(
      `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
    ).isBefore($dayjs().format("YYYY-MM-DD")),
    isBlocked: false,
    isBooked: false,
    inCart: false,
  }));
};

const days = [
  ...getPreviousMonthDays(),
  ...getCurrentMonthDays(),
  ...getNextMonthDays(),
];

watch(
  () => uiStore.currentLocale,
  () => {
    $dayjs.locale(uiStore.currentLocale);
    selectedDate.value = $dayjs();
    componentKey.value = componentKey.value + 1;
  },
);

// console.dir(selectedDate); //eslint-disable-line
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/_calendar";
</style>
