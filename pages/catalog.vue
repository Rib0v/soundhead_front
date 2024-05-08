<script setup lang="ts">
const filterbarVisible = ref(false);

let page = 1;
const { productsPerPage } = useRuntimeConfig().public;
const { query } = useRoute();
const queryParams = ref<CommonObject>(query);

const { pending, data: products } = useLazyFetch<ProductList>(addApiBase("products"), {
    query: queryParams,
});
const lastPage = computed(() => products.value?.meta.last_page || 1);
const total = computed(() => products.value?.meta.total || 0);

const additionalProducts = ref<Product[]>([]);
const loadingMore = ref(false);

function changeQueryParams(query: CommonObject) {
    page = 1;
    additionalProducts.value = [];
    queryParams.value = query;
    navigateTo({ query });
}

const observerTarget = ref<HTMLInputElement | null>(null);
let intersect = false;
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            intersect = true;
            if (!loadingMore.value) loadMoreProducts();
        } else {
            intersect = false;
        }
    });

    if (observerTarget.value) {
        observer.observe(observerTarget.value);
    }
});

let loadingCounter = 1;
function getDelay() {
    const delay = loadingCounter * 120 + 200;
    if (++loadingCounter > productsPerPage) loadingCounter = 1;
    return delay;
}

async function loadMoreProducts() {
    if (page >= lastPage.value) return;

    page++;

    const waitingProductsQuantity =
        page < lastPage.value ? productsPerPage : total.value - (lastPage.value - 1) * productsPerPage;

    loadingMore.value = true;
    loadingCounter = 1;

    /**
     * Чтобы анимации появления товаров работали бесшовно, скелетон и реальная
     * карточка товара должны быть внутри одного контейнера, так как загрузка
     * может завершится прямо посреди анимации. Поэтому добавляем в массив
     * "пустые" товары, чтобы появились карточки-скелетоны, а потом наполняем
     * эти же объекты данными и скелетон превращается в реальную карточку товара.
     * Карточка переключается в режим скелетона, есле переданный id равен 0.
     */
    for (let i = 0; i < waitingProductsQuantity; i++) {
        additionalProducts.value.push({ id: 0, name: "", slug: "", price: 0, image: "" });
    }

    try {
        const resp = await $fetch<ProductList>(addApiBase("products"), {
            query: {
                ...queryParams.value,
                page: page,
                perpage: productsPerPage,
            },
        });

        const len = additionalProducts.value.length;

        for (let index = len - waitingProductsQuantity; index < len; index++) {
            if (resp.data && resp.data[0]) {
                additionalProducts.value[index] = resp.data[0];
                // забрать сразу объект, возвращаемый из shift, TS не даёт
                resp.data.shift();
            }
        }
    } catch (error) {
        additionalProducts.value.splice(-waitingProductsQuantity);
    }
    loadingMore.value = false;

    if (intersect) {
        setTimeout(() => {
            loadMoreProducts();
        }, 100);
    }
}
</script>

<template>
    <div>
        <Title>Каталог</Title>
        <div class="wrapper">
            <div class="filters">
                <CatalogFilter @change-query-params="changeQueryParams" />
            </div>

            <section class="data">
                <div class="sidebar">
                    <h1>Каталог</h1>
                    <Button @click="filterbarVisible = true" severity="secondary" class="sidebar__button">
                        <i class="icon_filter_alt sidebar__icon"></i>
                        Фильтры
                    </Button>

                    <Sidebar v-model:visible="filterbarVisible" header="Фильтры">
                        <div class="sidebar__panel">
                            <CatalogFilter @change-query-params="changeQueryParams" />
                        </div>
                    </Sidebar>
                </div>

                <div class="catalog__cards">
                    <template v-if="!pending">
                        <!-- 
                        При SSR элементы внутри тега Transition не отрисовываются,
                        поэтому нужно подгружать первую порцию товаров без анимации
                        -->
                        <ProductCard v-for="(item, index) in products?.data" :idx="index" :item="item" :key="index" />
                        <template v-for="(item, index) in additionalProducts">
                            <Transition appear>
                                <ProductCard
                                    :idx="index + productsPerPage"
                                    :item="item"
                                    :key="index + productsPerPage"
                                    :style="`--delay: ${getDelay()}ms`"
                                />
                            </Transition>
                        </template>
                    </template>

                    <template v-if="pending">
                        <template v-for="n in productsPerPage">
                            <ProductCard loading :idx="0" />
                        </template>
                    </template>
                </div>

                <div v-show="!pending" ref="observerTarget"></div>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
.v-enter-active {
    transition: 300ms ease;
    transition-delay: var(--delay);
    pointer-events: none;
}

.v-leave-active {
    transition: 0ms;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(50%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;

    @media (min-width: 900px) {
        grid-template-columns: 14rem 1fr;
    }

    @media (min-width: 1024px) {
        grid-template-columns: 17rem 1fr;
    }
}

.filters {
    display: none;

    @media (min-width: 900px) {
        display: block;
    }
}

.sidebar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: 900px) {
        display: none;
    }
    h1 {
        margin-top: 0;
    }
    &__button {
        margin-bottom: 1rem;
        height: 2rem;
    }
    &__icon {
        font-size: 1.5rem;
        line-height: 80%;
        margin-right: 0.2rem;
    }
    &__panel {
        padding-top: 0.25rem;
    }
}

.catalog {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 992px) {
        grid-template-columns: 17rem 1fr;
    }

    &__cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.5rem;

        @media (min-width: 375px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 450px) {
            gap: 0.75rem;
        }

        @media (min-width: 700px) {
            grid-template-columns: repeat(3, 1fr);

            @media (min-width: 768px) {
                gap: 1rem;
            }
        }

        @media (min-width: 1350px) {
            grid-template-columns: repeat(4, 1fr);
        }
    }
}
</style>
