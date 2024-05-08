<script setup lang="ts">
import { useForm, configure } from "vee-validate";
import * as yup from "yup";
import { setLocale } from "yup";
import { ru } from "@/assets/yupLocaleRu.js";

const auth = useAuthStore();
const user = useUserStore();

const isChanged = ref(false);

setLocale(ru);
configure({ validateOnModelUpdate: false });

const validationSchema = yup.object({
    name: yup.string().required().label("Имя"),
    phone: yup.string().required().label("Телефон"),
});

const { errors, defineField, handleSubmit } = useForm({ validationSchema });
const [name, nameAttrs] = defineField("name");
const [phone, phoneAttrs] = defineField("phone");

name.value = user.name || "";
phone.value = user.phone || "";

const onSubmit = handleSubmit(async (values) => {
    isChanged.value = false;
    isChanged.value = await user.changeUserInfo(values, "profile");
});

const errorsFromBack = computed(() => {
    const name = (auth.response.error?._data?.errors?.name || [])[0];
    const phone = (auth.response.error?._data?.errors?.phone || [])[0];

    return { name, phone };
});

init();

async function init() {
    if (!auth.authData.userId) return;
    if (user.name && user.email && user.phone) return;

    await user.getUserInfo(auth.authData.userId);
    name.value = user.name || "";
    phone.value = user.phone || "";
}

const visible = computed(() => user.emailChanging || !auth.loading);
</script>

<template>
    <div>
        <Title>Профиль</Title>
        <h1 v-if="visible">Профиль</h1>
        <div class="wrapper">
            <div class="email-group">
                <span v-if="visible">Электронная почта: </span>
                <UserChangeEmail />
                <span v-if="visible" class="email">{{ user.email }}</span>
            </div>

            <template v-if="visible">
                <form @submit.prevent="onSubmit" class="form">
                    <div class="group">
                        <label for="name">Имя:</label>
                        <input
                            type="text"
                            v-model="name"
                            v-bind="nameAttrs"
                            :class="{ invalid: !!errors.name }"
                            placeholder="Укажите имя"
                            id="name"
                            class="textinput input"
                        />

                        <small v-if="errors.name || errorsFromBack.name" class="error">
                            {{ errors.name || errorsFromBack.name }}
                        </small>
                    </div>
                    <div class="group">
                        <label for="phone">Телефон:</label>
                        <input
                            type="text"
                            v-model="phone"
                            v-bind="phoneAttrs"
                            :class="{ invalid: !!errors.phone }"
                            placeholder="Укажите телефон"
                            id="phone"
                            class="textinput input"
                        />

                        <small v-if="errors.phone || errorsFromBack.phone" class="error">
                            {{ errors.phone || errorsFromBack.phone }}
                        </small>
                    </div>
                    <p v-if="isChanged" class="success">Информация успешно обновлена.</p>
                    <Button type="submit" :loading="auth.loading" label="Сохранить" raised class="submit-button" />
                </form>
            </template>
        </div>
    </div>
</template>

<style scoped>
.email {
    color: #5f5f5f;
}
label {
    margin-right: 1rem;
}
.success {
    margin: 0;
    color: #059669;
}
.error {
    color: red;
}
.group {
    display: grid;
    row-gap: 0.75rem;
}
.email-group {
    display: grid;
    grid-template-columns: auto 1fr;
    /* justify-content: space-between; */
    gap: 0.25rem 1rem;
}
.wrapper {
    max-width: 25rem;
    display: flex;
    /* display: grid; */
    flex-direction: column;
    /* grid-template-columns: 1fr; */
    gap: 1.25rem;
}
.form {
    display: grid;
    gap: 1.25rem;
}
.submit-button,
.input {
    height: 2.75rem;
}
</style>
