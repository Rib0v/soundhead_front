<script setup lang="ts">
const auth = useAuthStore();
</script>
<template>
    <Dialog
        v-model:visible="auth.dialogVisible"
        modal
        dismissableMask
        :style="{ overflow: 'hidden', boxShadow: '-1px 4px 18px 4px rgba(34, 60, 80, 0.5)' }"
        :pt="{
            root: 'border-none',
            mask: {
                style: 'backdrop-filter: blur(4px)',
            },
        }"
    >
        <template #container>
            <UserSignAll v-if="auth.dialogVisible" />
        </template>
    </Dialog>
</template>

<style scoped></style>
