<script setup lang="ts">
const product = useProductStore();

const allAttributes: CommonObject = ref({});
const preparedProducts = ref<any[]>([]);
const filtered = ref(true);

getProductsInfo();

const filteredAttributes = computed(() => {
    const filteredAttributes: CommonObject = {};

    for (const key in allAttributes.value) {
        const firstValue = preparedProducts.value[0].attributes[key];
        const isAllEqual = preparedProducts.value.every((item) => item.attributes[key] === firstValue);
        if (!isAllEqual) filteredAttributes[key] = allAttributes.value[key];
    }

    return filteredAttributes;
});

const attributes = computed(() => {
    if (!filtered.value || product.compared.length < 2) {
        return allAttributes.value;
    } else {
        return filteredAttributes.value;
    }
});

function remove(id: number) {
    const index = preparedProducts.value.findIndex((item) => item.id === id);
    preparedProducts.value.splice(index, 1);

    product.removeFromCompared(id);
}

async function getProductsInfo() {
    product.loading = true;
    try {
        const resp = await $fetch<ProductCompare>(addApiBase("products/compare"), {
            query: {
                product: product.compared.join(),
            },
        });
        preparedProducts.value = resp.data || [];
        allAttributes.value = resp.attributes || [];
    } catch (error) {}
    product.loading = false;
}
</script>

<template>
    <div>
        <Title>Сравнение товаров</Title>
        <template v-if="!product.loading">
            <h1>Сравнение товаров</h1>

            <template v-if="!preparedProducts.length">
                <p>Товаров пока нет в списке сравнения. Добавьте что-нибудь! :)</p>
                <NuxtLink to="/catalog" class="p-button link">Каталог</NuxtLink>
            </template>
            <template v-else>
                <div class="button-wrapper">
                    <Button @click="filtered = false" raised :class="{ 'checked-button': !filtered }" label="Все" />
                    <Button
                        @click="filtered = true"
                        raised
                        :class="{ 'checked-button': filtered }"
                        label="Только отличающиеся"
                    />
                </div>

                <div class="wrapper">
                    <table v-show="product.compared.length">
                        <thead>
                            <tr class="first-row">
                                <th class="first-th"></th>
                                <td v-for="product in preparedProducts" class="button-td">
                                    <Button @click="remove(product.id)" severity="secondary" class="remove-button">
                                        <i class="icon_close remove-icon"></i>
                                    </Button>
                                </td>
                            </tr>
                            <tr class="second-row">
                                <th></th>
                                <td v-for="product in preparedProducts" class="titlerow">
                                    <p class="title">
                                        <NuxtLink :to="`/product/${product.slug}`">{{ product.name }}</NuxtLink>
                                    </p>
                                    <NuxtLink :to="`/product/${product.slug}`">
                                        <img :src="product.image" :alt="product.name" class="image" />
                                    </NuxtLink>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Цена</th>
                                <td v-for="product in preparedProducts">
                                    {{ product.price.toLocaleString("ru-RU") }} р.
                                </td>
                            </tr>
                            <tr v-for="(value, key) in attributes">
                                <th>{{ value }}</th>
                                <td v-for="product in preparedProducts">{{ product.attributes[key] ?? "—" }}</td>
                            </tr>
                            <tr>
                                <th>Описание</th>
                                <td v-for="product in preparedProducts">
                                    <span class="description">{{ product.description }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
        </template>
    </div>
</template>

<style scoped>
.wrapper {
    max-width: 100%;
    overflow: auto;
}
.button-wrapper {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}
table {
    border-collapse: collapse;
}
th,
td {
    border: 1px solid #97c0c2;
    padding: 0.25rem 1rem;
    text-align: left;
    vertical-align: top;
}
th {
    text-align: right;
}
td {
    max-width: 10rem;
}
.first-row {
    border-top: none;
}
.first-row {
    text-align: center;
}
.first-th {
    width: 12rem;
    border-top: none;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
}
.titlerow {
    padding: 0;
    overflow: hidden;
}
.button-td {
    border-top: none;
    text-align: center;
    border: none;
}
.image {
    width: 10rem;
    height: 10rem;
    object-fit: contain;
}
@media (min-width: 768px) {
    .first-th {
        width: auto;
        min-width: 17rem;
    }
    td {
        max-width: 12rem;
    }
    .image {
        width: 12rem;
        height: 12rem;
    }
}
.title {
    text-align: center;
    padding: 0 1rem;
    margin-bottom: 0;
    font-weight: bold;
}
.title a {
    text-decoration: none;
    color: inherit;
}
.description {
    display: inline-block;
    max-width: 200px;
}
.link {
    text-decoration: none;
}
.remove-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    margin-bottom: 0.25rem;
}
.remove-icon {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 80%;
}
.checked-button {
    background: #30d49e;
    border: 1px solid #13d494;
    box-shadow: none;
}
</style>
