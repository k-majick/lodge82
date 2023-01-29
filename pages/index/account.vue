<template>
  <h2 class="main__title">Account</h2>

  <p><b>Name: </b>{{ user.name }}</p>
  <p><b>Username: </b>{{ user.username }}</p>
  <p><b>E-mail: </b>{{ user.email }}</p>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const user = ref(await authStore.getProfile());
</script>
