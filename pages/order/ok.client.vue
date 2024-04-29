<script setup lang="ts">
const auth = useAuthStore();
const orderId = localStorage.getItem("lastOrder");
if (!orderId) navigateTo("/catalog");
</script>

<template>
    <div>
        <Title>Заказ оформлен</Title>
        <h1>Готово!</h1>
        <p><i class="icon_sentiment_very_satisfied icon"></i></p>

        <p>
            Ваш заказ
            <strong v-if="auth.logined">
                <NuxtLink :to="`/personal/orders/${orderId}`">#{{ 10000 + Number(orderId) }}</NuxtLink>
            </strong>
            <strong v-else>#{{ 10000 + Number(orderId) }}</strong>
            успешно создан! В ближайшее время менеджер свяжется с Вами.
        </p>
        <p v-if="auth.logined">
            Вы можете следить за статусом заказа на странице
            <NuxtLink :to="`/personal/orders`">Мои заказы</NuxtLink>
        </p>
        <p>Желаем хорошего дня!</p>
        <hr />
        <p class="cta">
            Если решите присмотреть что-то ещё, наш <NuxtLink to="/catalog">каталог</NuxtLink> всегда открыт для Вас ;)
        </p>
    </div>
</template>

<style scoped>
h1,
p {
    text-align: center;
}
.icon {
    font-size: 10rem;
    color: #e1f0e4;
    line-height: 90%;
}
.cta {
    color: #777;
}
hr {
    border: 0;
    border-bottom: 1px solid #ddd;
    margin: 2rem auto;
    max-width: 30rem;
}
a {
    color: #4a80ff;
}
</style>
