import { defineStore } from "pinia";
import { Types } from "ably";
import * as Ably from "ably/promises";

interface IUiState {
  locale: null | string;
  flashMessage: null | string;
  navOpen: boolean;
  navMini: boolean;
  ablyConnection: null | Types.RealtimePromise;
  ablyChannels: Record<string, Types.RealtimeChannelPromise>;
}

export const useUiStore = defineStore({
  id: "ui-store",
  state: (): IUiState => ({
    locale: null,
    flashMessage: null,
    navOpen: true,
    navMini: true,
    ablyConnection: null,
    ablyChannels: {},
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

    initializeAblyConnection() {
      const optionalClientId = "optionalClientId";

      this.ablyConnection = new Ably.Realtime.Promise({
        authUrl: `/.netlify/functions//ably-token-request?clientId=${optionalClientId}`,
      });
    },

    initializeAblyChannel(channelName: string) {
      this.ablyChannels[channelName] = this.ablyConnection?.channels.get(
        channelName,
      ) as Types.RealtimeChannelPromise;
      this.ablyChannels[channelName].subscribe((msg: Types.Message) => {
        // dispatch action by channel
        switch (true) {
          case channelName === "log":
            console.log(msg); // eslint-disable-line
            break;
          case channelName === "flash":
            this.showFlashMessage(msg.data.message); // eslint-disable-line
            break;
        }
      });
    },

    async sendAblyMessage(
      channelName: string,
      messageName: string,
      message: string,
    ) {
      // if no connection initialize
      if (!this.ablyConnection) {
        this.initializeAblyConnection();
      }

      // if no channel channel create and subscribe
      if (!Object.keys(this.ablyChannels).includes(channelName)) {
        this.initializeAblyChannel(channelName);
      }

      // publish message
      this.ablyChannels[channelName].publish(messageName, { message: message });
    },

    sendEmail(fd: any) {
      try {
        const res = fetch("/.netlify/functions/server/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fd),
        })
          .then(res => res.json())
          .then(data => data);

        return res;
      } catch (e) {
        console.error(e);
      }
    },
  },
  getters: {
    currentLocale: state => state.locale,
    currentFlashMessage: state => state.flashMessage,
    isNavOpen: state => state.navOpen,
    isNavMini: state => state.navMini,
  },
});
