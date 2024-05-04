<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect";
const emit = defineEmits(["changeQueryParams"]);

const pedning2 = true;

const { query } = useRoute();
const priceRange = ref([Number(query.minprice) || null, Number(query.maxprice) || null]);

const sortBy = ref([
    { name: "По умолчанию", code: "default" },
    { name: "По возрастанию цены", code: "lowprice" },
    { name: "По убыванию цены", code: "hiprice" },
    { name: "Сначала новые", code: "newer" },
]);

const sortBySelected = ref(
    sortBy.value.find((item) => item.code === query.sort) || { name: "По умолчанию", code: "default" }
);

const selectedBrands = ref<BrandVals[]>([]);

const checkBoxStates = ref<CheckBoxStates>({});

const selectedCheckBoxesStringified = computed<QueryParams>(() => {
    const result: QueryParams = {};

    for (const key in checkBoxStates.value) {
        if (checkBoxStates.value[key].length > 0) {
            result[key] = checkBoxStates.value[key].join();
        }
    }
    return result;
});

const selectedBrandsStringified = computed<QueryParams>(() => {
    const result: QueryParams = {};

    const brand = Object.entries(selectedBrands.value)
        .map((item) => item[1]["id"])
        .join();

    if (brand) result.brand = brand;

    return result;
});

const queryParams = computed<QueryParams>(() => {
    let params: QueryParams = {};

    if (Number(priceRange.value[0]) > 0) params.minprice = Number(priceRange.value[0]);
    if (Number(priceRange.value[1]) > 0) params.maxprice = Number(priceRange.value[1]);
    if (sortBySelected.value.code !== "default") params.sort = sortBySelected.value.code;

    params = {
        ...params,
        // ...paginationQuery,
        ...selectedCheckBoxesStringified.value,
        ...selectedBrandsStringified.value,
    };

    return params;
});

watch(queryParams, (newVal, oldVal) => {
    // navigateTo({ query: { ...queryParams.value } });
    emit("changeQueryParams", queryParams.value);
});

const { pending, data: dataFilters }: { pending: Ref<boolean>; data: Ref<Filter[]> } = useLazyFetch(
    addApiBase("attributes")
);
const brands = computed<Filter>(() => (dataFilters.value || [])[0] || {});
const filters = computed<Filter[]>(() => (dataFilters.value || []).slice(1) || []);

loadCheckBoxStatesFromQuery();
loadBrandStatesFromQuery();

watch(dataFilters, (newVal, oldVal) => {
    console.log("LOADED");
    loadCheckBoxStatesFromQuery();
    loadBrandStatesFromQuery();
});

function strParamsToArr(value: string): number[] {
    return value
        .replace(/^,+|,+$/g, "") // обрезка лишних запятых по краям
        .split(",")
        .map((item) => +item);
}

function loadCheckBoxStatesFromQuery(): void {
    if (!filters.value?.length) return;

    for (const filter of filters.value) {
        const slug = filter.slug;

        checkBoxStates.value[slug] = query[slug] ? strParamsToArr(String(query[slug])) : [];
    }
}

function loadBrandStatesFromQuery(): void {
    const brandsArr = query["brand"] ? strParamsToArr(String(query["brand"])) : null;
    if (brandsArr) {
        selectedBrands.value = brands.value?.vals?.filter((item: BrandVals) => brandsArr.includes(item.id)) || [];
    }
}
</script>

<template>
    <aside>
        <div v-if="pending" class="filters">
            <h4 class="first-subtitle skeleton loading loading__title"></h4>
            <span class="skeleton loading loading__input"></span>
            <h4 class="skeleton loading loading__title"></h4>
            <span class="skeleton loading loading__input"></span>
            <h4 class="skeleton loading loading__title"></h4>
            <div class="pricegroup">
                <span class="skeleton loading loading__input"></span>
                <span class="skeleton loading loading__input"></span>
            </div>
            <h4 class="skeleton loading loading__title"></h4>
            <div class="checkbox-wrapper">
                <span class="skeleton loading loading__option"></span>
                <span class="skeleton loading loading__option"></span>
                <span class="skeleton loading loading__option"></span>
                <span class="skeleton loading loading__option"></span>
                <span class="skeleton loading loading__option"></span>
                <span class="skeleton loading loading__option"></span>
            </div>
        </div>

        <div v-else class="filters">
            <h4 class="first-subtitle">Сортировка</h4>
            <Dropdown
                v-model="sortBySelected"
                :options="sortBy"
                optionLabel="name"
                placeholder="Сортировать по"
                class="select"
                id="sortByDropDown"
            />

            <h4>Марка</h4>
            <MultiSelect
                v-model="selectedBrands"
                :options="brands ? brands['vals'] : []"
                filter
                optionLabel="name"
                placeholder="Выберите бренд"
                class="select"
            />

            <h4>Цена</h4>
            <div class="pricegroup">
                <InputNumber
                    v-model.number="priceRange[0]"
                    inputId="integeronly1"
                    placeholder="Минимальная цена"
                    class="filter__price-input"
                />
                <InputNumber
                    v-model="priceRange[1]"
                    inputId="integeronly2"
                    placeholder="Максимальная цена"
                    class="filter__price-input"
                />
            </div>

            <div v-for="filter in filters" :key="filter.id">
                <h4>{{ filter.name }}</h4>
                <div class="checkbox-wrapper">
                    <label v-for="val in filter.vals" :key="val.id">
                        <input type="checkbox" v-model="checkBoxStates[filter.slug]" :value="val.id" />
                        {{ val.name }}
                    </label>
                    <!-- <input type="checkbox" v-model="checkBoxes[filter.slug]" :value="val.id" :id="'val' + val.id" />
                    <label :for="'val' + val.id">{{ val.name }}</label> -->
                </div>
            </div>
        </div>
    </aside>
</template>

<style>
.filter__price-input input {
    width: 100%;
}
</style>

<style scoped lang="scss">
h2 {
    margin-top: 1.3rem;
    margin-bottom: 0;
    color: #444;
}
h4 {
    margin-bottom: 0.75rem;
}
.filters {
    box-shadow: -1px 1px 8px 0px rgba(0, 0, 150, 0.1);
    padding: 0.5rem 1rem 1.5rem;
    border-radius: 0.75rem;
}
.first-subtitle {
    margin-top: 0.8rem;
}
.checkbox-wrapper {
    display: flex;
    /* align-items: center; */
    gap: 1rem;
    flex-wrap: wrap;
    max-width: 15rem;
    /* max-width: 14rem; */
    /* white-space: nowrap; */
}

.pricegroup {
    display: grid;
    gap: 0.75rem;
}

.select {
    // max-width: 15rem;
    width: 100%;
}

.loading {
    border-radius: 0.25rem;
    display: inline-block;

    &__title {
        width: 60%;
        height: 1.5rem;
    }

    &__input {
        width: 100%;
        height: 2rem;
    }

    &__option {
        width: 100%;
        height: 1.25rem;
    }
}
</style>
