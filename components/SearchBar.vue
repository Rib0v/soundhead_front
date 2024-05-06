<script setup lang="ts">
const visible = ref(false);
const query = ref("");
const result = ref<Product[]>([]);
const transparent = ref(true);
const throttleInterval = useRuntimeConfig().public.searchThrottleInterval;
const throttle = createThrottle(throttleInterval);

useRouter().beforeEach((to, from, next) => {
    if (query.value.length) query.value = "";
    next();
});

watch(query, () => {
    if (!query.value.length) return;

    throttle(search, query);
});

async function search() {
    console.log(query.value);
    try {
        const resp = await $fetch<{ data: Product[] }>(addApiBase(`products/search/${query.value}`), {
            query: { paginate: 5 },
        });
        result.value = resp.data;
    } catch (error) {}
}

function onSubmit() {
    if (!query.value.length) return;
    navigateTo(`/search/${query.value}`);
}

function show() {
    visible.value = true;
    setTimeout(() => {
        transparent.value = false;
    }, 0);
}

function hide() {
    transparent.value = true;
    setTimeout(() => {
        visible.value = false;
    }, 300);
}

/**
 * Реализовал функцию в виде замыкания,
 * чтобы можно было переиспользовать,
 * если вдруг понадобится в дальнейшем
 */
function createThrottle(interval: number) {
    let readyToChange = true;

    function throttle(callback: Function, ref: Ref) {
        if (!readyToChange) return;

        const oldValue = ref.value;
        callback();
        readyToChange = false;

        setTimeout(() => {
            readyToChange = true;

            if (ref.value !== oldValue) {
                throttle(callback, ref);
            }
        }, interval);
    }

    return throttle;
}
</script>

<template>
    <div class="wrapper">
        <form @submit.prevent="onSubmit">
            <div class="search2">
                <input
                    @focus="show"
                    @blur="hide"
                    v-model="query"
                    type="text"
                    name="search"
                    aria-label="Поиск"
                    placeholder="Найти товар"
                    class="textinput search2__input"
                />
                <button class="icon_search" aria-label="Поиск"></button>
            </div>
        </form>
        <div v-show="visible && query.length && result.length" class="results" :class="{ show: !transparent }">
            <p v-for="product in result" :key="product.id">
                <NuxtLink :to="`/product/${product.slug}`">
                    <span class="product">
                        <img :src="product.image" :alt="product.name" class="product__image" />
                        <span class="product__name">{{ product.name }}</span>
                        <span class="product__price">{{ product.price.toLocaleString("ru-RU") }}р.</span>
                    </span>
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.search2 {
    position: relative;

    &__input {
        z-index: 3;
        height: 2.5rem;
        width: 100%;
        padding-right: 3rem;
        border-radius: 0.5rem;
    }

    button {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 2.25rem;
        z-index: 4;
        font-size: 1.4rem;
        line-height: 80%;
        color: inherit;
        border: none;
        background: transparent;
        cursor: pointer;
        color: #aaa;
        transition: 200ms;

        &:hover {
            color: #666;
        }
    }
}
.wrapper {
    position: relative;
    width: 100%;
}
.search {
    position: relative;
    z-index: 3;
    height: 2.25rem;
    width: 100%;
}
.icon {
    position: relative;
    z-index: 4;
    margin: 0;
    padding: 0;
    font-size: 1.4rem;
    transform: translate(20%, -10%);
    color: inherit;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: 200ms;

    &:hover {
        color: #666;
    }
}

.results {
    position: absolute;
    opacity: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: black;
    transform: translateY(100%);
    border-radius: 0 0 0.5rem 0.5rem;
    box-shadow: -4px 4px 8px 4px rgba(34, 60, 80, 0.15);
    padding: 0;
    z-index: 2;
    overflow: hidden;

    transition: 200ms;

    p {
        margin: 0;
        padding: 0;
    }

    a {
        color: black;
    }
}

.show {
    opacity: 1;
}

.product {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    width: 100%;
    background: white;
    height: 5rem;
    padding: 0 0.75rem 0 0.5rem;

    @media (min-width: 768px) {
        gap: 1rem;
        padding: 0 1rem;
    }

    &__image {
        width: 4rem;
        height: 4rem;
        object-fit: contain;
    }

    &__name {
        flex-grow: 1;
    }

    &__price {
        color: #059630;
    }

    &:hover {
        opacity: 0.9;
    }
}
</style>
