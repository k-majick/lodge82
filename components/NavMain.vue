<template>
  <nav class="nav nav--main" :class="{ open: isNavOpen, mini: isNavMini }">
    <button class="nav__btn material-icons" @click="toggleNavOpen">
      <span v-if="isNavOpen" class="nav__icon material-icons">menu_open</span>
      <span v-else class="nav__icon material-icons">menu</span>
    </button>
    <button class="nav__btn material-icons" @click="toggleNavMini">
      <span v-if="isNavMini" class="nav__icon material-icons"
        >chevron_right</span
      >
      <span v-else class="nav__icon material-icons">chevron_left</span>
    </button>
    <ul class="nav__items">
      <li class="nav__item">
        <button class="nav__btn">
          <span class="nav__icon material-icons">circle</span>
          <span class="nav__icon--text">{{ locale }}</span>
        </button>
        <ul class="nav__submenu nav__submenu--locales">
          <li
            v-for="(l, index) in availableLocales"
            :key="index"
            class="nav__item"
            @click="switchLocale(l.code as string)"
          >
            <span class="nav__link">{{ l.code }}</span>
          </li>
        </ul>
      </li>
      <li class="nav__item">
        <button class="nav__btn">
          <span class="nav__icon material-icons">account_circle</span>
        </button>
        <ul class="nav__submenu">
          <li v-if="!isLogged ? true : false" class="nav__item">
            <nuxt-link to="login" class="nav__link">
              <span class="nav__icon material-icons">login</span>
              <span class="nav__text">{{ $t('pages.login.title') }}</span>
            </nuxt-link>
          </li>
          <li v-if="!isLogged ? true : false" class="nav__item">
            <nuxt-link to="register" class="nav__link">
              <span class="nav__icon material-icons">assignment_turned_in</span>
              <span class="nav__text">{{ $t('pages.register.title') }}</span>
            </nuxt-link>
          </li>
          <li v-if="isLogged ? true : false" class="nav__item">
            <nuxt-link to="account" class="nav__link">
              <span class="nav__icon material-icons">assignment</span>
              <span class="nav__text">{{ $t('pages.account.title') }}</span>
            </nuxt-link>
          </li>
          <li v-if="isLogged ? true : false" class="nav__item">
            <button class="nav__link" @click="logout">
              <span class="nav__icon material-icons">logout</span>
              <span class="nav__text">{{ $t('pages.logout.title') }}</span>
            </button>
          </li>
        </ul>
        <span v-if="isLogged" class="nav__item--status material-icons">
          check
        </span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useUiStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';

import { useI18n } from 'vue-i18n';
import { ILocale, locales } from '@/composables/i18n';

const route = useRoute();
const router = useRouter();

const uiStore = useUiStore();
const authStore = useAuthStore();

const isLogged = ref(!!authStore.currentUser);
const isNavOpen = ref(uiStore.isNavOpen);
const isNavMini = ref(uiStore.isNavMini);

const logout = () => {
  authStore.setUser(null, null);
  uiStore.showFlashMessage('You have been logged out');
};

const toggleNavOpen = () => uiStore.toggleNavOpen();
const toggleNavMini = () => uiStore.toggleNavMini();

const { locale } = useI18n({ useScope: 'global' });

const setAvailableLocales = () => locales.filter(l => l.code !== locale.value);

const availableLocales = ref<ILocale[]>(setAvailableLocales());

const switchLocale = (l: string) => {
  locale.value = l;
  uiStore.setLocale(l);
  localStorage.setItem('user-locale', l);
  availableLocales.value = setAvailableLocales();
  setRouteParam(l);
};

const setRouteParam = (locale: string) => {
  const pageSlug = route.path.split('/').pop();

  router.replace({
    path: `/${locale}/${pageSlug}`,
  });
};

switchLocale(route.params.locale as string);

watch(
  () => authStore.currentUser,
  () => (isLogged.value = !!authStore.currentUser),
);

watch(
  () => uiStore.isNavOpen,
  () => (isNavOpen.value = uiStore.isNavOpen),
);

watch(
  () => uiStore.isNavMini,
  () => (isNavMini.value = uiStore.isNavMini),
);
</script>

<style lang="scss" scoped>
@import './assets/scss/components/_nav';
</style>
