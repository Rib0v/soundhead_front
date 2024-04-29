<script setup lang="ts">
const conf = useRuntimeConfig();
const apiBase = `${conf.public.apiBase}:${conf.public.apiPort}/api/`;
</script>

<template>
    <div>
        <Title>Главная</Title>
        <div class="wrapper">
            <div>
                <h1>Disclaimer</h1>
                <p>
                    Ресурс размещён для демонстрации применённых в нём технологий. Все товары вымышлены, а цены
                    сгенерированы рандомно. Если Вы оказались здесь неслучайно – то вот для Вас большая удобная кнопка,
                    ведущая в самое сердце сайта. Желаю приятного ознакомления и хорошего дня! =)
                </p>
                <NuxtLink to="/catalog" class="p-button link">Каталог</NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    text-align: center;
    display: grid;
    place-content: center;
    min-height: 65vh;
}
h1 {
    color: #666;
    margin-bottom: 0;
}
p {
    max-width: 31rem;
    text-align: justify;
}
.link {
    margin-top: 0.5rem;
    text-decoration: none;
    padding: 1rem 2rem;
    font-size: 1.2rem;
}
</style>
