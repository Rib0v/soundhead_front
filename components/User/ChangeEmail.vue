<script setup lang="ts">
import { useForm, configure } from "vee-validate";
import * as yup from "yup";
import { setLocale } from "yup";
import { ru } from "@/assets/yupLocaleRu.js";

const auth = useAuthStore();
const user = useUserStore();

const emailPopupVisible = ref(false);

setLocale(ru);
configure({ validateOnModelUpdate: false });

const validationSchema = yup.object({
    email: yup.string().email().required().label("Email адрес"),
    password: yup.string().min(3).required().label("Пароль"),
});

const { errors, defineField, handleSubmit } = useForm({ validationSchema });
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
    user.emailChanging = true;
    const isChanged = await user.changeUserInfo(values, "email");
    emailPopupVisible.value = !isChanged;
    password.value = "";
    user.emailChanging = false;
});

const errorsFromBack = computed(() => {
    const email = (auth.response.error?._data?.errors?.email || [])[0];
    const password = (auth.response.error?._data?.errors?.password || [])[0];

    return { email, password };
});
</script>

<template>
    <Button
        v-if="user.emailChanging || !auth.loading"
        @click="emailPopupVisible = true"
        raised
        text
        class="edit-button"
    >
        <template #icon>
            <i class="icon_edit edit-icon"></i>
        </template>
    </Button>

    <Dialog v-model:visible="emailPopupVisible" modal dismissableMask header="Изменить почту">
        <form @submit.prevent="onSubmit" class="wrapper">
            <div class="group">
                <label for="username">Новый email</label>
                <input
                    type="email"
                    v-model="email"
                    v-bind="emailAttrs"
                    :class="{ invalid: !!errors.email }"
                    placeholder="Введите email"
                    id="email"
                    class="textinput text-input"
                />
                <small v-if="errors.email || errorsFromBack.email" class="error">
                    {{ errors.email || errorsFromBack.email }}
                </small>
            </div>
            <div class="group">
                <label for="username">Пароль для подтверждения</label>
                <input
                    type="password"
                    v-model="password"
                    v-bind="passwordAttrs"
                    :class="{ invalid: !!errors.password }"
                    id="password"
                    placeholder="Введите пароль"
                    class="textinput text-input"
                />
                <small v-if="errors.password || errorsFromBack.password" class="error">
                    {{ errors.password || errorsFromBack.password }}
                </small>
            </div>

            <div class="edit-mail__buttons">
                <Button
                    label="Отмена"
                    @click="emailPopupVisible = false"
                    severity="danger"
                    raised
                    class="submit-button"
                />
                <Button type="submit" label="Сохранить" raised class="submit-button" />
            </div>
        </form>
    </Dialog>
</template>

<style scoped>
.wrapper {
    max-width: 20rem;
    display: grid;
    gap: 1.25rem;
    width: 100%;
}
.error {
    color: red;
}
.group {
    display: grid;
    row-gap: 0.5rem;
}
.text-input {
    min-width: 250px;
    width: 100%;
}

.submit-button,
.text-input {
    height: 2.75rem;
}
.edit-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    grid-row: span 2;
    align-self: flex-end;
    width: 2.25rem;
    height: 2.25rem;
    /* background: rgb(60, 255, 191); */
    border: none;
}
.edit-icon {
    font-size: 1.4rem;
    line-height: 80%;
}

.edit-mail__buttons {
    /* display: flex;
    justify-content: center; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
    /* margin-top: 1rem; */
    margin-bottom: 0;
}
</style>
