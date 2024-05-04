<script setup lang="ts">
const product = useProductStore();

useRouter().beforeEach((to, from, next) => {
    product.closeFavorites();
    next();
});
</script>

<template>
    <div class="empty-cart" v-show="!product.favorites.length">
        <span class="icon_favorite_border empty-cart__icon"></span>
        <p class="empty-cart__text">В избранном пока нет товаров. Добавьте что-нибудь! :)</p>
    </div>
    <div class="cards">
        <ProductCard favoritesMode v-for="item in product.favorites" :item="item" :key="item.id" class="card" />
    </div>
</template>

<style scoped lang="scss">
.cards {
    display: grid;
    gap: 1rem;
    width: 260px;

    @media (min-width: 430px) {
        grid-template-columns: repeat(auto-fit, 11rem);
        width: 100%;
        max-width: 30rem;
    }

    @media (min-width: 550px) {
        grid-template-columns: repeat(auto-fit, 14rem);
        // max-width: 30rem;
    }
}
.empty-cart {
    display: grid;
    max-width: 14rem;
    margin: 0 auto;

    &__icon {
        color: #e1f0e4;
        text-align: center;
        font-size: 14rem;
        line-height: 80%;
    }

    &__text {
        margin-top: 0;
        color: gray;
        text-align: center;
        text-wrap: balance;
    }
}
</style>
