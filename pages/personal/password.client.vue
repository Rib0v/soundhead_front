<script setup lang="ts">
import { useForm, configure } from "vee-validate";
import * as yup from "yup";
import { setLocale } from "yup";
import { ru } from "@/assets/yupLocaleRu.js";

const auth = useAuthStore();
const user = useUserStore();

const changed = ref(false);

setLocale(ru);
configure({ validateOnModelUpdate: false });

const validationSchema = yup.object({
    old_password: yup.string().min(3).required().label("Пароль"),
    new_password: yup.string().min(3).required().label("Пароль"),
    new_password_confirmation: yup
        .string()
        .oneOf([yup.ref("new_password")], "Пароли должны совпадать")
        .required("Подтверждение пароля обязательно")
        .label("Пароль"),
});

const { errors, defineField, handleSubmit } = useForm({ validationSchema });
const [oldPassword, oldPasswordAttrs] = defineField("old_password");
const [newPassword, newPasswordAttrs] = defineField("new_password");
const [newPasswordConfirm, newPasswordConfirmAttrs] = defineField("new_password_confirmation");

const onSubmit = handleSubmit(async (values) => {
    changed.value = false;
    changed.value = await user.changeUserInfo(values, "password");
});

const errorsFromBack = computed(() => {
    const oldPassword = (auth.response.error?._data?.errors?.old_password || [])[0];
    const newPassword = (auth.response.error?._data?.errors?.new_password || [])[0];

    return { oldPassword, newPassword };
});
</script>

<template>
    <div>
        <Title>Сменить пароль</Title>
        <h1>Сменить пароль</h1>
        <form v-if="!changed" @submit.prevent="onSubmit" class="wrapper">
            <div class="group">
                <label for="username">Старый пароль</label>
                <input
                    type="password"
                    v-model="oldPassword"
                    v-bind="oldPasswordAttrs"
                    :class="{ invalid: !!errors.old_password }"
                    id="oldPassword"
                    class="textinput input"
                />
                <small v-if="errors.old_password || errorsFromBack.oldPassword" class="error">
                    {{ errors.old_password || errorsFromBack.oldPassword }}
                </small>
            </div>
            <div class="group">
                <label for="username">Новый пароль</label>
                <input
                    type="password"
                    v-model="newPassword"
                    v-bind="newPasswordAttrs"
                    :class="{ invalid: !!errors.new_password }"
                    id="newPassword"
                    class="textinput input"
                />
                <small v-if="errors.new_password || errorsFromBack.newPassword" class="error">
                    {{ errors.new_password || errorsFromBack.newPassword }}
                </small>
            </div>
            <div class="group">
                <label for="username">Новый пароль повторно</label>
                <input
                    type="password"
                    v-model="newPasswordConfirm"
                    v-bind="newPasswordConfirmAttrs"
                    :class="{ invalid: !!errors.new_password_confirmation }"
                    id="newPasswordConfirm"
                    class="textinput input"
                />
                <small v-if="errors.new_password_confirmation" class="error">
                    {{ errors.new_password_confirmation }}
                </small>
            </div>
            <Button type="submit" :loading="auth.loading" label="Сохранить" raised class="submit-button" />
        </form>
        <p v-else>Пароль успешно изменён.</p>
    </div>
</template>

<style scoped>
.group {
    display: grid;
    row-gap: 0.5rem;
    width: 100%;
}
.wrapper {
    max-width: 25rem;
    display: grid;
    gap: 1.25rem;
    width: 100%;
}
.submit-button,
.input {
    height: 2.75rem;
    width: 100%;
}
.error {
    color: red;
}
</style>
