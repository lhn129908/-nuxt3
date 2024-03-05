<template>
    <div class="page-order">
        <el-row>
            <el-col :span="4" class="navbar">
                <h3>我的美团</h3>
                <dl>
                    <dt>我的订单</dt>
                    <dd>
                        全部订单
                        <i class="el-icon-arrow-right" />
                    </dd>
                    <dd>
                        待付款
                        <i class="el-icon-arrow-right" />
                    </dd>
                    <dd>
                        待使用
                        <i class="el-icon-arrow-right" />
                    </dd>
                </dl>
                <dl>
                    <dt>我的收藏</dt>
                    <dd>
                        收藏的商家
                        <i class="el-icon-arrow-right" />
                    </dd>
                    <dd>
                        收藏的团购
                        <i class="el-icon-arrow-right" />
                    </dd>
                </dl>
                <dl>
                    <dt>抵用卷</dt>
                    <dd>
                        可用卷
                        <i class="el-icon-arrow-right" />
                    </dd>
                    <dd>
                        失效卷
                        <i class="el-icon-arrow-right" />
                    </dd>
                </dl>
            </el-col>

            <el-col :span="19" class="table">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部订单" name="all">
                        <OrderList :cur="cur" />
                    </el-tab-pane>
                    <el-tab-pane label="待付款" name="unpay">
                        <OrderList :cur="cur" />
                    </el-tab-pane>
                    <el-tab-pane label="待使用" name="unuse">
                        <OrderList :cur="cur" />
                    </el-tab-pane>
                    <el-tab-pane label="待评价" name="unreplay">
                        <OrderList :cur="cur" />
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const activeName = ref('all')
const handleClick = () => {
    console.log("tabItem click")
}

//用户没有登录的情况下不能访问订单页面，跳转登录页面
const router = useRouter();
const { user } = useUser();
if (!user.value.login) {
    router.push("/login")
}

const list = ref([])
//获取订单数据
const config = useRuntimeConfig()
let { data } = await useFetch(`/api/order/getOrders`, {
    server: false
})
watchEffect(() => {
    if (data.value) {
        list.value = data.value.list
    }
})



const cur = computed(() => {
    return list.value.filter(item => {
        if (activeName.value === 'unpay') {
            return item.status === 0
        }
        else if (activeName.value === 'all') {
            return true
        }
        else if (activeName.value === 'unuse') {
            return item.status === 1
        }
    })
})
</script>

<style lang="scss">
@import "@/assets/css/order/index.scss";
</style>