<template>
  <div v-if="message" class="flash">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";

const uiStore = useUiStore();
const message = ref("");

watch(
  () => uiStore.currentFlashMessage,
  () => (message.value = uiStore.currentFlashMessage as string),
);
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_flash";
</style>
