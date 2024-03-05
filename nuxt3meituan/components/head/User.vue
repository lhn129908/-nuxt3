<template>
    <div class="m-user">
        <template v-if="user.login">
            欢迎您，
            <span class="username">{{ user.name }}</span>
            [
            <a @click.prevent="exit">退出</a>]
        </template>
        <template v-else>
            <nuxt-link to="/login" class="login">立即登录</nuxt-link>|
            <nuxt-link class="register" to="/register">注册</nuxt-link>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
//从useState中获取用户信息
const { user } = useUser()

const exit = async () => {
    let { data } = await useFetch(`/api/users/exit`);
    user.value = {};
}
</script>