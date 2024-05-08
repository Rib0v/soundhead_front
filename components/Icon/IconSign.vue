<script setup lang="ts">
const auth = useAuthStore();
</script>

<template>
    <NuxtLink v-if="$route.name === 'login'" to="/login" aria-label="Авторизация" class="cart link" no-prefetch>
        <span class="icon_login icon"></span>
    </NuxtLink>
    <a v-else href="/login" @click.prevent="auth.dialogOpen(0)" class="cart link">
        <span class="icon_login icon"></span>
    </a>
</template>

<style scoped>
.cart {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    /* background: #9effc9; */
    background: rgba(0, 255, 113, 0.5);
    border-radius: 50%;
    border: none;
    height: 2.5rem;
    width: 2.5rem;
    cursor: pointer;
}
.icon {
    font-size: 2rem;
    transform: translateX(-10%);
    user-select: none;
    line-height: 80%;
    color: black;
}
.link {
    color: inherit;
    text-decoration: none;
}
</style>
