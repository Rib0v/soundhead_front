<script setup lang="ts">
const auth = useAuthStore();
const visible = ref(false);

function close() {
    visible.value = false;
}

function login() {
    close();
    auth.dialogOpen(0);
}

useRouter().beforeEach((to, from, next) => {
    close();
    next();
});
</script>

<template>
    <button @click="visible = true" class="cart p-overlay-badge">
        <span class="icon_menu icon"></span>
    </button>

    <Sidebar v-model:visible="visible" header="Меню">
        <SearchBar />
        <nav>
            <ul class="navigation">
                <li><NuxtLink to="/" @click="close">Главная</NuxtLink></li>
                <!-- <li><NuxtLink to="/welcome" @click="close">Welcome</NuxtLink></li> -->
                <li><NuxtLink to="/catalog" @click="close">Каталог</NuxtLink></li>

                <li v-if="auth.logined"><NuxtLink to="/personal" @click="close">Профиль</NuxtLink></li>

                <template v-else>
                    <li v-if="$route.name === 'login'"><NuxtLink to="/login" @click="close">Вход</NuxtLink></li>
                    <li v-else>
                        <a href="/login" @click.prevent="login">Вход</a>
                    </li>
                </template>
            </ul>
        </nav>
    </Sidebar>
</template>

<style scoped lang="scss">
.cart {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    // background: #9effc9;
    background: rgba(0, 255, 113, 0.5);
    border-radius: 50%;
    border: none;
    height: 2.5rem;
    width: 2.5rem;
    cursor: pointer;
}
.icon {
    font-size: 2rem;
    // transform: translate(-16%, -4%);
    user-select: none;
    line-height: 80%;
    color: black;
}

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
