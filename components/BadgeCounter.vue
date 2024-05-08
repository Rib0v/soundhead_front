<script setup lang="ts">
defineProps({
    count: Number,
});
</script>

<template>
    <span v-show="count" class="badge-counter">
        <span>{{ count }}</span>
    </span>
</template>

<style>
.badge-counter {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    top: -0.25rem;
    right: -0.25rem;
    height: 1rem;
    min-width: 1rem;
    border-radius: 50%;
    font-weight: bold;
    background-color: #ef4444;
    color: #ffffff;
    user-select: none;
}
.badge-counter span {
    font-size: 0.7rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
    padding: 0 0.2rem;
}
</style>
