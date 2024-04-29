<script setup lang="ts">
const authStore = useAuthStore();
const { response } = storeToRefs(authStore);

const sideBarVisible = ref(false);

const success = computed(() => response.value.success);
const error = computed(() => response.value.error);
</script>

<template>
    <Button @click="sideBarVisible = true">RespMon</Button>

    <Sidebar
        v-model:visible="sideBarVisible"
        header="Response monitor"
        position="right"
        :dismissable="false"
        :modal="false"
    >
        <p v-show="!Object.keys(success).length && !Object.keys(error).length" class="error">Пока запросов нет.</p>
        <pre v-show="Object.keys(success).length" class="success">{{ success }}</pre>
        <pre v-show="Object.keys(error).length" class="error">{{ error }}</pre>
    </Sidebar>
</template>

<style scoped>
.success,
.error {
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: -4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    overflow-x: auto;
}
.success {
    background: rgba(0, 255, 0, 0.3);
}
.error {
    background: rgba(255, 0, 0, 0.3);
}
</style>
