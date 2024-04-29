<script setup lang="ts">
const model = defineModel();
defineProps({
    checked: Boolean,
    name: String,
    value: String,
});
</script>

<template>
    <label class="label">
        <input v-model="model" type="radio" :checked="checked" :name="name" :value="value" class="hidden-radio" />
        <span class="box"><slot /></span>
    </label>
</template>

<style scoped lang="scss">
.label {
    position: relative;
}
.hidden-radio {
    position: absolute;
    opacity: 0;
    top: 0;
    left: -2000rem;

    &:checked + .box {
        background: #059669;
    }

    &:focus-visible + .box {
        outline: 2px solid black;
    }
}

.box {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 4rem;
    background: #45d6a8;
    border-radius: 1rem;
    color: white;
    text-align: center;
    cursor: pointer;
}
</style>
