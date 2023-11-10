<script lang="ts" setup>
import { JSON2Preview } from '/@/Lodop';
import { getWidgetsJSON } from '/@/utils/tools';


const onPreivew = () => {
    JSON2Preview(getWidgetsJSON(), { text: 123,items:[{}] })
}
</script>
<template>
    <a-button type="primary" @click="onPreivew">预览</a-button>
</template>