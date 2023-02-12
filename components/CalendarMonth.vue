<template>
  <div class="calendar">
    <CalendarDateIndicator :key="componentKey" :selected-date="dateSelected" />
    <div class="calendar__body">
      <ul class="calendar__days calendar__days--head">
        <CalendarWeekdays />
      </ul>
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
          @select-day="selectDay"
        />
      </ul>
    </div>
    <CalendarDateSelector
      :date-current="today"
      :date-selected="dateSelected"
      @select-date="selectDate"
    />
  </div>
</template>

<script lang="ts" setup>
import Day from '@/types/common';
import { Dayjs } from 'dayjs';
import { useUiStore } from '@/store/ui';
import { useDaysStore } from '@/store/days';
import CalendarWeekdays from '@/components/CalendarWeekdays.vue';

const uiStore = useUiStore();
const daysStore = useDaysStore();
const componentKey = ref(0);

const { $dayjs } = useNuxtApp();
$dayjs.locale(uiStore.currentLocale);

const today = $dayjs().format('YYYY-MM-DD');
const dateSelected = ref($dayjs() as Dayjs);
const year = ref(dateSelected.value.format('YYYY'));
const month = ref(dateSelected.value.format('M'));
const numberOfDaysInMonth = ref($dayjs(dateSelected.value).daysInMonth());

const getWeekday = (date: string) => $dayjs(date).weekday();

const getPreviousMonthDays = (): Day[] => {
  const firstDayOfTheMonthWeekday = getWeekday(getCurrentMonthDays()[0].date);
  const previousMonth = $dayjs(`${year.value}-${month.value}-01`).subtract(
    1,
    'month',
  );
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6;
  const previousMonthLastMondayDayOfMonth = $dayjs(
    getCurrentMonthDays()[0].date,
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => ({
    date: $dayjs(
      `${previousMonth.year()}-${previousMonth.month() + 1}-${
        previousMonthLastMondayDayOfMonth + index
      }`,
    ).format('YYYY-MM-DD'),
    isCurrentMonth: false,
    isSelected: false,
    isDisabled: $dayjs(
      `${previousMonth.year()}-${previousMonth.month() + 1}-${
        previousMonthLastMondayDayOfMonth + index
      }`,
    ).isBefore($dayjs().format('YYYY-MM-DD')),
    isBlocked: false,
    isBooked: false,
    inCart: false,
  }));
};

const getCurrentMonthDays = (): Day[] =>
  [...Array(numberOfDaysInMonth.value)].map((_, index) => ({
    date: $dayjs(`${year.value}-${month.value}-${index + 1}`).format(
      'YYYY-MM-DD',
    ),
    isCurrentMonth: true,
    isSelected: false,
    isDisabled: $dayjs(`${year.value}-${month.value}-${index + 1}`).isBefore(
      $dayjs().add(3, 'day').format('YYYY-MM-DD'),
    ),
    isBlocked: false,
    isBooked: false,
    inCart: false,
  }));

const getNextMonthDays = (): Day[] => {
  const lastDayOfTheMonthWeekday = getWeekday(
    `${year.value}-${month.value}-${getCurrentMonthDays().length}`,
  );
  const nextMonth = $dayjs(`${year.value}-${month.value}-01`).add(1, 'month');
  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 7 - lastDayOfTheMonthWeekday
    : lastDayOfTheMonthWeekday;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((_, index) => ({
    date: $dayjs(
      `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
    ).format('YYYY-MM-DD'),
    isCurrentMonth: false,
    isSelected: false,
    isDisabled: $dayjs(
      `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
    ).isBefore($dayjs().format('YYYY-MM-DD')),
    isBlocked: false,
    isBooked: false,
    inCart: false,
  }));
};

const days = ref([
  ...getPreviousMonthDays(),
  ...getCurrentMonthDays(),
  ...getNextMonthDays(),
]);

const selectDate = (newDate: Dayjs) => {
  dateSelected.value = newDate;
  year.value = dateSelected.value.format('YYYY');
  month.value = dateSelected.value.format('M');
  numberOfDaysInMonth.value = $dayjs(dateSelected.value).daysInMonth();
  days.value = [
    ...getPreviousMonthDays(),
    ...getCurrentMonthDays(),
    ...getNextMonthDays(),
  ];
  restoreDaysData();
  componentKey.value = componentKey.value + 1;
};

const selectDay = (selectedDay: Day) => {
  const dayIndex = days.value.indexOf(selectedDay);

  if (
    daysStore.selectedDays.filter((day: Day) => day.date === selectedDay.date)
      .length > 0
  ) {
    days.value[dayIndex].isSelected = false;
    daysStore.removeSelectedDay(selectedDay.date);
  } else {
    const selectedDayClone = {
      ...selectedDay,
      isSelected: true,
    };
    days.value[dayIndex].isSelected = true;
    daysStore.addSelectedDay(selectedDayClone);
  }
};

const restoreDaysData = () => {
  days.value.filter((d1: Day) => {
    if (
      daysStore.selectedDays.some((d2: Day) => d1.date === d2.date) === true
    ) {
      d1.isSelected = true;
    }

    return daysStore.selectedDays.some((d2: Day) => d1.date === d2.date);
  });
};

watch(
  () => uiStore.currentLocale,
  () => {
    $dayjs.locale(uiStore.currentLocale);
    dateSelected.value = $dayjs();
    componentKey.value = componentKey.value + 1;
  },
);

onUnmounted(() => {
  daysStore.resetSelectedDays();
});

// console.dir(dateSelected); //eslint-disable-line
</script>

<style lang="scss">
@import '@/assets/scss/components/_calendar';
</style>
