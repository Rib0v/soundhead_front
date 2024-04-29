<script setup lang="ts">
const auth = useAuthStore();
</script>

<template>
    <div>
        <Title>DevTools</Title>
        <h2>Token manage</h2>
        <p>Результаты выполнения смотри в боковой панели RespMon. А Check Expires - в консоли.</p>
        <Button @click="auth.refresh" label="Refresh" :loading="auth.loading" raised />
        <Button @click="auth.checkAccess" label="Check Access" :loading="auth.loading" raised />
        <Button @click="auth.checkRefresh" label="Check Refresh" :loading="auth.loading" raised />
        <Button @click="auth.isTokenExpires" label="Check Expires" :loading="auth.loading" raised />
    </div>
</template>

<style scoped></style>
