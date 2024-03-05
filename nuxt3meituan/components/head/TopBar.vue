<template>
    <!-- gutter	栅格间隔 -->
    <el-row :gutter="0" class="m-header">
        <!-- span	栅格占据的列数 (共24) -->
        <el-col :span="5">
            <HeadGeo></HeadGeo>
        </el-col>
        <el-col :span="5">
            <HeadUser></HeadUser>
        </el-col>
        <el-col :span="14">
            <HeadNav></HeadNav>
        </el-col>
    </el-row>
</template>