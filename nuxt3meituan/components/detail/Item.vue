<template>
    <li class="m-detail-item">
        <dl class="section">
            <dd>
                <img
                    :src="meta.photos && meta.photos.length != 0 ? meta.photos[0].url : ''"
                    :alt="meta.photos && meta.photos.length != 0 ? meta.photos[0].title : '默认'"
                />
            </dd>
            <dd>
                <h4>{{ meta.name }}</h4>
                <p>
                    <span v-if="meta.ticket_ording">剩余：{{ meta.ticket_ording }}</span>
                    <span v-if="meta.dealine">截止日期：{{ meta.dealine }}</span>
                </p>
                <p>
                    <span class="price">{{ Number(meta.cost) }}</span>
                    <sub>门店价{{ Number(meta.cost) }}</sub>
                </p>
            </dd>
            <dd>
                <el-button type="warning" round @click="createCart">立即抢购</el-button>
            </dd>
        </dl>
    </li>
</template>

<script setup>
const router = useRouter();

const props = defineProps({
    meta: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

const createCart = async () => {
    const { data } = await useFetch("/api/cart/create", {
        method: "post",
        body: {
            //随机生成一个商品id
            id: Math.random().toString().slice(3, 9),
            detail: {
                name: props.meta.name,
                price: props.meta.cost,
                imgs: props.meta.photos
            }
        }
    })
    if (data.value && data.value.code === 0) {
        router.push({
            path: "/cart",
            query: {
                cartno: data.value.id
            }
        })
    }
}
</script>

<style scoped>
.deal-need-login {
    text-align: left !important;
}
dd {
    text-align: left !important;
}
</style>