export const useProductStore = defineStore("product", () => {
    const favorites = ref<Product[]>([]);
    const favoritesOpened = ref(false);
    const compared = ref<number[]>([]);
    const loading = ref(false);

    function init() {
        favorites.value = loadArrFromLocalStorage("favorites");
        compared.value = loadArrFromLocalStorage("compared");
    }

    function addToFavorites(product: Product) {
        if (!product.id) return;

        favorites.value = loadArrFromLocalStorage("favorites");

        if (favorites.value.some((item) => item.id === product.id)) {
            favoritesOpened.value = true;
            return;
        }

        product = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.image,
        };

        favorites.value.push(product);

        saveToLocalStorage("favorites", favorites.value);
    }

    function removeFromFavorites(productId: number) {
        if (!productId) return;

        favorites.value = loadArrFromLocalStorage("favorites");

        const index = favorites.value.findIndex((item) => item.id === productId);

        if (index === -1) return;

        favorites.value.splice(index, 1);

        if (!favorites.value.length) closeFavorites();

        saveToLocalStorage("favorites", favorites.value);
    }

    function closeFavorites() {
        favoritesOpened.value = false;
    }

    function addToCompared(productId: number) {
        if (!productId) return;

        compared.value = loadArrFromLocalStorage("compared");

        if (!compared.value.includes(productId)) {
            compared.value.push(productId);
        } else {
            closeFavorites();
            navigateTo("/product/compare");
        }

        saveToLocalStorage("compared", compared.value);
    }

    function removeFromCompared(productId: number) {
        if (!productId) return;

        compared.value = loadArrFromLocalStorage("compared");

        const index = compared.value.indexOf(productId);

        if (index === -1) return;

        compared.value.splice(index, 1);

        saveToLocalStorage("compared", compared.value);
    }

    return {
        favorites,
        favoritesOpened,
        compared,
        loading,
        init,
        addToFavorites,
        removeFromFavorites,
        closeFavorites,
        addToCompared,
        removeFromCompared,
    };
});
