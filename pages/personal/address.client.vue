<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { setLocale } from "yup";
import { ru } from "@/assets/yupLocaleRu.js";

const auth = useAuthStore();
const user = useUserStore();

const addressPopupVisible = ref(false);

setLocale(ru);

const validationSchema = yup.object({
    address: yup.string().required().label("Адрес"),
});

const { errors, defineField, handleSubmit } = useForm({ validationSchema });
const [address, addressAttrs] = defineField("address");

const onSubmit = handleSubmit(async (values) => {
    const isChanged = await user.changeUserInfo(values, "address");
    addressPopupVisible.value = !isChanged;
});

const errorsFromBack = computed(() => {
    const address = (auth.response.error?._data?.errors?.address || [])[0];

    return { address };
});

address.value = user.address || "";

init();

async function init() {
    if (!auth.authData.userId) return;
    if (user.address) return;

    await user.getUserInfo(auth.authData.userId);
    if (user.address) address.value = user.address;
    // address.value = user.address || "";
}
</script>

<template>
    <div>
        <Title>Адрес</Title>
        <template v-if="!auth.loading">
            <h1>Адрес</h1>
            <p v-if="user.address" class="address">{{ user.address }}</p>
            <p v-else class="address">Адрес не указан. Вы можете это исправить ;)</p>
            <Button @click="addressPopupVisible = true" label="Уточнить" raised class="submit-button">
                <template #icon>
                    <i class="icon_edit edit-icon"></i>
                </template>
            </Button>

            <Dialog
                v-model:visible="addressPopupVisible"
                modal
                dismissableMask
                header="Редактировать адрес"
                :style="{ width: '30rem' }"
            >
                <textarea
                    v-model="address"
                    v-bind="addressAttrs"
                    name="address"
                    rows="8"
                    placeholder="Введите адрес"
                    :class="{ invalid: !!errors.address }"
                    class="textinput textarea"
                ></textarea>

                <small v-if="errors.address || errorsFromBack.address" class="error">
                    {{ errors.address || errorsFromBack.address }}
                </small>

                <div class="confirm-buttons">
                    <Button
                        label="Отмена"
                        @click="addressPopupVisible = false"
                        severity="danger"
                        raised
                        class="submit-button"
                    />
                    <Button @click="onSubmit" label="Сохранить" :loading="auth.loading" raised class="submit-button" />
                </div>
            </Dialog>
        </template>
    </div>
</template>

<style scoped>
.address {
    color: #5f5f5f;
}
.edit-icon {
    margin-right: 0.5rem;
    font-size: 1.3rem;
    line-height: 100%;
}

.submit-button {
    height: 2.75rem;
}

.textarea {
    width: 100%;
    resize: none;
}

.error {
    color: red;
}

.confirm-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
    margin-top: 1rem;
    margin-bottom: 0;
}
</style>
