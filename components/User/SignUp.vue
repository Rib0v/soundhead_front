<script setup lang="ts">
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import { useForm, configure } from "vee-validate";
import * as yup from "yup";
import { setLocale } from "yup";
import { ru } from "@/assets/yupLocaleRu.js";

const auth = useAuthStore();

setLocale(ru);
configure({ validateOnModelUpdate: false });

const validationSchema = yup.object({
    name: yup.string().required("Имя обязательно для заполнения").label("Имя"),
    email: yup.string().email().required().label("Email адрес"),
    password: yup.string().min(3).required().label("Пароль"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Пароли должны совпадать")
        .required("Подтверждение пароля обязательно")
        .label("Пароль"),
});

const { errors, defineField, handleSubmit } = useForm({ validationSchema });
const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [passwordConfirm, passwordConfirmAttrs] = defineField("password_confirmation");

const onSubmit = handleSubmit((values) => {
    auth.signUp(values);
});

const errorsFromBack = computed(() => {
    const name = (auth.response.error?._data?.errors?.name || [])[0];
    const email = (auth.response.error?._data?.errors?.email || [])[0];
    const password = (auth.response.error?._data?.errors?.password || [])[0];

    return { name, email, password };
});
</script>

<template>
    <div>
        <form class="form" @submit.prevent="onSubmit">
            <InputGroup class="text-input">
                <InputGroupAddon>
                    <label for="name"><i class="icon_person_outline icon"></i></label>
                </InputGroupAddon>
                <input
                    type="text"
                    v-model="name"
                    v-bind="nameAttrs"
                    :class="{ invalid: !!errors.name }"
                    placeholder="имя"
                    id="name"
                    class="textinput input"
                />
            </InputGroup>
            <small v-if="errors.name || errorsFromBack.name" class="error">
                {{ errors.name || errorsFromBack.name }}
            </small>

            <InputGroup class="text-input">
                <InputGroupAddon>
                    <label for="email2"><i class="icon_email icon"></i></label>
                </InputGroupAddon>
                <input
                    type="email"
                    v-model="email"
                    v-bind="emailAttrs"
                    :class="{ invalid: !!errors.email }"
                    placeholder="email"
                    id="email2"
                    class="textinput input"
                />
            </InputGroup>

            <small v-if="errors.email || errorsFromBack.email" class="error">
                {{ errors.email || errorsFromBack.email }}
            </small>

            <InputGroup class="text-input">
                <InputGroupAddon>
                    <label for="password2"><i class="icon_vpn_key icon"></i></label>
                </InputGroupAddon>
                <input
                    type="password"
                    v-model="password"
                    v-bind="passwordAttrs"
                    :class="{ invalid: !!errors.password }"
                    placeholder="пароль"
                    id="password2"
                    class="textinput input"
                />
            </InputGroup>

            <small v-if="errors.password || errorsFromBack.password" class="error">
                {{ errors.password || errorsFromBack.password }}
            </small>

            <InputGroup class="text-input">
                <InputGroupAddon>
                    <label for="password_conf"><i class="icon_check_circle icon"></i></label>
                </InputGroupAddon>
                <input
                    type="password"
                    v-model="passwordConfirm"
                    v-bind="passwordConfirmAttrs"
                    :class="{ invalid: !!errors.password_confirmation }"
                    placeholder="подтверждение пароля"
                    id="password_conf"
                    class="textinput input"
                />
            </InputGroup>

            <small v-if="errors.password_confirmation" class="error">{{ errors.password_confirmation }}</small>

            <Button type="submit" label="Зарегистрироваться" :loading="auth.loading" raised class="submit-button" />
        </form>
    </div>
</template>

<style scoped>
.form {
    /* max-width: 16rem; */
    display: grid;
}
.text-input {
    margin: 0.75rem 0 0.5rem;
}
.submit-button {
    margin-top: 0.75rem;
    height: 2.75rem;
}
.input {
    border-radius: 0 0.25rem 0.25rem 0;
    width: 100%;
}
.error {
    color: red;
}
.icon {
    user-select: none;
    font-size: 1.5rem;
    line-height: 80%;
    color: #999;
}
</style>
