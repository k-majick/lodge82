<template>
  <li v-for="weekday in weekdays()" :key="weekday" class="calendar__day">
    {{ weekday }}
  </li>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n({ useScope: 'global' });

const WEEKDAYS_DE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const WEEKDAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKDAYS_PL = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'];

const weekdays = () => {
  switch (true) {
    case locale.value === 'de':
      return WEEKDAYS_DE;
    case locale.value === 'en':
      return WEEKDAYS_EN;
    case locale.value === 'pl':
      return WEEKDAYS_PL;
  }
};
</script>
