<script setup lang="ts">
const product = useProductStore();
</script>

<template>
    <NuxtLink to="/product/compare" class="link">
        <span class="cart p-overlay-badge">
            <span class="icon_leaderboard icon"></span>
            <Badge
                class="badge"
                v-show="product.compared.length"
                :value="product.compared.length"
                severity="danger"
            ></Badge>
        </span>
    </NuxtLink>
</template>

<style scoped>
.badge {
    font-size: 0.6rem;
    min-width: 0;
    height: auto;
    line-height: 0.6rem;
    padding: 0.25rem 0.35rem;
    transform: translate(20%, -40%);
    user-select: none;
}
.cart {
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
