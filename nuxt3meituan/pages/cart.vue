<template>
    <div class="page-cart">
        <el-row>
            <el-col v-if="cart.length" :span="24" class="m-cart">
                <CartList :cart-data="cart"></CartList>
                <p>
                    应付金额：
                    <em class="money">￥{{ total }}</em>
                </p>
                <!--提交订单按钮-->
                <div class="post">
                    <el-button type="primary" @click="submit" style="background-color:#13d1be">提交订单</el-button>
                </div>
            </el-col>
            <el-col v-else class="empty">购物车为空</el-col>
        </el-row>

        <el-dialog v-model="dialogVisible" title="提示" width="30%">
            <span>恭喜您，已成功下单,订单号:{{ orderData.id }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="router.push({ path: '/order' })">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
const route = useRoute();
const dialogVisible = ref(false)

//用户没有登录的情况下不能访问购物车页面，跳转登录页面
const router = useRouter();
const { user } = useUser();
if (!user.value.login) {
    router.push("/login")
}

//根据购物车的编号来获取购物车数据
//useFetch 在刷新页面或者通过a标签跳转页面的时候，会在服务器和客户端同时执行，以服务器执行为主 （server:true）
//useFetch 在通过nuxt-link跳转路由的时候，会在客户端执行(服务器不会执行)  （server:true）

//当server:false的时候，不论是通过nuxt-link跳转路由，还是刷新页面，请求总以客户端执行为主 (但是没有服务端渲染)
//当server:false的时候，要获取请求的结果，我们在watchEffect里面才能来获取
const cart = ref([])
const config = useRuntimeConfig()
let { data } = await useFetch(`/api/cart/getcart`, {
    params: {
        id: route.query.cartno
    },
    server: false
})

watchEffect(() => {
    console.log("data.value", data.value)
    if (data.value) {
        cart.value = data.value.cart;
    }
})

//计算属性
const total = computed(() => {
    let sum = 0;
    cart.value.map(item => {
        sum += item.price * item.count
    })
    return sum;
})

const orderData = ref({})
const submit = async () => {
    let { data } = await useFetch('/api/order/createOrder', {
        method: "post",
        body: {
            count: cart.value[0].count,
            price: cart.value[0].price,
            id: route.query.cartno
        }
    });
    if (data.value.code === 0) {
        dialogVisible.value = true
        orderData.value = data.value
    }
}
</script>

<style lang="scss">
@import "@/assets/css/cart/index.scss";
</style>
