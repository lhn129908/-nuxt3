<template>
    <div class="m-menu">
        <dl class="nav" @mouseleave="navdlLeave">
            <dt>全部分类</dt>
            <dd v-for="item in menu" :key="item.type" @mouseenter="navddEnter(item)">
                <i :class="item.type" />
                {{ item.name }}
                <span class="arrow" />
            </dd>
        </dl>
        <div v-if="kind" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
            <div v-for="item in curdetail.child" :key="item.title">
                <h4>{{ item.title }}</h4>
                <span v-for="v in item.child" :key="v">{{ v }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
//当前移动到主菜单的类型
const kind = ref('')
//定时器 用来解决移入到子菜单就隐藏子菜单的问题
const _timer = ref(null)
//菜单项
const config = useRuntimeConfig();
const { menu } = useMenu()

//服务器执行
if (config.API_BASE) {
    let { data } = await useFetch(`${config.API_BASE}/api/geo/menu`);
    menu.value = data.value.menu
}
//客户端执行
else {
    let { data } = await useFetch(`/api/geo/menu`);
    if (data.value) {
        menu.value = data.value.menu
    }
}


const curdetail = computed(() => {
    return menu.value.filter(item => {
        if (item.type === kind.value) {
            return item;
        }
    })[0]
})

const navdlLeave = () => {
    _timer.value = setTimeout(() => {
        kind.value = ""
    }, 200);
}
const navddEnter = (item) => {
    console.log(item)
    kind.value = item.type
}

const detailEnter = () => {
    clearTimeout(_timer.value)
}

const detailLeave = () => {
    kind.value = ""
}

</script>