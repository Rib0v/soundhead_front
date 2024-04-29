export const useCartStore = defineStore("cart", () => {
    const cartList = ref(loadArrFromLocalStorage("cart"));
    const opened = ref(false);

    const totalCount = computed(() => {
        return cartList.value.reduce((accum, item) => accum + item.count, 0);
    });

    const totalPrice = computed(() => {
        return cartList.value.reduce((accum, item) => accum + item.count * item.price, 0);
    });

    function init() {
        cartList.value = loadArrFromLocalStorage("cart");
    }

    function findIndex(productId: number): number {
        return cartList.value.findIndex((item) => item.id == productId);
    }

    function addProduct(product?: CartProduct) {
        if (!product) return;

        /**
         * для синхронизации между вкладками браузера
         * приходится перед каждым изменением читать localStorage,
         * чтобы в случае, если на другой вкладке добавлен товар,
         * то добавление на текущей вкладке не перезаписало данные в localStorage
         */
        cartList.value = loadArrFromLocalStorage("cart");

        product = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.image,
        };

        const index = findIndex(product.id);

        if (index === -1) {
            product.count = 1;
            cartList.value.push(product);
        } else {
            /**
             * Вначале, если товар уже есть в корзине, прибавлялась единица.
             * Но решил, что лучше вместо этого открывать корзину.
             */
            opened.value = true;
            useProductStore().closeFavorites();
            // cartList.value[index].count++;
        }

        saveToLocalStorage("cart", cartList.value);
    }

    function deleteProduct(productId: number) {
        cartList.value = loadArrFromLocalStorage("cart");
        const index = findIndex(productId);
        cartList.value.splice(index, 1);
        saveToLocalStorage("cart", cartList.value);
    }

    function incrementProduct(productId: number) {
        cartList.value = loadArrFromLocalStorage("cart");
        const index = findIndex(productId);
        cartList.value[index].count++;
        saveToLocalStorage("cart", cartList.value);
    }

    function decrementProduct(productId: number) {
        cartList.value = loadArrFromLocalStorage("cart");

        const index = findIndex(productId);

        /**
         * Раньше товар удалялся, если нажать минус, когда товара 1шт.
         * Но решил, что лучше сделать удаление только при нажатии на крест
         * Чтобы пользователь не удалил случайно товар при ненамеренном даблклике
         */
        if (cartList.value[index].count > 1) {
            cartList.value[index].count--;
        } // else {
        //    cartList.value.splice(index, 1);
        //}
        saveToLocalStorage("cart", cartList.value);
    }

    function clearCart() {
        cartList.value = [];
        removeFromLocalStorage("cart");
    }

    function close() {
        opened.value = false;
    }

    return {
        cartList,
        opened,
        totalCount,
        totalPrice,
        init,
        addProduct,
        deleteProduct,
        incrementProduct,
        decrementProduct,
        findIndex,
        clearCart,
        close,
    };
});
