import eslint from "vite-plugin-eslint";

export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  ssr: false,
  app: {
    head: {
      title: `${process.env.APP_NAME}`,
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Nunito:wght@200;400&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fjalla+One:wght@200;400&display=swap",
        },
      ],
    },
  },
  modules: ["@pinia/nuxt"],
  router: {
    options: {
      linkActiveClass: "active",
      linkExactActiveClass: "active",
    },
  },
  runtimeConfig: {
    apiUrl: process.env.API_URL || "http://localhost:3000",
    appName: process.env.APP_NAME,
  },
  vite: {
    plugins: [eslint()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/_variables.scss";',
        },
      },
    },
  },
  css: ["@/assets/scss/_global.scss"],
});
