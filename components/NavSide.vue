<template>
  <nav class="nav nav--side" :class="{ open: isNavOpen, mini: isNavMini }">
    <ul class="nav__items">
      <li class="nav__item">
        <nuxt-link to="/start" class="nav__link">
          <span class="nav__icon material-icons">home</span>
          <span class="nav__text">{{ $t("pages.start.title") }}</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";

const uiStore = useUiStore();

const isNavOpen = ref(uiStore.isNavOpen);
const isNavMini = ref(uiStore.isNavMini);

watch(
  () => uiStore.isNavOpen,
  () => (isNavOpen.value = uiStore.isNavOpen),
);

watch(
  () => uiStore.isNavMini,
  () => (isNavMini.value = uiStore.isNavMini),
);
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_nav";
</style>
