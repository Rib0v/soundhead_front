<script setup lang="ts">
const visible = ref(false);

function close() {
    visible.value = false;
}

useRouter().beforeEach((to, from, next) => {
    close();
    next();
});
</script>

<template>
    <button @click="visible = true" aria-label="Меню" class="cart p-overlay-badge">
        <span class="icon_menu icon"></span>
    </button>

    <Sidebar v-model:visible="visible" header="Меню">
        <LazyMobileMenu v-if="visible" />
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
</style>
