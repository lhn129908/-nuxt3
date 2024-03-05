<template>
    <div class="m-detail-list">
        <ul>
            <li>{{ list.length }}款套餐</li>
            <DetailItem v-for="(item,idx) in list" :key="idx" :meta="item" />
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    list: {
        type: Array,
        default: () => {
            return []
        }
    }
})
</script>