<template>
  <NavMain />
  <NavSide />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <main class="main" :class="{ open: isNavOpen, mini: isNavMini }">
        <component :is="Component" :key="(route.name as string)" />
        <br />
        <button style="z-index: 999" @click="sendMsg('log')">log</button>
        <button style="z-index: 999" @click="sendMsg('flash')">flash</button>
      </main>
    </transition>
  </router-view>

  <FlashMessage />
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";

const uiStore = useUiStore();

const route = useRoute();
const router = useRouter();

const isNavOpen = false;
const isNavMini = false;

const gotoStart = () => {
  if (route.path === "/") {
    router.push("/start");
  }
};

const sendMsg = (channelName: string) => {
  uiStore.sendAblyMessage(channelName, "hello", "Hello!!!");
};

watch(
  () => route.path,
  () => gotoStart(),
);

gotoStart();
</script>

<style lang="scss">
@import "./assets/scss/components/_main";
</style>
