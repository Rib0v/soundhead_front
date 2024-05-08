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
    email: yup.string().email().required().label("Email адрес"),
    password: yup.string().min(3).required().label("Пароль"),
});

const { errors, defineField, handleSubmit } = useForm({ validationSchema });
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit((values) => {
    auth.login(values);
});

const errorsFromBack = computed(() => {
    const email = (auth.response.error?._data?.errors?.email || [])[0];
    const password = (auth.response.error?._data?.errors?.password || [])[0];

    return { email, password };
});
</script>

<template>
    <form class="form" @submit.prevent="onSubmit">
        <InputGroup class="text-input">
            <InputGroupAddon>
                <label for="email"><i class="icon_email icon"></i></label>
            </InputGroupAddon>
            <input
                type="email"
                v-model="email"
                v-bind="emailAttrs"
                :class="{ invalid: !!errors.email }"
                placeholder="email"
                id="email"
                class="textinput input"
            />
        </InputGroup>

        <small v-if="errors.email || errorsFromBack.email" class="error">
            {{ errors.email || errorsFromBack.email }}
        </small>

        <InputGroup class="text-input">
            <InputGroupAddon>
                <label for="password"><i class="icon_vpn_key icon"></i></label>
            </InputGroupAddon>
            <input
                type="password"
                v-model="password"
                v-bind="passwordAttrs"
                :class="{ invalid: !!errors.password }"
                placeholder="пароль"
                id="password"
                class="textinput input"
            />
        </InputGroup>

        <small v-if="errors.password || errorsFromBack.password" class="error">
            {{ errors.password || errorsFromBack.password }}
        </small>

        <Button type="submit" label="Войти" :loading="auth.loading" raised class="submit-button" />
    </form>
</template>

<style scoped>
.form {
    /* max-width: 16rem; */
    display: grid;
}
.email {
    margin: 0.75rem 0 0.5rem;
}
.password {
    margin: 0.75rem 0 0.5rem;
}
.text-input {
    margin: 0.75rem 0 0.5rem;
}
.input {
    border-radius: 0 0.25rem 0.25rem 0;
    width: 100%;
}
.submit-button {
    margin-top: 0.75rem;
    height: 2.75rem;
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
