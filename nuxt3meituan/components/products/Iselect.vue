<template>
    <div class="m-product-select">
        <dl class="tab">
            <dt>
                {{ name }}
                <i class="el-icon-arrow-down el-icon--right" />
            </dt>
            <dd>
                <h3>{{ name }}</h3>
                <span v-for="(item,idx) in list" :key="idx" @click="spanClick(item)">{{ item }}</span>
            </dd>
        </dl>
    </div>
</template>

<script setup>
import { inject } from 'vue'
const props = defineProps({
    kind: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    list: {
        type: Array,
        default() {
            return []
        }
    }
})
const typesChange = inject('typesChange')
const areasChange = inject('areasChange')

//向父组件们去传递数据
const spanClick = (item)=>{
    if(props.kind.value === 'types'){
        typesChange(item)
    }
    else{
        areasChange(item)
    }
}

</script>