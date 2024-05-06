<script setup lang="ts">
const cart = useCartStore();
onMounted(() => {
    cart.init();
});
</script>

<template>
    <button @click="cart.opened = true" aria-label="Корзина" class="cart">
        <span class="icon_shopping_cart_outline icon"></span>
        <BadgeCounter :count="cart.totalCount" />
    </button>
    <Dialog v-model:visible="cart.opened" modal dismissableMask header="Корзиночка" :style="{ width: '30rem' }">
        <LazyProductCart v-if="cart.opened" />
    </Dialog>
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
    border: none;
    height: 2.5rem;
    width: 2.5rem;
    cursor: pointer;
}
.icon {
    font-size: 1.8rem;
    user-select: none;
    line-height: 80%;
    color: black;
}
</style>
