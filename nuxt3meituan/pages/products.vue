<template>
    <el-row class="page-product">
        <el-col :span="19">
            <ProductsCrumbs />
            <ProductsCategory :types="productcate.types" :areas="productcate.areas" />
            <ProductsList :list="productList" />
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, provide, watch } from 'vue'

//1.发送请求获取分类的数据
const config = useRuntimeConfig();
const { position } = usePosition();
const { productcate } = useProductcate();
if (config.API_BASE) {
    let { data } = await useFetch(`${config.API_BASE}/api/category/crumbs`, {
        params: {
            city: position.value
        }
    });
    productcate.value = data.value
}
//客户端执行
else {
    let { data } = await useFetch(`/api/category/crumbs`, {
        params: {
            city: position.value
        }
    });
    if (data.value) {
        productcate.value = data.value
    }
}


//2.向子孙组件暴露方法，以实现子孙组件点击分类信息向当前组件的数据通信
const typesChange = (type) => {
    console.log("typesChange", type)
}
const areasChange = (area) => {
    console.log("areasChange", area)
}
provide("typesChange", typesChange)
provide("areasChange", areasChange)


//3.准备列表数据
const { productList } = useProduct();
const route = useRoute();

const getProductList = async () => {
    if (config.API_BASE) {
        let { data } = await useFetch(`${config.API_BASE}/api/search/resultsByKeywords`, {
            params: {
                city: position.value,
                keyword: route.query.name
            }
        });
        productList.value = data.value.pois
    }
    //客户端执行
    else {
        let { data } = await useFetch(`/api/search/resultsByKeywords`, {
            params: {
                city: position.value,
                keyword: route.query.name
            }
        });
        if (data.value) {
            productList.value = data.value.pois
        }
    }
}
getProductList();

//监听路由变化，一旦路由变化之后重新发送请求获取新的数据
watch(route, () => {
    getProductList()
})

</script>


<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>