<template>
    <div class="m-crumbs">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">{{ position }}美团</el-breadcrumb-item>
            <el-breadcrumb-item>{{ position }}{{ decodeURIComponent($route.query.name) }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup>
const { position } = usePosition()
</script>