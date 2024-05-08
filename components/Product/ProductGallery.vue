<script setup lang="ts">
const props = defineProps<{
    name?: string;
    photos?: string[];
}>();

/**
 * Если swiper загрузить до события mounted,
 * то время от времени вылетает ошибка.
 * Если загрузить после - не будет рендериться
 * на стороне сервера. Поэтому пришлось делать
 * фейковый слайдер, который отображается
 * до тех пор, пока не загрузится настоящий.
 */
const isMounted = ref(false);
const firstFivePhotos = computed(() => (props.photos ? props.photos.slice(0, 5) : []));
const dataIsLoaded = computed(() => props.photos && props.photos.length);
onMounted(() => {
    isMounted.value = true;
});

/**
 * Но даже после события mounted загрузка компонента swiper занимает время.
 * И чтобы не блокировать страницу, Swiper грузится как Lazy компонент.
 * А чтобы пользователь не смотрел на белый экран, фотки грузятся паралельно
 * и отображаются в виде фейкового слайдера, пока не загрузится настоящий.
 */
const isSwiperFullyLoaded = ref(false);
</script>

<template>
    <div class="wrapper">
        <template v-if="!isMounted">
            <template v-if="!dataIsLoaded">
                <div class="bigslide">
                    <div class="skeleton bigslide__skeleton"></div>
                    <div class="swiper-button-prev swiper-button-disabled"></div>
                    <div class="swiper-button-next swiper-button-disabled"></div>
                </div>
                <div class="lilslides">
                    <div v-for="n in 5" class="skeleton lilslides__slide lilslides__skeleton"></div>
                </div>
            </template>
            <template v-else>
                <div class="bigslide">
                    <img :src="firstFivePhotos[0]" :alt="name" />
                    <div class="swiper-button-prev swiper-button-disabled"></div>
                    <div class="swiper-button-next swiper-button-disabled"></div>
                </div>
                <div class="lilslides">
                    <div v-for="photo in firstFivePhotos" class="lilslides__slide">
                        <img :src="photo" :alt="name" />
                    </div>
                </div>
            </template>
        </template>

        <template v-else>
            <template v-if="!dataIsLoaded">
                <div class="bigslide">
                    <div class="skeleton bigslide__skeleton"></div>
                    <div class="swiper-button-prev swiper-button-disabled"></div>
                    <div class="swiper-button-next swiper-button-disabled"></div>
                </div>
                <div class="lilslides">
                    <div v-for="n in 5" class="skeleton lilslides__slide lilslides__skeleton"></div>
                </div>
            </template>
            <template v-else>
                <template v-if="!isSwiperFullyLoaded">
                    <div class="bigslide">
                        <img :src="firstFivePhotos[0]" :alt="name" />
                        <div class="swiper-button-prev swiper-button-disabled"></div>
                        <div class="swiper-button-next swiper-button-disabled"></div>
                    </div>
                    <div class="lilslides">
                        <div v-for="photo in firstFivePhotos" class="lilslides__slide">
                            <img :src="photo" :alt="name" />
                        </div>
                    </div>
                </template>
                <LazyProductSwiper
                    @vue:mounted="isSwiperFullyLoaded = true"
                    :photos="photos || []"
                    :name="name || ''"
                />
            </template>
        </template>
    </div>
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
.wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.bigslide {
    --swiper-navigation-color: #000;
    position: relative;
    width: 100%;
    height: 80%;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    &__skeleton {
        position: absolute;
        top: 0rem;
        bottom: 0.5rem;
        left: 0rem;
        right: 0rem;
        border-radius: 0.75rem;
    }
}

.lilslides {
    width: 100%;
    height: 20%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 0.5rem;

    &__slide {
        position: relative;
        width: 100%;
        height: 100%;
        opacity: 0.4;

        &:first-child {
            opacity: 1;
        }

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    &__skeleton {
        border-radius: 0.75rem;
    }
}
</style>
