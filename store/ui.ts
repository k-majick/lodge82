import { defineStore } from "pinia";

interface IUiState {
  locale: null | string;
  flashMessage: null | string;
  navOpen: boolean;
  navMini: boolean;
}

export const useUiStore = defineStore({
  id: "ui-store",
  state: (): IUiState => ({
    locale: null,
    flashMessage: null,
    navOpen: true,
    navMini: true,
  }),
  actions: {
    setLocale(locale: string) {
      this.locale = locale;
    },

    showFlashMessage(txt: string, timeout = 5000) {
      if (this.flashMessage !== txt) {
        this.flashMessage = txt;
      }

      setTimeout(() => this.resetFlashMessage(), timeout);
    },

    resetFlashMessage() {
      this.flashMessage = null;
    },

    toggleNavOpen() {
      this.navOpen = !this.navOpen;
    },
    toggleNavMini() {
      this.navMini = !this.navMini;
    },
  },
  getters: {
    currentLocale: state => state.locale,
    currentFlashMessage: state => state.flashMessage,
    isNavOpen: state => state.navOpen,
    isNavMini: state => state.navMini,
  },
});
