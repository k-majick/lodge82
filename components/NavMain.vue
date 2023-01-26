<template>
  <nav class="nav nav--main">
    <ul class="nav__items">
      <li class="nav__item">
        <nuxt-link to="/" class="nav__link material-icons">home</nuxt-link>
      </li>
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

const isLogged = ref(false);

const logout = () => {
  authStore.setUser(null, null);
  uiStore.showFlashMessage("You have been logged out");
};

watch(
  () => authStore.currentUser,
  () => (isLogged.value = !!authStore.currentUser),
);
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_nav";
</style>
