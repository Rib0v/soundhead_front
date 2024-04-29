// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: ["@pinia/nuxt", "nuxt-primevue"],

    primevue: {
        options: { ripple: true },
    },

    app: {
        pageTransition: { name: "page", mode: "out-in" },

        head: {
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        },
    },

    routeRules: {
        "/": { prerender: true },
        "/catalog": { swr: true },
        // '/product/**': { swr : 60 * 60 * 4 },
    },

    /**
     * В dev-режиме значения берутся из файла .env
     */
    runtimeConfig: {
        // Доступны на стороне клиента
        public: {
            apiBase: "http://localhost",
            apiBaseLocal: "http://localhost",
            apiPort: "80",
            productsPerPage: 24,
            searchThrottleInterval: 500,
        },
    },
});
