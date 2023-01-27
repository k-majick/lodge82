<template>
  <nav class="nav nav--side" :class="{ 'open': isNavOpen, 'mini': isNavMini }">
    <ul class="nav__items">
      <li class="nav__item">
        <nuxt-link to="/" class="nav__link material-icons">home</nuxt-link>
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
  () => isNavOpen.value = uiStore.isNavOpen,
);

watch(
  () => uiStore.isNavMini,
  () => isNavMini.value = uiStore.isNavMini,
);
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_nav";
</style>
