<script setup lang="ts">
const route = useRoute();
const order = useOrderStore();

order.getOrder(Number(route.params.id));
</script>

<template>
    <div>
        <template v-if="order.single">
            <Title>Заказ #{{ 10000 + order.single.id }}</Title>
            <h1 v-if="order.single.id">Заказ #{{ 10000 + order.single.id }}</h1>
            <p>Статус: {{ order.single.status }}</p>
            <p>Заказ создан: {{ new Date(order.single.created_at).toLocaleString("ru-RU") }}</p>
            <p>Последнее изменение статуса: {{ new Date(order.single.updated_at).toLocaleString("ru-RU") }}</p>

            <h3>Контактные данные</h3>
            <p>Имя: {{ order.single.name }}</p>
            <p>Телефон: {{ order.single.phone }}</p>
            <p>Эдектронная почта: {{ order.single.email }}</p>
            <p v-show="order.single.address">Адрес: {{ order.single.address }}</p>
            <p v-show="order.single.comment">Комментарий: {{ order.single.comment }}</p>

            <h3>Список товаров</h3>

            <div class="list">
                <div v-for="product in order.single.products" class="product">
                    <NuxtLink @click="$emit('close')" :to="`/product/${product.slug}`" class="product__image-link">
                        <img class="product__image" :src="product.image" :alt="product.name" />
                    </NuxtLink>

                    <strong class="product__title">
                        <NuxtLink @click="$emit('close')" :to="`/product/${product.slug}`" class="product__link"
                            >{{ product.name }}
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

                <hr />
                <div class="cart-footer">
                    <div class="cart-footer__summary">
                        <!-- <strong class="green"> Всего: {{ totalCount }} шт. </strong> -->
                        <strong class="green"
                            >Итоговая сумма: {{ order.single.total.toLocaleString("ru-RU") }} р.</strong
                        >
                    </div>
                </div>
            </div>
        </template>
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
.list {
    max-width: 25rem;
}
.product {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
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
