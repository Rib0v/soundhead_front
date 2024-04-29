<script setup lang="ts">
const cartStore = useCartStore();
</script>

<template>
    <div class="productlist">
        <div v-for="product in cartStore.cartList" class="product">
            <NuxtLink @click="$emit('close')" :to="`/product/${product.slug}`" class="product__image-link">
                <img class="product__image" :src="product.image" :alt="product.name" />
            </NuxtLink>

            <strong class="product__title">
                <NuxtLink @click="$emit('close')" :to="`/product/${product.slug}`" class="product__link">
                    {{ product.name }}
                </NuxtLink>
            </strong>

            <div class="product__price">
                <span class="gray">{{ product.price.toLocaleString("ru-RU") }} р.</span>
                <i class="icon_close product__multiply gray"></i>
                <span>{{ product.count }} шт.</span>
                <span class="gray">=</span>
                <span>{{ (product.count * product.price).toLocaleString("ru-RU") }} р.</span>
            </div>
        </div>
    </div>

    <hr />
    <div class="cart-footer">
        <div class="cart-footer__summary">
            <strong class="green"> Всего: {{ cartStore.totalCount }} шт. </strong>
            <strong class="green">На сумму: {{ cartStore.totalPrice.toLocaleString("ru-RU") }} р.</strong>
        </div>
        <Button
            @click="cartStore.opened = true"
            :disabled="cartStore.totalCount < 1"
            label="Редактировать"
            class="cart-footer__button"
        />
    </div>
</template>

<style scoped lang="scss">
hr {
    border: 0;
    border-bottom: 1px solid #ccc;
}
.gray {
    color: #aaa;
}

.green {
    color: #008c4b;
}

.productlist {
    display: grid;
    gap: 1rem;

    @media (min-width: 370px) {
        gap: 0.5rem;
    }
}

.product {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    // justify-items: center;
    gap: 0.75rem 0rem;

    @media (min-width: 400px) {
        gap: 0.75rem 1rem;
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
        grid-row: span 2; /* этот убрать потом */
    }

    &__title {
        align-self: self-end;
        // text-align: center;
    }

    &__price {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.5rem;
    }

    &__multiply {
        font-size: 1rem;
        transform: translateY(10%);
    }

    &__link {
        text-decoration: none;
        color: black;
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
