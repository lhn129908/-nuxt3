<template>
    <dl class="m-sum-card">
        <!--商品描述基本信息-->
        <dt>
            <h1>{{ meta.name }}</h1>
            <el-rate v-model="rate" disabled />
            <span>{{ rate }}分</span>
            <span>人均￥{{ Number(meta.price) }}</span>
            <ul>
                <li @click="openMap(meta.location)">地址：{{ meta.address }}</li>
                <li>电话：{{ meta.tel }}</li>
            </ul>
            <ul class="tags clear">
                <li>
                    <img
                        style="width: 25px;height: 25px;margin-left: 8px"
                        src="http://p0.meituan.net/codeman/551290739062eda37e52999e2315f50c1887.png"
                    />
                    <p>提供wifi</p>
                </li>
            </ul>
        </dt>

        <!--商品描述图片轮播-->
        <dd>
            <el-carousel height="214px" indicator-position="none">
                <el-carousel-item v-for="(item,idx) in meta.img" :key="idx">
                    <h3>
                        <img :src="item.url" alt="item.title" width="100%" height="100%" />
                    </h3>
                </el-carousel-item>
            </el-carousel>
        </dd>
    </dl>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
    meta: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

const rate = computed(() => props.meta.rate || 0)

const openMap = (data)=>{
    console.log("打开地图",data)
}
</script>