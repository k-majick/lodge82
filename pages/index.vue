<template>
  <NavMain />
  <NavSide />

  <main class="main" :class="{ open: isNavOpen, mini: isNavMini }">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </main>

  <FlashMessage />
</template>

<script lang="ts" setup>
const isNavOpen = false;
const isNavMini = false;
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_main";
</style>

