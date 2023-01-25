<template>
  <nav class="nav nav--main">
    <ul class="nav__items">
      <li class="nav__item">
        <nuxt-link to="/" class="nav__link material-icons">home</nuxt-link>
      </li>
      <li class="nav__item">
        <button v-show="isLogged" class="nav__link material-icons">
          account_circle
        </button>
        <nuxt-link
          v-show="!isLogged"
          to="/login"
          class="nav__link material-icons"
          >account_circle</nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const isLogged = false;
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_nav";
</style>
