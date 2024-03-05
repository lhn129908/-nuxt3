<template>
    <div class="m-products-list">
        <dl>
            <dd
                v-for="item in nav"
                :key="item.name"
                :class="[item.name, item.active ? 's-nav-active' : '']"
                @click="navSelect(item.txt)"
            >{{ item.txt }}</dd>
        </dl>

        <ProductsItem v-for="item in filterList" :key="item.name" :meta="item"></ProductsItem>
    </div>
</template>


<script setup>
import { ref, defineProps, computed } from 'vue'

const props = defineProps({
    list: {
        type: Array,
        default() {
            return []
        }
    }
})

const filterList = computed({
    get() {
        return props.list
    }
})

const nav = ref([
    {
        name: 's-default',
        txt: '智能排序',
        active: true
    },
    {
        name: 's-price',
        txt: '价格最低',
        active: false
    },
    {
        name: 's-visit',
        txt: '人气最高',
        active: false
    },
    {
        name: 's-comment',
        txt: '评价最高',
        active: false
    }
])

const navSelect = (txt) => {
    nav.value.map(item => {
        item.txt === txt ? item.active = true : item.active = false
    })
    filterList.value.sort((item1, item2) => {
        if (txt === "价格最低") {
            return item1.price - item2.price;
        }
        else if (txt === "人气最高") {
            return item2.comment - item1.comment;
        }
        else if (txt === "评价最高") {
            return item2.rate - item1.rate;
        }
    })
}
</script>