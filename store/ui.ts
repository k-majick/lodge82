import { defineStore } from "pinia";
// import debounce from "lodash.debounce";

interface IAuthState {
  flashMessage: null | string;
}

export const useUiStore = defineStore({
  id: "ui-store",
  state: (): IAuthState => ({
    flashMessage: null,
  }),
  actions: {
    async showFlashMessage(txt: string, timeout = 5000) {
      if (this.flashMessage !== txt) {
        this.flashMessage = txt;
      }

      setTimeout(() => this.resetFlashMessage(), timeout);
    },

    async resetFlashMessage() {
      this.flashMessage = null;
    },
  },
  getters: {
    currentFlashMessage: (state) => state.flashMessage,
  },
});
