<template>
    <div class="m-iselect">
        <span class="name">按省份选择:</span>
        <el-select
            v-model="province"
            placeholder="请选择省份"
            :popper-append-to-body="false"
            @change="provinceChange"
        >
            <el-option
                v-for="item in provincelist"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
        </el-select>

        <el-select
            v-model="city"
            collapse-tags
            style="margin-left: 20px"
            placeholder="请选择城市信息"
            :popper-append-to-body="false"
        >
            <el-option v-for="item in citylist" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <el-select
            v-model="searchText"
            filterable
            remote
            reserve-keyword
            placeholder="请输入要搜索的城市"
            :remote-method="remoteSearch"
            :loading="loading"
            @change="remoteChange"
        >
            <el-option
                v-for="item in searchlist"
                :key="item.id"
                :label="item.name"
                :value="item.name"
            ></el-option>
        </el-select>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const province = ref([]);
const city = ref([])
//1.获取所有省份信息
const config = useRuntimeConfig();
const { provincelist } = useProvince()
//服务器执行
if (config.API_BASE) {
    let { data } = await useFetch(`${config.API_BASE}/api/geo/province`);
    provincelist.value = data.value.province
}
//客户端执行
else {
    let { data } = await useFetch(`/api/geo/province`);
    if (data.value) {
        provincelist.value = data.value.province
    }
}

//2.获取当前所选择的省对应的城市信息
const citylist = ref([])
const provinceChange = async () => {
    let { data } = await useFetch(`/api/geo/province/${province.value}`);
    if (data.value) {
        citylist.value = data.value.city
    }
}

//3.远程搜索
const searchText = ref('')
const loading = ref(false)
const searchlist = ref([])
const { position } = usePosition();
const router = useRouter();
const remoteSearch = async (text) => {
    const { data } = await useFetch(`/api/geo/city`)
    searchlist.value = data.value.city.filter(item => item.name.indexOf(text) > -1)
}
const remoteChange = () => {
    const value = searchText.value
    position.value = value.substring(0, value.length - 1);
    router.push({ path: "/" })
}

</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>