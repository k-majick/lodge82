<template>
  <NavMain />
  <NavSide />

  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <main class="main" :class="{ open: isNavOpen, mini: isNavMini }">
        <component :is="Component" :key="(route.name as string)" />
      </main>
    </transition>
  </router-view>

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

<style lang="scss">
@import "./assets/scss/components/_main";
</style>
