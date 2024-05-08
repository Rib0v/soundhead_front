<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps<{
    name: string;
    photos: string[];
}>();

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper: any) => {
    thumbsSwiper.value = swiper;
};
</script>

<template>
    <Swiper
        class="main-gallery"
        id="swp1"
        :spaceBetween="50"
        :navigation="true"
        :centeredSlidesBounds="true"
        :thumbs="{ swiper: thumbsSwiper, autoScrollOffset: 2 }"
        :modules="[Navigation, Thumbs]"
    >
        <SwiperSlide v-for="item in photos">
            <img :src="item" :alt="name" />
        </SwiperSlide>
    </Swiper>

    <Swiper
        @swiper="setThumbsSwiper"
        id="swp2"
        :spaceBetween="10"
        :slidesPerView="5"
        :centeredSlidesBounds="true"
        :modules="[Thumbs]"
        class="nav-gallery"
    >
        <SwiperSlide v-for="item in photos">
            <img :src="item" :alt="name" />
        </SwiperSlide>
    </Swiper>
</template>

<style scoped lang="scss">
.main-gallery {
    --swiper-navigation-color: #000;
    --swiper-pagination-color: #000;
    text-align: center;
    height: 80%;

    .swiper-slide {
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}

.nav-gallery {
    height: 20%;
    .swiper-slide {
        overflow: hidden;
        height: 100%;
        width: 20%;

        opacity: 0.4;
        cursor: pointer;

        img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
    }
    .swiper-slide-thumb-active {
        opacity: 1;
    }
}
</style>
