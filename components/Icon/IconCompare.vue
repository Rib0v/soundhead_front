<script setup lang="ts">
const product = useProductStore();
</script>

<template>
    <NuxtLink to="/product/compare" aria-label="Сравнение товаров" class="link" no-prefetch>
        <span class="cart">
            <span class="icon_leaderboard icon"></span>
            <BadgeCounter :count="product.compared.length" />
        </span>
    </NuxtLink>
</template>

<style scoped>
.cart {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    /* background: #9effc9; */
    background: rgba(0, 255, 113, 0.5);
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    cursor: pointer;
}
.icon {
    font-size: 1.8rem;
    user-select: none;
    line-height: 120%;
    color: black;
}
.link {
    color: inherit;
    text-decoration: none;
}
</style>
