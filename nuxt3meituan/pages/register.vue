<template>
    <div class="page-register">
        <!--头部-->
        <article class="header">
            <header>
                <nuxt-link to="/" class="site-logo" />
                <span class="login">
                    <em class="bold">已有美团账号?</em>
                    <nuxt-link to="/login">
                        <el-button type="primary" size="small" style="background:#13d1be">登录</el-button>
                    </nuxt-link>
                </span>
            </header>
        </article>
        <section>
            <span style="color:red">{{ error }}</span>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                class="demo-ruleForm"
                label-width="100px"
            >
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" />
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" type="password" />
                </el-form-item>
                <el-form-item label="确认密码" prop="cpwd">
                    <el-input v-model="ruleForm.cpwd" type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register" style="background:#13d1be">同意以下协议并注册</el-button>
                </el-form-item>
                <el-form-item>
                    <a
                        class="f1"
                        href="http://www.meituan.com/about/terms"
                        target="_blank"
                    >《美团网用户协议》</a>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
export default {
    layout: "blank"
}
</script>

<script setup>
import { ref, reactive } from 'vue'
import CryptoJS from 'crypto-js'
import { useRouter } from 'vue-router'
const router = useRouter();

const error = ref('')

const ruleFormRef = ref()
const ruleForm = reactive({
    name: "",
    pwd: "",
    cpwd: "",
    email: ""
})

//确认密码的自定义校验器
const validatecpwd = (rule, value, callback) => {
    if (value !== ruleForm.pwd) {
        callback(new Error("两次密码需要一致"))
    } else {
        callback()
    }
}

const rules = reactive({
    name: [
        {
            required: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
        }
    ],
    pwd: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur"
        },
        {
            pattern: /\w{3,}/,
            message: '密码需要五位以上'
        }
    ],
    cpwd: [
        {
            required: true,
            message: "请输入确认密码",
            trigger: "blur"
        },
        {
            validator: validatecpwd,
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: true,
            type: "email",
            message: "请输入正确的邮箱",
            trigger: "blur"
        }
    ],
})

const register = () => {
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            const { data } = await useFetch("/api/users/signup", {
                method: "post",
                body: {
                    // encodeURIComponent: 对中文进行编码
                    username: window.encodeURIComponent(ruleForm.name),
                    // CryptoJS.MD5 加密
                    password: CryptoJS.MD5(ruleForm.pwd).toString(),
                    email: ruleForm.email
                }
            })
            if (data.value.code === 0) {
                router.push({ path: '/login' })
            }
            else {
                error.value = data.value.msg;
            }
        }
    });
}
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>