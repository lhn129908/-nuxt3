<template>
  <div class="m-life">
    <!--第一行-->
    <el-row>
      <!--轮播图组件-->
      <el-col :span="14">
        <IndexSlider />
      </el-col>
      <el-col :span="4">
        <div class="m-life-pic" />
      </el-col>
      <el-col :span="6">
        <div class="m-life-login">
          <h4>
            <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt />
          </h4>

          <p v-if="user.login" class="m-life-login-name">Hi！你好 {{ user.name }}</p>

          <div v-else>
            <p>
              <nuxt-link to="/register">
                <el-button round size="medium">注册</el-button>
              </nuxt-link>
            </p>
            <!--注册登录-->
            <p>
              <nuxt-link to="/login">
                <el-button round size="medium">立即登录</el-button>
              </nuxt-link>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--第二行-->
    <el-row>
      <el-col :span="7">
        <div class="m-life-hotel" />
      </el-col>
      <el-col :span="7">
        <div class="m-life-music" />
      </el-col>
      <el-col :span="4">
        <div class="m-life-coop" />
      </el-col>
      <el-col :span="6">
        <div class="m-life-downapp">
          <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="下载APP" />
          <p>美团APP手机版</p>
          <h4>
            <span class="red">1元起</span>
            <em class="gary">吃喝玩乐</em>
          </h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
const { user } = useUser();
</script>

<style lang="scss">
@import "@/assets/css/index/life.scss";
</style>