<script setup lang="ts">
const product = useProductStore();
</script>

<template>
    <button @click="product.favoritesOpened = true" class="cart p-overlay-badge">
        <i class="icon_favorite_border icon"></i>
        <Badge
            class="badge"
            v-show="product.favorites.length"
            :value="product.favorites.length"
            severity="danger"
        ></Badge>
    </button>
    <Dialog v-model:visible="product.favoritesOpened" modal dismissableMask header="Избранное">
        <div class="empty-cart" v-show="!product.favorites.length">
            <span class="icon_favorite_border empty-cart__icon"></span>
            <p class="empty-cart__text">В избранном пока нет товаров. Добавьте что-нибудь! :)</p>
        </div>
        <div class="cards">
            <ProductCard favoritesMode v-for="item in product.favorites" :item="item" :key="item.id" class="card" />
        </div>
    </Dialog>
</template>

<style scoped lang="scss">
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
