<script setup lang="ts">
definePageMeta({
    middleware: "guest",
});
</script>

<template>
    <div>
        <div class="sign-switcher">
            <Title>Вход</Title>
            <UserSignAll />
        </div>
    </div>
</template>

<style scoped>
.sign-switcher {
    max-width: 20rem;
    margin: 15vh auto 0;
    box-shadow: -1px 4px 19px 4px rgba(34, 60, 80, 0.15);
    border-radius: 0.75rem;
    overflow: hidden;
}
</style>
