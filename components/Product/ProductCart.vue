<script setup lang="ts">
const cart = useCartStore();
</script>

<template>
    <div class="empty-cart" v-show="cart.totalCount < 1">
        <i class="icon_grass empty-cart__icon"></i>
        <p class="empty-cart__text">В корзине пока нет товаров. Добавьте что-нибудь! :)</p>
    </div>

    <div class="productlist">
        <div v-for="product in cart.cartList" class="product">
            <button @click="cart.deleteProduct(product.id)" class="product__remove icon_close"></button>

            <NuxtLink @click="cart.close" :to="`/product/${product.slug}`" class="product__image-link">
                <img class="product__image" :src="product.image" :alt="product.name" />
            </NuxtLink>

            <strong class="product__title">
                <NuxtLink @click="cart.close" :to="`/product/${product.slug}`" class="product__link">
                    {{ product.name }}
                </NuxtLink>
            </strong>
            <div class="product__price">
                <div class="product__counter">
                    <button @click="cart.decrementProduct(product.id)" class="product__decrement">-</button>
                    <span class="product__count">{{ product.count }}</span>
                    <button @click="cart.incrementProduct(product.id)" class="product__increment">+</button>
                </div>
                <span class="product__total">{{ (product.count * product.price).toLocaleString("ru-RU") }} р.</span>
            </div>
        </div>
    </div>

    <hr />
    <div class="cart-footer">
        <div class="cart-footer__summary">
            <span>Всего: {{ cart.totalCount }} шт.</span>
            <span>На сумму: {{ cart.totalPrice.toLocaleString("ru-RU") }} р.</span>
        </div>
        <Button
            @click="
                navigateTo('/order');
                cart.close();
            "
            :disabled="cart.totalCount < 1"
            label="Оформить заказ"
            class="cart-footer__button"
        />
    </div>
</template>

<style scoped lang="scss">
hr {
    border: 0;
    border-bottom: 1px solid #ccc;
}
.empty-cart {
    display: grid;
    justify-content: center;

    &__icon {
        color: #e1f0e4;
        text-align: center;
        font-size: 17rem;
        line-height: 80%;
        transform: translateY(0.5rem);
    }

    &__text {
        margin: 0 auto 2rem;
        max-width: 15rem;
        text-align: center;
        text-wrap: balance;
        color: gray;
    }
}

.productlist {
    display: grid;
    row-gap: 1rem;
    @media (min-width: 440px) {
        row-gap: 0rem;
    }
}

.product {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: center;

    @media (min-width: 440px) {
        row-gap: 1rem;
    }

    &__remove {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        border: none;
        background: transparent;
        font-size: 1.25rem;
        color: #aaa;
        cursor: pointer;
    }

    &__image-link {
        grid-row: span 2;
    }

    &__image {
        width: 5rem;
        height: 5rem;
        object-fit: cover;
        border-radius: 0.5rem;

        @media (min-width: 440px) {
            width: 8rem;
            height: 8rem;
        }
    }

    &__title {
        align-self: self-end;
        text-align: center;
        padding-right: 2.5rem;
    }

    &__price {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        align-items: center;
    }

    &__counter {
        border: 1px solid #d3d3d3;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: -2px 2px 6px 0px rgba(34, 60, 80, 0.15);
    }

    &__decrement,
    &__increment {
        width: 1.5rem;
        border: none;
        cursor: pointer;
        height: 1.5rem;
    }

    &__link {
        text-decoration: none;
        color: black;
    }

    &__count {
        padding: 1rem 0.5rem;
        background: #c6d6e8;
        box-shadow: 0px 0px 4px 0px rgba(34, 60, 80, 0.3) inset;
    }
}

.cart-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;

    &__summary {
        display: grid;
        row-gap: 0.5rem;
        flex-grow: 1;
    }

    &__button {
        flex-grow: 2;
    }
}
</style>
