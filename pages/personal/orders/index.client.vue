<script setup lang="ts">
const order = useOrderStore();
order.getUserOrders(useAuthStore().authData.userId);
</script>

<template>
    <div>
        <Title>Мои заказы</Title>
        <h1>Мои заказы</h1>
        <div v-if="order.orderList.length > 0" class="wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Номер</th>
                        <th>Статус</th>
                        <th>Стоимость</th>
                        <th>Ссылка</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="theOrder in order.orderList">
                        <td>{{ new Date(theOrder.created_at).toLocaleString("ru-RU") }}</td>
                        <td>{{ 10000 + theOrder.id }}</td>
                        <td>{{ theOrder.status }}</td>
                        <td>{{ theOrder.total }} р.</td>
                        <td>
                            <NuxtLink :to="`/personal/orders/${theOrder.id}`" class="link">Просмотреть</NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <template v-else>
            <p>Заказов пока нет. Вы можете перейти в каталог и выбрать что-нибудь себе по душе!</p>
            <Button @click="navigateTo('/catalog')" label="Каталог" raised />
        </template>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    max-width: 100%;
    overflow-x: auto;
}
table {
    /* border-collapse: collapse; */
    /* border: 1px solid gray; */
    border-radius: 1rem;
    overflow: hidden;
}
th,
td {
    /* padding: 0rem 1.5rem; */
    text-align: center;
    /* border: 1px solid gray; */
}

tbody {
    background: rgb(144, 181, 206);
    background: rgb(232, 246, 255);
}

thead tr,
tr:nth-child(2n) {
    background: gray;
    background: rgb(197, 219, 234);
}

tbody tr:hover {
    background: rgb(157, 255, 222);
}

.link {
    display: inline-block;
    padding: 1rem 1.5rem;
    /* background: rgba(0, 80, 0, 0.5); */
    /* color: white; */
    text-decoration: none;

    &:hover {
        color: rgb(0, 80, 0);
    }
}
td {
    padding: 0rem 1.5rem;
}

th {
    padding: 1rem 1.5rem;
}
</style>
