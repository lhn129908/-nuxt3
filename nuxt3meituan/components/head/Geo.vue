<template>
    <div class="m-geo">
        <i class="el-icon-location" />
        {{ position }}
        <nuxt-link class="changeCity" to="/city">切换城市</nuxt-link>[香河 廊坊 天津]
    </div>
</template>

<script setup>
import { watchEffect } from 'vue';
const { position } = usePosition()
</script>