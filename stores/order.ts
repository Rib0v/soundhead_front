export const useOrderStore = defineStore("order", () => {
    const auth = useAuthStore();
    const cart = useCartStore();
    const orderList = ref<Order[]>([]);
    const single = ref<OrderDetail | undefined>();

    async function getUserOrders(userId?: number) {
        if (!userId) return;

        auth.loading = true;
        auth.response.success = auth.response.error = {};

        try {
            const resp = await auth.apiFetch<OrderList>(`users/${userId}/orders`, {
                headers: auth.headers,
            });
            orderList.value = resp.data;
            auth.response.success = resp;
        } catch (error: any) {
            auth.response.error = { ...error.response };
        }

        auth.loading = false;
    }

    async function getOrder(id?: number) {
        if (!id) return;

        auth.loading = true;
        auth.response.success = auth.response.error = {};

        try {
            const resp = await auth.apiFetch<{ data: OrderDetail }>(`orders/${id}`, {
                headers: auth.headers,
            });
            single.value = resp.data;
            auth.response.success = resp;
        } catch (error: any) {
            auth.response.error = { ...error.response };
        }

        auth.loading = false;
    }

    async function createOrder(order: CreatedOrder) {
        if (cart.cartList.length < 1) return;

        order.products = cart.cartList.map((product) => {
            return { product_id: product.id, count: product.count };
        });

        auth.loading = true;
        auth.response.success = auth.response.error = {};

        try {
            const resp = await auth.apiFetch<CommonObject>("orders", {
                method: "POST",
                body: order,
                headers: auth.headers,
            });

            auth.response.success = resp;
            const orderId = resp.order?.id;
            saveToLocalStorage("lastOrder", orderId);
            navigateTo("order/ok");
            cart.clearCart();
        } catch (error: any) {
            auth.response.error = { ...error.response };
        }

        auth.loading = false;
    }

    return {
        orderList,
        single,
        getUserOrders,
        getOrder,
        createOrder,
    };
});
