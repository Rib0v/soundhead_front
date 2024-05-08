<script setup lang="ts">
const auth = useAuthStore();
const emit = defineEmits(["close"]);

function login() {
    emit("close");
    auth.dialogOpen(0);
}
</script>

<template>
    <SearchBar />
    <nav>
        <ul class="navigation">
            <li><NuxtLink to="/" @click="$emit('close')" no-prefetch>Главная</NuxtLink></li>
            <!-- <li><NuxtLink to="/welcome" @click="close">Welcome</NuxtLink></li> -->
            <li><NuxtLink to="/catalog" @click="$emit('close')" no-prefetch>Каталог</NuxtLink></li>

            <li v-if="auth.logined">
                <NuxtLink to="/personal" @click="$emit('close')" no-prefetch>Профиль</NuxtLink>
            </li>

            <template v-else>
                <li v-if="$route.name === 'login'">
                    <NuxtLink to="/login" @click="$emit('close')" no-prefetch>Вход</NuxtLink>
                </li>
                <li v-else>
                    <a href="/login" @click.prevent="login">Вход</a>
                </li>
            </template>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
.navigation {
    margin-top: 2rem;
    list-style: none;
    padding: 0;
    font-size: 1.15rem;

    li {
        margin: 1rem 0;
    }

    a {
        color: rgb(100, 100, 100);
        text-decoration: none;
        font-weight: bold;
    }
    .router-link-active,
    .router-link-exact-active {
        color: black;
    }
}
</style>
