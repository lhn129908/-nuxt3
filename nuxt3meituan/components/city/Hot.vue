<template>
    <div class="m-hcity">
        <dl>
            <dt>热门城市：</dt>
            <dd
                v-for="item in hotCity"
                :key="item.id"
            >{{ item.name === '市辖区' ? item.province : item.name }}</dd>
        </dl>
    </div>
</template>

<script setup>
//1.获取热门城市信息
const config = useRuntimeConfig();
const { hotCity } = usehotCity()
//服务器执行
if (config.API_BASE) {
    let { data } = await useFetch(`${config.API_BASE}/api/geo/hotcity`);
    hotCity.value = data.value.city
}
//客户端执行
else {
    let { data } = await useFetch(`/api/geo/hotcity`);
    if (data.value) {
        hotCity.value = data.value.city
    }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/hot.scss";
</style>