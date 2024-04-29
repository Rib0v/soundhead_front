<script setup lang="ts">
import type { PageState } from "primevue/paginator";
const filterbarVisible = ref(false);

const { query } = useRoute();
const { productsPerPage } = useRuntimeConfig().public;

const paginationQuery = reactive<Pagination>({});
const firstRow = ref(0);
const perpage = ref(Number(query.perpage) || Number(productsPerPage));

const refQueryParams = ref<CommonObject>(query);

const { data: products } = await useFetch<ProductList>(addApiBase("products"), {
    query: refQueryParams,
});
const pagination = ref({
    currentPage: products.value?.meta?.current_page || 1,
    lastPage: products.value?.meta?.last_page || 1,
    total: products.value?.meta?.total || 0,
});

parseUrlParams(query);

function parseUrlParams(params: CommonObject) {
    if (params?.page > 1) paginationQuery.page = params.page;
    if (params?.perpage && params?.perpage != productsPerPage) paginationQuery.perpage = params.perpage;
    firstRow.value = (pagination.value.currentPage - 1) * perpage.value;
}

const filterQueryParams = ref<CommonObject>({});

function changeQP(query: CommonObject) {
    filterQueryParams.value = query;
    resetPage();
}

const totalQueryParams = computed(() => {
    return {
        ...paginationQuery,
        ...filterQueryParams.value,
    };
});

watch(totalQueryParams, async () => {
    refQueryParams.value = totalQueryParams.value;
});

onMounted(() => {
    watch(totalQueryParams, (newVal, oldVal) => {
        navigateTo({ query: { ...totalQueryParams.value } });
    });
});

function resetPage() {
    delete paginationQuery.page;
    pagination.value.currentPage = 1;
    firstRow.value = 0;
    scrollUp();
}

function changePage(event: PageState) {
    if (event.page == 0) {
        // в компоненте отсчёт страниц идёт с 0
        delete paginationQuery.page;
    } else {
        paginationQuery.page = event.page + 1;
    }

    if (event.rows == productsPerPage) {
        delete paginationQuery.perpage;
    } else {
        paginationQuery.perpage = event.rows;
    }
    scrollUp();
}

const scrollTarget = ref<HTMLInputElement | null>(null);
function scrollUp() {
    setTimeout(() => {
        scrollTarget.value?.scrollIntoView({
            behavior: "smooth",
        });
    }, 100);
}
</script>

<template>
    <div>
        <Title>Каталог</Title>
        <div class="wrapper">
            <div class="filters">
                <CatalogFilter @change-query-params="changeQP" />
            </div>

            <section ref="scrollTarget" class="data">
                <div class="sidebar">
                    <h1>Каталог</h1>
                    <Button @click="filterbarVisible = true" severity="secondary" class="sidebar__button">
                        <i class="icon_filter_alt sidebar__icon"></i>
                        Фильтры
                    </Button>

                    <Sidebar v-model:visible="filterbarVisible" header="Фильтры">
                        <div class="sidebar__panel">
                            <CatalogFilter @change-query-params="changeQP" />
                        </div>
                    </Sidebar>
                </div>

                <div class="catalog__cards">
                    <ProductCard v-for="item in products?.data || []" :item="item" :key="item.id" />
                </div>

                <Paginator
                    @page="changePage"
                    v-model:first="firstRow"
                    :rows="perpage"
                    :totalRecords="products?.meta?.total || 0"
                    :rowsPerPageOptions="[12, 24, 48]"
                ></Paginator>
            </section>
        </div>
    </div>
</template>

<style scoped lang="scss">
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
        gap: 0.75rem;

        @media (min-width: 375px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 450px) {
            gap: 1rem;
        }

        @media (min-width: 700px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (min-width: 1350px) {
            grid-template-columns: repeat(4, 1fr);
        }
    }
}
</style>
