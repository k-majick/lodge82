<template>
  <form
    class="form form--login"
    @submit.prevent="processForm"
    @change="processForm"
  >
    <div class="form__group form__group--text">
      <label>Username</label>
      <input v-model="userName" class="form-control" type="text" />
    </div>
    <div class="form__group form__group--text">
      <label>Password</label>
      <input v-model="userPassword" class="form-control" type="password" />
    </div>
    <div class="form__group form__group--button">
      <button @click.prevent="sendForm">Log in</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore()

const userName = ref("");
const userPassword = ref("");

const processForm = () => {
  console.dir("process"); //eslint-disable-line
};

const sendForm = async () => {
  const user = {
    username: userName.value,
    password: userPassword.value,
  }

  const message = await authStore.authenticateUser(user);

  if (message) {
    alert(message);
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_form";
</style>
