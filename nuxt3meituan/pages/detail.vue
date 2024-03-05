<template>
    <div class="page-detail">
        <el-row>
            <el-col :span="24">
                <DetailCrumbs />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <DetailSummary :meta="productList.length != 0 ? productList[0] : {}" />
            </el-col>
        </el-row>
        <el-row class="m-title">
            <el-col :span="24">
                <h3>商家团购及优惠</h3>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <DetailList
                    v-if="user.login"
                    :list="productList.length && productList[0].children"
                />
                <div v-else class="deal-need-login">
                    <span>请登录后查看详细团购优惠</span>
                    <el-button type="primary" round>
                        <a href="/login">立即登录</a>
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
const { position } = usePosition();
const route = useRoute();
const config = useRuntimeConfig();

//1.获取商品信息
const { productList } = useProduct();
const { user } = useUser();
//服务器执行
if (config.API_BASE) {
    let { data } = await useFetch(`${config.API_BASE}/api/search/resultsByKeywords`, {
        params: {
            city: position.value,
            keyword: route.query.keyword
        }
    });
    productList.value = data.value.pois
}
//客户端执行
else {
    let { data } = await useFetch(`/api/search/resultsByKeywords`, {
        params: {
            city: position.value,
            keyword: route.query.keyword
        }
    });
    if (data.value) {
        productList.value = data.value.pois
    }
}

</script>

<style lang="scss">
@import "@/assets/css/detail/index.scss";
</style>