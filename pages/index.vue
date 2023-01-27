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
const route = useRoute();
const router = useRouter();

const isNavOpen = false;
const isNavMini = false;

const gotoStart = () => {
  if (route.path === "/") {
    router.push("/start");
  }
};

gotoStart();

watch(
  () => route.path,
  () => gotoStart(),
);
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_main";
</style>
