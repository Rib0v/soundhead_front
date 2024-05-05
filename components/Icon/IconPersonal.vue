<script setup lang="ts">
const auth = useAuthStore();
</script>

<template>
    <NuxtLink to="/personal" aria-label="Личный кабинет" class="cart link" no-prefetch>
        <span class="icon_person_outline icon"></span>
    </NuxtLink>
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
    font-size: 1.9rem;
    user-select: none;
    line-height: 100%;
    color: black;
}
.link {
    color: inherit;
    text-decoration: none;
}
</style>
