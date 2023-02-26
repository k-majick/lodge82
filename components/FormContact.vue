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
      :class="{ 'form__group--error': v$.message.$errors.length }"
    >
      <label class="form__label">{{ $t("form.message") }}</label>
      <textarea v-model="v$.message.$model" class="form__input" rows="10" />
      <span
        v-for="error of v$.message.$errors"
        :key="error.$uid"
        class="form__alert"
        >{{ error.$message }}</span
      >
    </div>
    <div class="form__group form__group--button">
      <button ref="submitBtn" type="submit" class="main__btn" @click="sendForm">
        {{ $t("form.actionSend") }}
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useUiStore } from "@/store/ui";
import useVuelidate from "@vuelidate/core";
import {
  email,
  minLength,
  maxLength,
  required,
  helpers,
} from "@vuelidate/validators";

const uiStore = useUiStore();
const { t } = useI18n();

const alphaDiacritic = helpers.regex(/^[a-zA-ZÀ-ž\s]*$/);
const submitBtn: Ref<any> = ref<HTMLInputElement | undefined>();

const state = ref({
  name: "",
  email: "",
  message: "",
});

const rules = {
  name: {
    required: helpers.withMessage(t("validation.nameRequired"), required),
    minLength: helpers.withMessage(() => t("validation.nameMin"), minLength(3)),
    maxLength: helpers.withMessage(
      () => t("validation.nameMax"),
      maxLength(30),
    ),
    alphaDiacritic: helpers.withMessage(
      () => t("validation.nameFormat"),
      alphaDiacritic,
    ),
  },
  email: {
    required: helpers.withMessage(t("validation.emailRequired"), required),
    maxLength: helpers.withMessage(
      () => t("validation.emailMax"),
      maxLength(50),
    ),
    email: helpers.withMessage(t("validation.emailInvalid"), email),
  },
  message: {
    required: helpers.withMessage(t("validation.messageRequired"), required),
    messageMin: helpers.withMessage(
      () => t("validation.messageMin"),
      minLength(1),
    ),
    messageMax: helpers.withMessage(
      t("validation.messageMax"),
      maxLength(1000),
    ),
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
  submitBtn.value.innerHTML = t("form.actionSending");

  const fd = {
    name: v$.value.name.$model,
    email: v$.value.email.$model,
    message: v$.value.message.$model,
  };

  const res = await uiStore.sendEmail(fd);

  uiStore.showFlashMessage(t(res.msg));
  resetForm();
  setTimeout(() => (submitBtn.value.disabled = false), 5000);
};

const resetForm = () => {
  submitBtn.value.innerHTML = t("form.actionSend");
  v$.value.$reset();
  state.value = {
    name: "",
    email: "",
    message: "",
  };
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
