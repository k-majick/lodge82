<template>
  <h2 class="main__title">{{ $t('pages.account.title') }}</h2>

  <p><b>{{ $t('form.name') }}: </b>{{ user.name }}</p>
  <p><b>{{ $t('form.username') }}: </b>{{ user.username }}</p>
  <p><b>{{ $t('form.email') }}: </b>{{ user.email }}</p>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const user = ref(await authStore.getProfile());
</script>
