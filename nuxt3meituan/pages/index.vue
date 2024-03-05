<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <IndexMenu />
      </el-col>
      <el-col :span="19">
        <IndexLife />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <IndexArtistic />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
@import "@/assets/css/public/header/index.scss";
@import "@/assets/css/index/index.scss";
</style>
