import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  meta: {
    title: "极客团",
  },
  dev: true,
  buildModules: ["@vueuse/core/nuxt", "@pinia/nuxt"],
  css: [
    "assets/scss/index.scss",
    "assets/css/main.css",
    "assets/css/reset.css",
  ],
  privateRuntimeConfig: {
    API_BASE: "http://localhost:9998",
  },
  components: [
    "~/components/",
    // {
    //   path: 'node_modules/element-plus/lib/components/*/index.js',
    // }
  ],
  vite: {
    logLevel: "info",
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:9998",
          changeOrigin: true,
        },
      },
    },
  },
});
