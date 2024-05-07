<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

const cartStore = useCartStore();
const { cartList } = storeToRefs(cartStore);
const productStore = useProductStore();

const {
    data: product,
    pending,
    error,
} = useLazyFetch<{ data: ProductDetail }>(addApiBase(`products/${useRoute().params.slug}`));

if (error?.value?.statusCode === 404) {
    navigateTo("/404");
}

const isAdded = computed(() => {
    return cartList.value.find((item) => item.id == product?.value?.data?.id);
});

watch(pending, () => {
    if (pending.value) {
        productStore.loading = true;
    } else {
        productStore.loading = false;
    }
});
</script>

<template>
    <div>
        <template v-if="product?.data">
            <Title>{{ product?.data?.name }}</Title>

            <p class="backlink">
                <NuxtLink to="/catalog"><span>ᐊ</span> Каталог</NuxtLink>
            </p>

            <div class="product">
                <div class="product__header">
                    <div class="product__gallery">
                        <LazyProductGallery :name="product?.data?.name || ''" :photos="product?.data?.photos || []" />
                    </div>
                    <div class="product__right-wrapper">
                        <h1>{{ product?.data?.name }}</h1>
                        <p class="product__id">Артикул товара: 153245{{ product?.data?.id }}</p>
                        <p class="product__status">В наличии</p>
                        <h2>{{ (product?.data?.price || 0).toLocaleString("ru-RU") }} р</h2>
                        <Button
                            @click="cartStore.addProduct(product?.data)"
                            :raised="!isAdded"
                            class="product__add-button"
                            :class="{ 'product__add-button_added': isAdded }"
                        >
                            <template v-if="!isAdded"
                                ><i class="product__add-button-icon icon_shopping_cart_filled"></i>В корзину</template
                            >
                            <template v-else
                                ><i class="product__add-button-icon icon_add_shopping_cart"></i>В корзине</template
                            >
                        </Button>
                    </div>
                </div>
                <TabView id="product-description-tabview">
                    <TabPanel header="Описание">
                        <p class="product__description">{{ product?.data.description }}</p>
                    </TabPanel>
                    <TabPanel header="Характеристики">
                        <table class="product__attributes">
                            <thead>
                                <tr>
                                    <th>Характеристика</th>
                                    <th>Значение</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in product?.data.attributes || []">
                                    <td class="attribute">
                                        <span>{{ item.attribute_name }}</span>
                                    </td>
                                    <td class="value">{{ item.value_name }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </TabPanel>
                </TabView>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.backlink {
    margin: 1.2rem 0.2rem 0.5rem;

    @media (min-width: 768px) {
        display: none;
    }

    span {
        position: relative;
        bottom: 0.05rem;
        font-size: 0.8rem;
    }

    a {
        color: gray;
        text-decoration: none;
        border-radius: 1rem;
        border: 1px solid #ccc;
        padding: 0.25rem 0.5rem;
    }
}

h1 {
    font-size: 1.5rem;
    margin-top: 0.5rem;

    @media (min-width: 940px) {
        font-size: 1.75rem;
    }
}

.product {
    margin: 0rem auto;
    // margin-top: 3rem;
    max-width: 1200px;

    &__header {
        display: flex;
        flex-direction: column-reverse;
        gap: 2rem;

        @media (min-width: 630px) {
            display: grid;
            grid-template-columns: minmax(auto, 70rem) 16rem;
        }

        @media (min-width: 768px) {
            grid-template-columns: minmax(auto, 70rem) 20rem;
        }

        @media (min-width: 850px) {
            gap: 4rem;
        }
    }

    &__gallery {
        width: 100%;
        overflow-x: hidden;
        height: 350px;

        @media (min-width: 630px) {
            height: 300px;
        }

        @media (min-width: 680px) {
            height: 370px;
        }

        @media (min-width: 940px) {
            height: 400px;
        }

        @media (min-width: 940px) {
            height: 600px;
        }
    }

    &__right-wrapper {
        // width: 100%;
        margin: 0 1.5rem;

        @media (min-width: 630px) {
            margin: 0;
        }
    }

    &__id {
        color: gray;
        margin-bottom: 1.5rem;
    }

    &__status {
        position: relative;
        color: #159400;
        font-size: 0.75rem;

        &::before {
            content: "";
            display: inline-block;
            background: #159400;
            width: 0.5rem;
            height: 0.5rem;
            margin-right: 0.4rem;
            border-radius: 50%;
        }
    }

    &__add-button {
        height: 4rem;
        border: none;
        &_added {
            background: #5ed7ae;

            &:hover {
                background: #49b691;
            }
        }
    }

    &__add-button-icon {
        font-size: 1.5rem;
        transform: translateX(-12%);
        margin-right: 0.25rem;
        max-width: 1.5rem;
        line-height: 100%;
    }

    &__description,
    &__attributes {
        max-width: 800px;
    }
}

th,
td {
    // padding: 0.25rem 1.5rem;
    text-align: left;

    &:first-child {
        padding-left: 0;
        padding-right: 0.5rem;
        width: 100%;
    }
}

.attribute {
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        border-bottom: 2px dotted black;
    }

    span {
        position: relative;
        background: white;
        padding-right: 0.5rem;
        z-index: 2;
    }
}

.value {
    word-break: break-all;

    @media (min-width: 340px) {
        word-break: normal;
    }

    @media (min-width: 500px) {
        padding-left: 0.5rem;
    }
}
</style>
