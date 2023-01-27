<template>
  <nav class="nav nav--main" :class="{ 'open': isNavOpen, 'mini': isNavMini }">
    <button class="nav__control material-icons" @click="toggleNavOpen">
      <span v-if="isNavOpen" class="material-icons">menu_open</span>
      <span v-else class="material-icons">menu</span>
    </button>
    <button class="nav__control material-icons" @click="toggleNavMini">
      <span v-if="isNavMini" class="material-icons">chevron_right</span>
      <span v-else class="material-icons">chevron_left</span>
    </button>
    <ul class="nav__items">
      <li class="nav__item">
        <nuxt-link
          :aria-disabled="isLogged ? true : false"
          to="/login"
          class="nav__link material-icons"
        >
          account_circle
        </nuxt-link>
      </li>
      <li class="nav__item">
        <nuxt-link
          :aria-disabled="isLogged ? true : false"
          to="/register"
          class="nav__link material-icons"
        >
          assignment_turned_in
        </nuxt-link>
      </li>
      <li v-if="isLogged" class="nav__item">
        <button class="nav__link material-icons" @click="logout">logout</button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useUiStore } from "@/store/ui";
import { useAuthStore } from "@/store/auth";

const uiStore = useUiStore();
const authStore = useAuthStore();

const isLogged = ref(!!authStore.currentUser);
const isNavOpen = ref(uiStore.isNavOpen);
const isNavMini = ref(uiStore.isNavMini);

const logout = () => {
  authStore.setUser(null, null);
  uiStore.showFlashMessage("You have been logged out");
};

const toggleNavOpen = () => uiStore.toggleNavOpen();
const toggleNavMini = () => uiStore.toggleNavMini();

watch(
  () => authStore.currentUser,
  () => (isLogged.value = !!authStore.currentUser),
);

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
