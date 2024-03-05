<template>
    <div class="m-product-categroy">
        <dl class="classic">
            <dt>全部</dt>
            <div class="dd">
                <dd v-for="(item,idx) in types" :key="idx">
                    <ProductsIselect :kind="'types'" :name="item.type" :list="item.module"></ProductsIselect>
                </dd>
            </div>
        </dl>
        <dl class="classic">
            <dt>全部</dt>
            <div class="dd">
                <dd v-for="(item,idx) in areas" :key="idx">
                    <ProductsIselect :kind="'areas'" :name="item.type" :list="item.module"></ProductsIselect>
                </dd>
            </div>
        </dl>
    </div>
</template>

<script setup>
//生命父亲传递的数据类型
const props = defineProps({
    types: {
        type: Array,
        default() {
            return []
        }
    },
    areas: {
        type: Array,
        default() {
            return []
        }
    }
})
</script>

<style lang="scss">
.m-product-categroy {
    padding: 15px 20px 0;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
}
.classic {
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    > dt {
        border-radius: 10px;
        background: #13d1be;
        color: #fff;
        height: 22px;
        line-height: 22px;
        width: 100px !important;
        box-sizing: border-box;
        margin-right: 40px;
        text-align: center;
    }
    > .dd {
        display: flex;
        flex-wrap: wrap;

        dd {
            border-bottom: none !important;
        }
    }
}
</style>