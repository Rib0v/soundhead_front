<script setup lang="ts">
import { useForm, configure } from "vee-validate";
import * as yup from "yup";
import { setLocale } from "yup";
import { ru } from "@/assets/yupLocaleRu.js";

const auth = useAuthStore();
const cart = useCartStore();
const user = useUserStore();
const order = useOrderStore();

const deliveryTipe = ref("self");

setLocale(ru);
configure({ validateOnModelUpdate: false });

const validationSchema = yup.object({
    name: yup.string().required("Имя обязательно для заполнения").label("Имя"),
    phone: yup.string().required().label("Телефон"),
    email: yup.string().email().required().label("Email адрес"),
    address: yup.string().nullable().label("Адрес"),
    comment: yup.string().nullable().label("Комментарий"),
});

const { errors, defineField, handleSubmit } = useForm({ validationSchema });
const [name, nameAttrs] = defineField("name");
const [phone, phoneAttrs] = defineField("phone");
const [email, emailAttrs] = defineField("email");
const [address, addressAttrs] = defineField("address");
const [comment, commentAttrs] = defineField("comment");

name.value = "";
phone.value = "";
email.value = "";
address.value = "";
comment.value = "";

const onSubmit = handleSubmit((values) => {
    order.createOrder(values);
});

init();

async function init() {
    if (!cart.cartList.length) {
        navigateTo("/catalog");
        return;
    }
    if (!auth.logined || !auth.authData.userId) return;

    if (!user.name || !user.email || !user.address || !user.phone) {
        await user.getUserInfo(auth.authData.userId);
    }

    name.value = user.name || "";
    phone.value = user.phone || "";
    email.value = user.email || "";
    address.value = user.address || "";
}

const errorsFromBack = computed(() => {
    const name = (auth.response.error?._data?.errors?.name || [])[0];
    const phone = (auth.response.error?._data?.errors?.phone || [])[0];
    const email = (auth.response.error?._data?.errors?.email || [])[0];
    const address = (auth.response.error?._data?.errors?.address || [])[0];
    const comment = (auth.response.error?._data?.errors?.comment || [])[0];

    return { name, phone, email, address, comment };
});
</script>

<template>
    <div>
        <Title>Оформление заказа</Title>
        <div class="wrapper">
            <div class="order">
                <div v-if="cart.cartList.length" class="order__clientinfo">
                    <h1>Оформление заказа</h1>
                    <div class="order__options">
                        <template v-if="!auth.logined">
                            <h2>Авторизация</h2>
                            <p>Вы можете войти, зарегистрироваться или продолжить без регистрации.</p>
                            <Button @click="auth.dialogOpen(0)" class="login-button">Вход</Button>
                            <Button @click="auth.dialogOpen(1)">Регистрация</Button>
                            <hr />
                        </template>
                        <h2>Способ доставки</h2>
                        <p>Выберите удобный способ доставки.</p>

                        <div class="radiolist">
                            <RadioBox v-model="deliveryTipe" checked name="delivery" value="self">Самовывоз</RadioBox>
                            <RadioBox v-model="deliveryTipe" name="delivery" value="courier"
                                >Доставка курьером</RadioBox
                            >
                            <RadioBox v-model="deliveryTipe" name="delivery" value="mail">Доставка почтой</RadioBox>
                        </div>

                        <hr />
                        <h2>Способ оплаты</h2>
                        <p>Выберите подходящий способ оплаты.</p>

                        <div class="radiolist">
                            <RadioBox checked name="pay" value="cash">Наличными</RadioBox>
                            <RadioBox name="pay" value="card">Картой</RadioBox>
                            <RadioBox name="pay" value="credit">В рассрочку</RadioBox>
                        </div>
                        <hr />
                    </div>

                    <form name="order" @submit.prevent="onSubmit" class="order__contacts">
                        <h2>Контактные данные</h2>
                        <div class="inputs">
                            <div class="group">
                                <label for="name">Имя:</label>
                                <input
                                    type="text"
                                    v-model="name"
                                    v-bind="nameAttrs"
                                    :class="{ invalid: !!errors.name }"
                                    placeholder="Введите имя"
                                    id="name"
                                    name="name"
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
                                    placeholder="Введите телефон"
                                    id="phone"
                                    name="phone"
                                    class="textinput input"
                                />
                                <small v-if="errors.phone || errorsFromBack.phone" class="error">
                                    {{ errors.phone || errorsFromBack.phone }}
                                </small>
                            </div>

                            <div class="group">
                                <label for="email">Электронная почта:</label>
                                <input
                                    type="email"
                                    v-model="email"
                                    v-bind="emailAttrs"
                                    :class="{ invalid: !!errors.email }"
                                    placeholder="Введите email"
                                    id="email"
                                    name="email"
                                    class="textinput input"
                                />
                                <small v-if="errors.email || errorsFromBack.email" class="error">
                                    {{ errors.email || errorsFromBack.email }}
                                </small>
                            </div>

                            <div v-show="deliveryTipe !== 'self'" class="group">
                                <label for="address">Адрес:</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    v-model="address"
                                    v-bind="addressAttrs"
                                    :class="{ invalid: !!errors.address }"
                                    rows="4"
                                    placeholder="Введите адрес"
                                    class="textinput textarea"
                                ></textarea>
                                <small v-if="errors.address || errorsFromBack.address" class="error">
                                    {{ errors.address || errorsFromBack.address }}
                                </small>
                            </div>

                            <div class="group">
                                <label for="comment">Комментарий к заказу:</label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    v-model="comment"
                                    v-bind="commentAttrs"
                                    :class="{ invalid: !!errors.comment }"
                                    rows="4"
                                    placeholder="Есть ли у вас пожелания? :)"
                                    class="textinput textarea"
                                ></textarea>
                                <small v-if="errors.comment || errorsFromBack.comment" class="error">
                                    {{ errors.comment || errorsFromBack.comment }}
                                </small>
                            </div>
                            <Button type="submit" label="Создать заказ" raised class="submit-button">
                                <template #icon>
                                    <i class="icon_post_add icon"></i>
                                </template>
                            </Button>
                        </div>
                    </form>
                </div>

                <div v-else class="order__clientinfo">
                    <p>Ваша корзина пуста. Добавьте что-нибудь, чтобы сделать заказ.</p>
                    <NuxtLink to="/catalog" class="p-button p-button-raised link">Каталог</NuxtLink>
                </div>

                <div class="order__productlist">
                    <h2>Мой заказ</h2>
                    <OrderMini />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
h1 {
    margin-bottom: 0;
    margin-top: 0.5rem;
}
hr {
    border: 0;
    border-bottom: 1px solid #ddd;
    margin: 2rem 0;
}
.login-button {
    margin-right: 0.5rem;
}
.wrapper {
    margin: 0 auto;
    max-width: 1200px;
}
.order {
    display: grid;
    gap: 2rem;
    @media (min-width: 790px) {
        grid-template-columns: 1fr 21rem;
    }

    @media (min-width: 960px) {
        grid-template-columns: 1fr 25rem;
        gap: 6rem;
    }
}

.link {
    text-decoration: none;
}

.radiolist {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.error {
    color: red;
}

.group {
    display: grid;
    row-gap: 0.75rem;
}

.input {
    height: 2.75rem;
    width: 100%;
}

.textarea {
    width: 100%;
    resize: none;
}

.submit-button {
    height: 3.5rem;
    align-self: self-start;
}

.icon {
    margin-right: 0.3rem;
    font-size: 1.5rem;
    line-height: 95%;
}
</style>
