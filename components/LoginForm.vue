<template>
  <form class="form form--login" @submit.prevent="sendForm">
    <div class="form__group form__group--text">
      <label>Username</label>
      <input v-model="userName" class="form-control" type="text" />
    </div>
    <div class="form__group form__group--text">
      <label>Password</label>
      <input v-model="userPassword" class="form-control" type="password" />
    </div>
    <div class="form__group form__group--button">
      <button type="submit" ref="submitBtn">Log in</button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { useUiStore } from "@/store/ui";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const uiStore = useUiStore();
const authStore = useAuthStore();

const userName = ref("");
const userPassword = ref("");
const submitBtn: Ref<any> = ref<HTMLInputElement | undefined>()

const sendForm = async () => {
  submitBtn.value.disabled = true;

  const user = {
    username: userName.value,
    password: userPassword.value,
  };

  const res = await authStore.authenticateUser(user);

  uiStore.showFlashMessage(res.msg);
  
  if (res.success) {
    router.push("/");
  } else {
    resetForm();
    setTimeout(() => submitBtn.value.disabled = false, 1000);
  }
};

const resetForm = () => {
  userPassword.value = "";
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_form";
</style>
