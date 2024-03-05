<template>
    <section class="m-istyle">
        <dl>
            <dt>有格调</dt>
            <dd
                :class="{ active: kind === 'all' }"
                kind="all"
                keyword="景点"
                @mouseenter="ddEnter('all')"
            >全部</dd>
            <dd
                :class="{ active: kind === 'part' }"
                kind="part"
                keyword="美食"
                @mouseenter="ddEnter('part')"
            >约会聚餐</dd>
            <dd
                :class="{ active: kind === 'spa' }"
                kind="spa"
                keyword="丽人"
                @mouseenter="ddEnter('spa')"
            >丽人SPA</dd>
            <dd
                :class="{ active: kind === 'movie' }"
                kind="movie"
                keyword="电影"
                @mouseenter="ddEnter('movie')"
            >电影演出</dd>
            <dd
                :class="{ active: kind === 'travel' }"
                kind="travel"
                keyword="旅游"
                @mouseenter="ddEnter('travel')"
            >品质出游</dd>
        </dl>
        <ul class="ibody">
            <li v-for="item in cur" :key="item.name">
                <el-card :body-style="{ padding: '0px' }">
                    <img
                        :src="item.img && item.img.length != 0 ? item.img[0].url : ''"
                        class="image"
                    />
                    <ul class="cbody">
                        <li class="title">{{ item.name }}</li>
                        <li class="pos">
                            <span>{{ item.address }}</span>
                        </li>
                        <li class="price">
                            ￥
                            <em>{{ item.price }}</em>
                            <span>/起</span>
                        </li>
                    </ul>
                </el-card>
            </li>
        </ul>
    </section>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from 'vue'
const kind = ref('all');

//artistic数据
const config = useRuntimeConfig();
const { position } = usePosition();
const { artistic } = useArtistic();

const getArtisticList = async () => {
    let artisticURL = ""
    if (config.API_BASE) {
        artisticURL = `${config.API_BASE}/api/search/resultsByKeywords`
    }
    else {
        artisticURL = `/api/search/resultsByKeywords`
    }

    let { data } = await useFetch(artisticURL, {
        params: {
            city: position.value,
            keyword: kind.value
        }
    });
    if (data.value) {
        artistic.value[kind.value] = data.value.pois
    }
}
getArtisticList();

const cur = computed(() => {
    return artistic.value[kind.value]
})

const ddEnter = (type) => {
    kind.value = type;
    getArtisticList();
}
</script>


<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>