<template>
    <input type="text" v-model="value" :class="[base_classes, block ? 'w-full' : 'w-48']" />
</template>

<script setup lang="ts">
const props = defineProps({
    block: {
        type: Boolean,
        default: false,
    },
});
const base_classes = "h-8 p-2 outline outline-gray-200 text-gray-700 rounded";

const value = defineModel();
</script>
