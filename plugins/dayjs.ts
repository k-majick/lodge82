import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday.js";
import weekOfYear from "dayjs/plugin/weekOfYear.js";
import timezone from "dayjs/plugin/timezone.js";
import "dayjs/locale/de";
import "dayjs/locale/en";
import "dayjs/locale/pl";

export default defineNuxtPlugin(nuxtApp => {
  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);
  dayjs.extend(timezone);

  nuxtApp.provide("dayjs", dayjs);
});
