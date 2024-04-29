<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/thumbs";

defineProps<{
    name: string;
    photos: string[];
}>();

const thumbsSwiper = ref();

const setThumbsSwiper = (swiper: any) => {
    thumbsSwiper.value = swiper;
};
</script>

<template>
    <swiper
        class="mySwiper"
        :spaceBetween="50"
        :navigation="true"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="[Navigation, Thumbs]"
    >
        <SwiperSlide v-for="item in photos">
            <img :src="item" :alt="name" />
        </SwiperSlide>
    </swiper>
    <swiper @swiper="setThumbsSwiper" :spaceBetween="10" :slidesPerView="5" :modules="[Thumbs]" class="myThumbSwiper">
        <SwiperSlide v-for="item in photos">
            <img :src="item" :alt="name" />
        </SwiperSlide>
    </swiper>
</template>

<style>
.swiper-button-prev,
.swiper-button-next {
    display: none;
}
@media (min-width: 630px) {
    .swiper-button-prev,
    .swiper-button-next {
        display: block;
    }
}
</style>

<style scoped lang="scss">
.swiper {
    --swiper-navigation-color: #000;
    --swiper-pagination-color: #000;
    width: 100%;
    height: 100%;
    // height: 480px;
    // padding: 50px;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    background-size: cover;
    background-position: center;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
.swiper-button-next {
    color: red;
}

.mySwiper {
    // height: 100%;
    width: 100%;
    height: 80%;
    // padding-left: 100px;

    .swiper-slide img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.myThumbSwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;

    .swiper-slide {
        width: 25%;
        height: 100%;

        opacity: 0.4;
        // width: 100px;
        // height: 300px;
        // margin-right: 15px;
        // padding-left: 15px;
    }
    .swiper-slide-thumb-active {
        opacity: 1;
    }
}
</style>
