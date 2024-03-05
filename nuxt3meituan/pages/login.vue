<template>
    <div class="page-login">
        <!--登录页面头部-->
        <div class="login-header">
            <a href="/" class="logo" />
        </div>
        <!--登录块内容-->
        <div class="login-panel">
            <!--左边图片-->
            <div class="banner">
                <img
                    src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
                    width="480"
                    height="370"
                    alt="美团网"
                />
            </div>

            <!--登录表单-->
            <div class="form">
                <!--登录错误提示-->
                <h4 v-if="error" class="tips">
                    <i />
                    {{ error }}
                </h4>
                <p class="title">
                    <span>账号登录</span>
                </p>
                <!--prefix-icon="password" 文本框左侧小图标，值为字体图标-->
                <el-input v-model="username" :prefix-icon="User" />
                <el-input v-model="password" type="password" :prefix-icon="Calendar" />
                <div class="foot">
                    <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
                    <b>忘记密码？</b>
                </div>
                <el-button class="btn-login" type="success" size="mini" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "blank"
}
</script>

<script setup>
import { ref } from 'vue'
import { Calendar, User } from '@element-plus/icons'
import CryptoJS from 'crypto-js'
import { useRouter } from 'vue-router'
const router = useRouter();
const { user } = useUser();

const username = ref('');
const password = ref('')
const checked = ref(true)
const error = ref('')

const login = async () => {
    //发送登录请求
    const { data } = await useFetch("/api/users/signin", {
        method: "post",
        body: {
            // encodeURIComponent: 对中文进行编码
            username: window.encodeURIComponent(username.value),
            // CryptoJS.MD5 加密
            password: CryptoJS.MD5(password.value).toString(),
        }
    })
    //当服务器返回的数据的code是0的时候，表示登录成功
    if (data.value.code === 0) {
        //登录成功之後，发送请求获取用户信息
        const { data: current } = await useFetch("/api/users/userinfo");
        //把获取到的用户信息保存到useState中，用作组件之间的数据共享
        user.value = current.value;
        //跳转首页
        router.push({ path: '/' })
    } else {
        error.value = data.value.msg
    }
}
</script>

<style lang="scss">
@import "@/assets/css/login/index.scss";
.form {
    .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }
}
</style>