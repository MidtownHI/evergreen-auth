<template>
    <div class="group relative max-h-fit max-w-fit">
        <div class="absolute z-40 hidden max-w-48 rounded-md bg-gray-700 p-2 text-sm text-white group-hover:block" :class="tooltipLocation">
            <slot name="text"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    location: {
        type: String,
        default: "bottom",
    },
});

const tooltipLocation = computed(() => {
    return {
        "bottom-[calc(85%)]": props.location === "top",
        "top-[calc(85%)]": props.location === "bottom",
    };
});
</script>
