import { defineStore } from "pinia";

interface IUiState {
  flashMessage: null | string;
  navOpen: boolean;
  navMini: boolean;
}

export const useUiStore = defineStore({
  id: "ui-store",
  state: (): IUiState => ({
    flashMessage: null,
    navOpen: true,
    navMini: true,
  }),
  actions: {
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
    currentFlashMessage: (state) => state.flashMessage,
    isNavOpen: (state) => state.navOpen,
    isNavMini: (state) => state.navMini,
  },
});
