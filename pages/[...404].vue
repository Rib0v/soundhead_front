<script setup></script>

<template>
    <div>
        <Title>404</Title>
        <div class="wrapper">
            <div>
                <h1>Страница не найдена</h1>
                <p class="error">404</p>
                <p class="cta">Но в нашем каталоге вы обязательно что-нибудь найдёте! ;)</p>
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
    min-height: 75vh;
}
h1 {
    color: #444;
    margin-bottom: 0;
}
.error {
    font-size: 10rem;
    margin: 0;
    color: #e1f0e4;
}
@media (min-width: 370px) {
    .error {
        font-size: 12rem;
    }
}
.cta {
    color: #777;
    margin: 0 auto;
    max-width: 20rem;
}
.link {
    text-decoration: none;
    margin-top: 1rem;
}
</style>
