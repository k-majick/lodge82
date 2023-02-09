import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import timezone from 'dayjs/plugin/timezone.js';

export default defineNuxtPlugin(nuxtApp => {
  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);
  dayjs.extend(timezone);

  nuxtApp.provide('dayjs', dayjs);
});

declare module '#app' {
  interface NuxtApp {
    $dayjs: dayjs.Dayjs;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs;
  }
}
