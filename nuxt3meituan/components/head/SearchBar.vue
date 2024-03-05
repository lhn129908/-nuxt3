<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <!--网站logo区域-->
            <el-col :span="3" class="left">
                <nuxt-link to="/">
                    <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团" />
                </nuxt-link>
            </el-col>
            <!--搜索框区域-->
            <el-col :span="15" class="center">
                <!--搜索文本框区域-->
                <div class="wrapper">
                    <el-input
                        v-model="search"
                        placeholder="搜索商家或地点"
                        @focus="focus"
                        @blur="blur"
                        @input="inputSearch"
                    />
                    <router-link
                        :to="{ path: '/products', query: { name: search } }"
                        class="el-button el-button--primary"
                        tag="button"
                        style="background:#13d1be"
                    >
                        <el-icon :size="20">
                            <Search />
                        </el-icon>
                    </router-link>
                    <dl class="searchList" v-if="isSearchList">
                        <dd v-for="(item) in searchList" :key="item.name">
                            <nuxt-link
                                :to="{ path: '/products', query: { name: item.name } }"
                            >{{ item.name }}</nuxt-link>
                        </dd>
                    </dl>
                </div>
                <!--搜索热门提示-->
                <div class="suggset">
                    <nuxt-link
                        v-for="(item, index) in hotPlace"
                        :key="index"
                        :to="{ path: '/products', query: { name: item.name } }"
                    >{{ item.name }}</nuxt-link>
                </div>
                <!--菜单导航-->
                <ul class="nav">
                    <li>
                        <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="business">商家入驻</nuxt-link>
                    </li>
                </ul>
            </el-col>
            <!--右侧内容区域-->
            <el-col :span="6" class="right">
                <ul class="security">
                    <li>
                        <i class="refund" />
                        <p class="txt">随时退</p>
                    </li>
                    <li>
                        <i class="single" />
                        <p class="txt">不满意免单</p>
                    </li>
                    <li>
                        <i class="overdue" />
                        <p class="txt">过期退</p>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>
    
<script setup>
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons'
import { usehotPlace } from '~~/composables/hotPlace'

//搜索文本框的内容
const search = ref('')
const isFocus = ref(false)

//热门搜索
const searchList = ref([{ "name": '迪士尼' }, { "name": '保健' }, { "name": '地锅鸡' }, { "name": '足浴' }])
const inputSearch = async () => {
    let { data } = await useFetch(`/api/search/top`, {
        method: "post",
        body: {
            city: position.value,
            input: search.value
        }
    });
    searchList.value = data.value.top.slice(0, 10)
}
const isSearchList = computed(() => search.value && isFocus.value)
const focus = () => {
    isFocus.value = true
}
const blur = () => {
    setTimeout(() => {
        isFocus.value = false
    }, 200);
}

//热门地点
const { hotPlace } = usehotPlace();
const config = useRuntimeConfig();
const { position } = usePosition();

let hotPlaceURL = ""
if (config.API_BASE) {
    hotPlaceURL = `${config.API_BASE}/api/search/hotPlace`
}
else {
    hotPlaceURL = `/api/search/hotPlace`
}
let { data } = await useFetch(hotPlaceURL, {
    params: {
        city: position.value,
        type: ""
    }
});
if (data.value) {
    hotPlace.value = data.value.top.slice(0, 5);
}

</script>