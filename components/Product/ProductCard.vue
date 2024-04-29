<script setup lang="ts">
const cart = useCartStore();
const product = useProductStore();

const props = defineProps<{
    item: Product;
    favoritesMode?: boolean;
}>();

// TODO если будет подгрузка при скролле и много товаров на странице,
// то вероятно нужно будет сделать подсчет порциями, только для загружаемых
// и добавлять true вручную, при добавлении товара в корзину
const isAdded = computed(() => {
    return cart.cartList.some((item) => item.id === props.item.id);
});
const isAddedToCompared = computed(() => {
    return product.compared.includes(props.item.id);
});
const isAddedToFavorites = computed(() => {
    return product.favorites.some((item) => item.id === props.item.id);
});
</script>

<template>
    <div class="card">
        <NuxtLink :to="`/product/${item.slug}`" class="card__image-wrapper" @click="product.closeFavorites">
            <img :src="item.image" :alt="item.name" loading="lazy" class="card__image" />
        </NuxtLink>

        <h4 class="card__title">
            <NuxtLink :to="`/product/${item.slug}`" class="card__link" @click="product.closeFavorites">{{
                item.name
            }}</NuxtLink>
        </h4>
        <p class="card__price">
            <NuxtLink :to="`/product/${item.slug}`" class="card__link" @click="product.closeFavorites">
                {{ item.price.toLocaleString("ru-RU") }} ₽
            </NuxtLink>
        </p>
        <p class="card__status">
            <NuxtLink :to="`/product/${item.slug}`" class="card__link" @click="product.closeFavorites"
                >В наличии</NuxtLink
            >
        </p>
        <Button
            @click="cart.addProduct(item)"
            :raised="!isAdded"
            class="card__add-button"
            :class="{ 'card__add-button_added': isAdded }"
        >
            <i v-if="!isAdded" class="card__add-button-icon icon_shopping_cart_filled"></i>
            <i v-else class="card__add-button-icon icon_add_shopping_cart"></i>
        </Button>
        <button
            v-if="!favoritesMode"
            @click="product.addToFavorites(item)"
            class="card__favorites-button"
            :class="{ 'card__favorites-button_added': isAddedToFavorites }"
        >
            <i class="card__favorites-button-icon icon_favorite_border"></i>
        </button>
        <button @click="product.removeFromFavorites(item.id)" v-else class="card__favorites-button">
            <i class="card__favorites-button-icon icon_close"></i>
        </button>
        <button
            @click="product.addToCompared(item.id)"
            class="card__favorites-button card__compare-button"
            :class="{ 'card__favorites-button_added': isAddedToCompared }"
        >
            <i class="card__favorites-button-icon icon_leaderboard"></i>
        </button>
    </div>
</template>

<style scoped lang="scss">
.card {
    position: relative;
    background: white;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    gap: 0.25rem;
    padding-bottom: 1rem;
    box-shadow: -2px 2px 6px 0px rgba(0, 0, 0, 0.15);
    transition: 150ms;
    overflow: hidden;

    @media (min-width: 450px) {
        gap: 0.5rem;
    }

    @media (hover: hover) {
        &:hover {
            // box-shadow: -4px 4px 6px 4px rgba(12, 0, 80, 0.15);
            // transform: scale(1.03);
            box-shadow: -3px 6px 6px 0px rgba(12, 0, 80, 0.15);
            transform: translate(0, -4px);
            // cursor: pointer;

            .card__favorites-button {
                opacity: 1;
                // transition: 300ms ease-in;
                transform: translateX(0);
            }
        }
    }

    &__link {
        text-decoration: none;
        color: inherit;
    }

    &__image-wrapper {
        position: relative;
        padding-top: 100%;
        width: 100%;
        grid-column: span 2;
        // margin-bottom: 0.5rem;
    }

    &__image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        // filter: brightness(0.7) contrast(1.03);
        //filter: contrast(1.2);
        //opacity: 0.5;
    }

    &__title {
        grid-column: span 2;
        // margin-bottom: 0.5rem;
        margin: 0 1rem;
        align-self: center;
    }

    &__price {
        margin: 0;
        margin-left: 1rem;
        font-weight: bold;
    }

    &__status {
        position: relative;
        margin: 0;
        margin-left: 1rem;
        color: #159400;
        font-size: 0.75rem;

        &::before {
            // position: absolute;
            content: "";
            display: inline-block;
            background: #159400;
            width: 0.5rem;
            height: 0.5rem;
            margin-right: 0.4rem;
            border-radius: 50%;
            // transform: translateY(-0.05rem);
        }
    }
    &__add-button {
        // display: block;
        grid-column-start: 2;
        grid-row: 3 / 5;
        margin-right: 1rem;
        width: 3rem;
        height: 3rem;
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        // background: #007c1b;
        // border: none;
        // border-radius: 0.5rem;
        // cursor: pointer;
        // transition: 100ms;

        // &:hover {
        //     background: #008f1f;
        // }

        @media (min-width: 375px) {
            width: 2.5rem;
            height: 2.5rem;
        }

        @media (min-width: 450px) {
            width: 3rem;
            height: 3rem;
        }

        &_added {
            background: #5ed7ae;
            border: none;

            &:hover {
                background: #49b691;
            }
        }
    }
    &__add-button-icon {
        display: inline-block;
        font-size: 1.7rem;
        color: white;
        line-height: 80%;

        @media (min-width: 375px) {
            font-size: 1.5rem;
        }

        @media (min-width: 450px) {
            font-size: 1.7rem;
        }
    }

    &__favorites-button {
        position: absolute;
        top: 0.5rem;
        right: 0.25rem;
        display: block;
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        background: transparent;
        cursor: pointer;
        border: none;
        color: #aaa;
        padding: 0;
        transition: 400ms;
        overflow: hidden;

        @media (hover: hover) and (pointer: fine) {
            opacity: 0;
            transform: translateX(3rem);
        }

        @media (hover: hover) {
            &:hover {
                color: rebeccapurple;
                background: #d8fff2;
            }
        }

        &_added {
            // background: #5ed7ae;
            color: #49b691 !important;
            border: none;
            // border: 1px solid #5ed7ae;

            // &:hover {
            //     background: #49b691;
            //     // border: 1px solid #5ed7ae;
            // }
        }
    }
    &__favorites-button-icon {
        display: inline-block;
        font-size: 1.5rem;
        line-height: 80%;
    }

    &__compare-button {
        top: 2.5rem;
    }
}
</style>
