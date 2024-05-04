<script setup lang="ts">
const product = useProductStore();
</script>

<template>
    <button @click="product.favoritesOpened = true" class="cart">
        <i class="icon_favorite_border icon"></i>
        <BadgeCounter :count="product.favorites.length" />
    </button>
    <Dialog v-model:visible="product.favoritesOpened" modal dismissableMask header="Избранное">
        <LazyProductFavorite v-if="product.favoritesOpened" />
    </Dialog>
</template>

<style scoped lang="scss">
.cart {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    // background: #9effc9;
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
