<script setup lang="ts">
const cart = useCartStore();
const auth = useAuthStore();
const user = useUserStore();
const visible = ref(false);

definePageMeta({
    middleware: "auth",
});

function logout() {
    user.logout();
    auth.logout();
}

function close() {
    visible.value = false;
}

function opencart() {
    close();
    cart.opened = true;
}

useRouter().beforeEach((to, from, next) => {
    close();
    next();
});
</script>
<template>
    <div>
        <div class="personal">
            <aside>
                <nav class="navbar">
                    <ul class="navbar__list">
                        <li><NuxtLink to="/personal" class="navbar__link">Профиль</NuxtLink></li>
                        <li>
                            <NuxtLink to="/personal/orders" class="navbar__link navbar__link_order">Заказы</NuxtLink>
                        </li>
                        <li><NuxtLink to="/personal/address" class="navbar__link">Адрес</NuxtLink></li>
                        <li><span @click="cart.opened = true" class="navbar__link">Корзина</span></li>
                        <li><NuxtLink to="/personal/password" class="navbar__link">Сменить пароль</NuxtLink></li>
                        <!-- <li><NuxtLink to="/personal/devtools" class="navbar__link">DevTools</NuxtLink></li> -->
                        <li><span @click="logout" class="navbar__link">Выйти</span></li>
                    </ul>
                </nav>
            </aside>

            <section>
                <Button @click="visible = true" severity="secondary" class="menu-button">Меню профиля</Button>
                <NuxtPage />
            </section>

            <Sidebar v-model:visible="visible" header="Меню профиля">
                <nav>
                    <ul class="mobilemenu">
                        <li><NuxtLink to="/personal">Профиль</NuxtLink></li>
                        <li><NuxtLink to="/personal/orders">Заказы</NuxtLink></li>
                        <li><NuxtLink to="/personal/address">Адрес</NuxtLink></li>
                        <li><button @click="opencart">Корзина</button></li>
                        <li><NuxtLink to="/personal/password">Сменить пароль</NuxtLink></li>
                        <!-- <li><NuxtLink to="/personal/devtools">DevTools</NuxtLink></li> -->
                        <li><button @click="logout">Выйти</button></li>
                    </ul>
                </nav>
            </Sidebar>
        </div>
    </div>
</template>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}
.menu-button {
    width: 100%;
    justify-content: center;
    align-items: center;

    @media (min-width: 900px) {
        display: none;
    }
}
.personal {
    @media (min-width: 900px) {
        display: grid;
        grid-template-columns: 17rem 1fr;
        gap: 2rem;
    }

    @media (min-width: 1024px) {
        gap: 4rem;
    }
}
aside {
    display: none;
    @media (min-width: 900px) {
        display: block;
    }
}
.mobilemenu {
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

    .router-link-exact-active {
        color: black;
    }

    button {
        font-size: 1.15rem;
        color: rgb(100, 100, 100);
        font-weight: bold;
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
    }
}
.navbar {
    /* margin-top: 1.5rem; */
    background: lightseagreen;
    background: #e4fffe;
    /* border: 1px solid black; */
    border: 1px solid #c4ffd3;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: -1px 4px 8px 4px rgba(34, 60, 80, 0.1);
}
.navbar__list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
}
.navbar__link {
    display: inline-block;
    text-decoration: none;
    color: black;
    width: 100%;
    /* width: 15rem; */
    padding: 1rem 2rem;
    /* text-align: center; */
    cursor: pointer;
    font-weight: normal;
}
.navbar__list li:not(:last-child) {
    /* border-bottom: 1px solid black; */
    border-bottom: 1px solid #9fd;
}
.navbar__link:hover {
    background: rgb(38, 218, 209);
    background: rgb(179, 255, 251);
    background: rgb(157, 255, 222);
}
.navbar__link.router-link-exact-active,
.navbar__link_order.router-link-active {
    background: rgb(45, 255, 245);
    /* background: rgb(5, 150, 105); */
    background: rgb(102, 215, 209);
    background: rgb(60, 255, 191);
}
</style>
