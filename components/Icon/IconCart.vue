<script setup lang="ts">
const cart = useCartStore();
onMounted(() => {
    cart.init();
});
</script>

<template>
    <button @click="cart.opened = true" class="cart p-overlay-badge">
        <span class="icon_shopping_cart_outline icon"></span>
        <Badge class="badge" v-show="cart.totalCount > 0" :value="cart.totalCount" severity="danger"></Badge>
    </button>
    <Dialog v-model:visible="cart.opened" modal dismissableMask header="Корзиночка" :style="{ width: '30rem' }">
        <ProductCart />
    </Dialog>
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
