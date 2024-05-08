<script setup>
// import "primevue/resources/themes/aura-light-green/theme.css";
import "~/assets/primevue/themes/aura/aura-light/green/theme.scss";
import "~/assets/icons.css";
import "~/assets/main.scss";

const auth = useAuthStore();
const product = useProductStore();
const scrollButtonVisible = ref(false);

const loading = computed(() => product.loading || auth.loading);

useHead({
    titleTemplate: "%s / SOUNDHEAD",
});

function scrolltop() {
    if (window) {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
}

onMounted(() => {
    product.init();
    auth.init();

    setInterval(() => {
        scrollButtonVisible.value = window.scrollY > 120;
    }, 500);
});
</script>

<template>
    <div>
        <NuxtLoadingIndicator />
        <img v-show="loading" src="~/public/loading.svg" class="loader" />
        <div class="container">
            <header>
                <nav class="menu">
                    <div class="menu__links">
                        <NuxtLink to="/" no-prefetch>Главная</NuxtLink>
                        <NuxtLink to="/catalog" no-prefetch>Каталог</NuxtLink>

                        <NuxtLink v-if="auth.logined" to="/personal" no-prefetch>Профиль</NuxtLink>

                        <template v-else>
                            <NuxtLink v-if="$route.name === 'login'" to="/login" no-prefetch>Вход</NuxtLink>
                            <a v-else href="/login" @click.prevent="auth.dialogOpen(0)">Вход</a>
                        </template>
                    </div>
                    <SearchBar />
                    <div class="icons">
                        <IconFavorite />
                        <IconCompare />
                        <IconCart />
                        <!-- <ResponceMonitor /> -->
                    </div>
                </nav>

                <div class="mobilemenu">
                    <div class="mobilemenu__icons">
                        <IconMenu />
                        <IconFavorite />
                        <IconCompare />
                        <IconCart />
                        <IconPersonal v-if="auth.logined" />
                        <IconSign v-else />
                    </div>
                </div>
                <UserSignDialog />
            </header>
            <NuxtPage />
        </div>
        <button class="scrolltop" @click="scrolltop" :class="{ scrolltop__visible: scrollButtonVisible }"></button>
    </div>
</template>

<style lang="scss">
:root {
    font-family: sans-serif;
    font-feature-settings: normal;
    --font-family: sans-serif;
    --font-feature-settings: normal;
}

body {
    -webkit-tap-highlight-color: transparent;
}

.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}

.container {
    max-width: 1600px;
    margin: 0 auto 6rem;
    padding: 0;

    @media (min-width: 450px) {
        padding: 0 0.5rem;
    }

    @media (min-width: 768px) {
        padding: 0 1rem;
    }
}

.scrolltop {
    position: fixed;
    right: 0.25rem;
    bottom: 4.25rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5) url("~/public/scrolltop.png") center no-repeat;
    transition: 400ms;
    visibility: hidden;
    opacity: 0;
    transform: translateX(4rem);

    @media (min-width: 500px) {
        right: 0.5rem;
        bottom: 4.5rem;
    }

    @media (min-width: 768px) {
        right: 0.75rem;
        bottom: 0.75rem;
    }
    @media (min-width: 1000px) {
        right: 1rem;
        bottom: 1rem;
    }
    @media (min-width: 1200px) {
        right: 1.5rem;
        bottom: 1.5rem;
    }
    @media (min-width: 1800px) {
        right: 2.5rem;
        bottom: 2.5rem;
    }

    &__visible {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
<style scoped lang="scss">
.icons {
    display: flex;
    gap: 1.25rem;
    align-items: center;
}

.menu {
    display: none;

    @media (min-width: 768px) {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.5rem;
        border: 1px solid #e2e8f0;
        padding: 1.5rem 1.75rem;
        border-radius: 1rem;
        box-shadow: -2px 2px 8px 0px rgba(34, 60, 80, 0.075);
    }

    &__links {
        display: flex;
        // gap: 1rem;

        a {
            color: rgb(100, 100, 100);
            text-decoration: none;
            font-weight: bold;

            line-height: 2.25rem;
            border-radius: 0.25rem;
            padding: 0 0.75rem;
            transition: 200ms;

            &:hover {
                background: #f5f5f5;
                // box-shadow: -2px 2px 8px 0px rgba(34, 60, 80, 0.075);
            }
        }

        .router-link-active,
        .router-link-exact-active {
            color: black;
        }
    }
}

.mobilemenu {
    position: fixed;
    z-index: 4;

    /**
    * запас 2rem, чтобы в firefox при
    * появлении/скрытии панели
    * не появлялось белого зазора
    */
    bottom: -2rem;
    padding-bottom: 2rem;

    left: 0;
    width: 100%;
    // background: #c7c7c7;
    // background: #edf7fdf2;
    background: rgba(0, 50, 75, 0.9);
    box-shadow: 0px -4px 18px 0px rgba(0, 0, 80, 0.2);

    @media (min-width: 768px) {
        display: none;
    }

    &__icons {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 4rem;
        max-width: 768px;
        margin: 0 auto;
    }
}
</style>
