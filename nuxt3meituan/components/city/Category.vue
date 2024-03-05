<template>
    <div>
        <!--A-Z的拼音字母-->
        <dl class="m-categroy">
            <dt>按拼音首字母选择：</dt>
            <dd v-for="item in list" :key="item">
                <!--点击每一个字母使用锚点定位到对应的id-->
                <a :href="'#city-' + item">{{ item }}</a>
            </dd>
        </dl>

        <!--具体城市信息-->
        <dl v-for="item in block" :key="item.title" class="m-categroy-section">
            <!--A-Z的标题信息-->
            <dt :id="'city-' + item.title">{{ item.title }}</dt>
            <!--A-Z下的城市信息-->
            <dd>
                <span v-for="c in item.city" :key="c">{{ c }}</span>
            </dd>
        </dl>
    </div>
</template>

<script setup>
import pyjs from 'js-pinyin'
const list = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
const block = ref([])

//获取所有城市的信息
const config = useRuntimeConfig();
const { allCity } = useallCity();
//服务器执行
if (config.API_BASE) {
    let { data } = await useFetch(`${config.API_BASE}/api/geo/city`);
    allCity.value = data.value.city
}
//客户端执行
else {
    let { data } = await useFetch(`/api/geo/city`);
    if (data.value) {
        allCity.value = data.value.city
    }
}

//处理allCity数据，转换成我们想要的数据
const setupBlock = () => {
    //A-Z的信息
    let p
    //A-Z的ascii值
    let c
    //保存城市信息的对象
    const d = {}
    //遍历城市
    allCity.value.forEach(city => {
        p = pyjs.getFullChars(city.name).toUpperCase().slice(0, 1)
        c = p.charCodeAt(0);
        if (c > 64 && c < 91) {
            if (!d[p]) {
                d[p] = [];
            }
            d[p].push(city.name)
        }
    });
    for (const [k, v] of Object.entries(d)) {
        block.value.push({
            title: k,
            city: v
        })
    }
    block.value.sort((item1,item2)=>{
        return item1.title.charCodeAt(0) - item2.title.charCodeAt(0)
    })
}
setupBlock()

</script>

<style lang="scss">
@import "@/assets/css/changeCity/categroy.scss";
</style>