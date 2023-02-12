<template>
  <form class="form form--login" @submit.prevent="sendForm">
    <div class="form__group form__group--text">
      <label class="form__label">{{ $t('form.username') }}</label>
      <input v-model="userName" class="form__input" type="text" />
    </div>
    <div class="form__group form__group--text">
      <label class="form__label">{{ $t('form.password') }}</label>
      <input v-model="userPassword" class="form__input" type="password" />
    </div>
    <div class="form__group form__group--button">
      <button ref="submitBtn" type="submit" class="main__btn">
        {{ $t('form.loginAction') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUiStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';

const router = useRouter();
const uiStore = useUiStore();
const authStore = useAuthStore();
const { t } = useI18n();

const userName = ref('');
const userPassword = ref('');
const submitBtn: Ref<any> = ref<HTMLInputElement | undefined>();

const sendForm = async () => {
  submitBtn.value.disabled = true;

  const user = {
    username: userName.value,
    password: userPassword.value,
  };

  const res = await authStore.loginUser(user);

  uiStore.showFlashMessage(t(res.msg));

  if (res.success) {
    router.push('/');
  } else {
    resetForm();
    setTimeout(() => (submitBtn.value.disabled = false), 5000);
  }
};

const resetForm = () => {
  userPassword.value = '';
};
</script>

<style lang="scss" scoped>
@import './assets/scss/components/_form';
</style>
