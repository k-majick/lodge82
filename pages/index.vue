<template>
  <NavMain />

  <main class="main" :class="{ open: isNavOpen, mini: isNavMini }">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script lang="ts" setup>
const isNavOpen = false;
const isNavMini = false;
</script>
