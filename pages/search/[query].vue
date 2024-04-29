<script setup lang="ts">
const { query } = useRoute().params;

const { data: products } = await useFetch<ProductList>(addApiBase(`products/search/${query}`));
</script>

<template>
    <div>
        <Title>Результаты поиска</Title>
        <h1>Результаты поиска</h1>
        <template v-if="products?.data?.length">
            <p class="queryinfo">По запросу "{{ query }}"</p>
            <div class="cards">
                <ProductCard v-for="item in products?.data || []" :item="item" :key="item.id" />
            </div>
        </template>

        <div v-else class="notfound">
            <p>Увы, по запросу "{{ query }}" ничего не найдено...</p>
            <i class="icon_search icon"></i>
            <p class="cta">Но в нашем каталоге вы обязательно что-нибудь найдёте! ;)</p>
            <NuxtLink to="/catalog" class="p-button link">Каталог</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
h1 {
    margin-bottom: 0.7rem;
}
h1,
p {
    text-align: center;
}
p {
    max-width: 25rem;
    margin: 0 auto;
}
.queryinfo {
    color: #777;
}
.cta {
    max-width: 20rem;
    color: #777;
}
.cards {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, 19rem);
    gap: 1rem;
    justify-content: center;
}
.notfound {
    margin-top: 1.25rem;
    text-align: center;
}
.icon {
    font-size: 20rem;
    margin: 0;
    line-height: 80%;
    color: #e1f0e4;
}
.link {
    text-decoration: none;
    margin-top: 1rem;
}
</style>
