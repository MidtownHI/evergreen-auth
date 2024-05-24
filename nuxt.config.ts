// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: { port: 3000, host: "0.0.0.0" },
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui"]
})