<template>
  <form
    class="form form--login"
    @submit.prevent="processForm"
    @change="processForm"
  >
    <div
      class="form__group form__group--text"
      :class="{ 'form__group--error': v$.name.$errors.length }"
    >
      <label class="form__label">{{ $t("form.name") }}</label>
      <input v-model="v$.name.$model" class="form__input" type="text" />
      <span
        v-for="error of v$.name.$errors"
        :key="error.$uid"
        class="form__alert"
        >{{ error.$message }}</span
      >
    </div>
    <div
      class="form__group form__group--text"
      :class="{ 'form__group--error': v$.username.$errors.length }"
    >
      <label class="form__label">{{ $t("form.username") }}</label>
      <input v-model="v$.username.$model" class="form__input" type="text" />
      <span
        v-for="error of v$.username.$errors"
        :key="error.$uid"
        class="form__alert"
        >{{ error.$message }}</span
      >
    </div>
    <div
      class="form__group form__group--text"
      :class="{ 'form__group--error': v$.email.$errors.length }"
    >
      <label class="form__label">{{ $t("form.email") }}</label>
      <input v-model="v$.email.$model" class="form__input" type="email" />
      <span
        v-for="error of v$.email.$errors"
        :key="error.$uid"
        class="form__alert"
        >{{ error.$message }}</span
      >
    </div>
    <div
      class="form__group form__group--text"
      :class="{ 'form__group--error': v$.password.$errors.length }"
    >
      <label class="form__label">{{ $t("form.password") }}</label>
      <input v-model="v$.password.$model" class="form__input" type="password" />
      <span
        v-for="error of v$.password.$errors"
        :key="error.$uid"
        class="form__alert"
        >{{ error.$message }}</span
      >
    </div>
    <div class="form__group form__group--button">
      <button ref="submitBtn" type="submit" class="main__btn" @click="sendForm">
        {{ $t("form.registerAction") }}
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useUiStore } from "@/store/ui";
import { useAuthStore } from "@/store/auth";
import useVuelidate from "@vuelidate/core";
import {
  email,
  minLength,
  maxLength,
  required,
  helpers,
} from "@vuelidate/validators";

const router = useRouter();
const uiStore = useUiStore();
const authStore = useAuthStore();
const { t } = useI18n();

const alphaDiacritic = helpers.regex(/^[a-zA-ZÀ-ž\s]*$/);
const submitBtn: Ref<any> = ref<HTMLInputElement | undefined>();

const state = ref({
  name: "",
  username: "",
  email: "",
  password: "",
});

const rules = {
  name: {
    required: helpers.withMessage("Name required", required),
    minLength: helpers.withMessage(() => "Enter min. 3 chars", minLength(3)),
    maxLength: helpers.withMessage(() => "Enter max. 30 chars", maxLength(30)),
    alphaDiacritic: helpers.withMessage(
      () => "Invalid name format",
      alphaDiacritic,
    ),
  },
  username: {
    required: helpers.withMessage("Username required", required),
    minLength: helpers.withMessage(() => "Enter min. 3 chars", minLength(3)),
    maxLength: helpers.withMessage(() => "Enter max. 30 chars", maxLength(30)),
    alphaDiacritic: helpers.withMessage(
      () => "Invalid username format",
      alphaDiacritic,
    ),
  },
  email: {
    required: helpers.withMessage("E-mail required", required),
    maxLength: helpers.withMessage(() => "Enter max. 50 chars", maxLength(50)),
    email: helpers.withMessage("Enter valid e-mail", email),
  },
  password: {
    required: helpers.withMessage("Password required", required),
    minLength: helpers.withMessage(() => "Enter min. 3 chars", minLength(3)),
    maxLength: helpers.withMessage(() => "Enter max. 20 chars", maxLength(20)),
  },
};

const v$ = useVuelidate(rules, state);

const processForm = () => {
  v$.value.$touch();
  v$.value.$invalid === true
    ? (submitBtn.value.disabled = true)
    : (submitBtn.value.disabled = false);
};

const sendForm = async () => {
  if (v$.value.$invalid === true) {
    return;
  }

  submitBtn.value.disabled = true;

  const user = {
    name: v$.value.name.$model,
    username: v$.value.username.$model,
    email: v$.value.email.$model,
    password: v$.value.password.$model,
  };

  const res = await authStore.registerUser(user);

  uiStore.showFlashMessage(t(res.msg));

  if (res.success) {
    router.push("/login");
  } else {
    setTimeout(() => (submitBtn.value.disabled = false), 5000);
  }
};

watch(
  () => v$.value.$invalid,
  () =>
    v$.value.$invalid === true
      ? (submitBtn.value.disabled = true)
      : (submitBtn.value.disabled = false),
);
</script>

<style lang="scss" scoped>
@import "./assets/scss/components/_form";
</style>
