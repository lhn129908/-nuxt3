<template>
  <main>
    <NuxtPage />
  </main>
</template>

<style>
@import "@/assets/css/main.css";
</style>


<script setup>
import { watchEffect } from 'vue';
const config = useRuntimeConfig();

//凡是需要根据这里的结果再去发送二次请求的请求 放到app.vue
//获取登录的用户数据
const { user } = useUser();
if (!config.API_BASE) {
  let { data } = await useFetch(`/api/users/userinfo`, { server: false });
  watchEffect(() => {
    if (data.value) {
      user.value = data.value;
    }
  })
}


//获取用户的定位数据
const { position } = usePosition();
if (config.API_BASE) {
  let { data: data2 } = await useFetch(`${config.API_BASE}/api/geo/getPosition`);
  position.value = data2.value.city;
}

</script>