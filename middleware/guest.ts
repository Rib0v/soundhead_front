export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) return;

    if (checkLocalToken()) {
        return navigateTo("/personal");
    }
});
