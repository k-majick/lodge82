<template>
  <h2 class="main__title">{{ $t("pages.start.title") }}</h2>

  <CalendarMonth />
</template>

<script lang="ts" setup>
import CalendarMonth from "@/components/CalendarMonth.vue";
</script>
