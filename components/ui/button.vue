<template>
    <button type="button" :disabled="props.disabled" :class="[base_classes, size_classes, color_classes, block_classes]">
        <div class="flex flex-row items-center justify-center gap-2">
            <ui-spinner v-if="props.loading" />
            <slot />
        </div>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    loading: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false, default: false },
    size: { type: String, required: false, default: "md" },
    color: { type: String, required: false, default: "gray" },
    block: { type: Boolean, required: false, default: false },
});

const base_classes = "rounded transition-all duration-200 ease-in-out shadow-sm max-w-fit";

const block_classes = computed(() => ({
    "w-full max-w-full": props.block,
}));

const color_classes = computed(() => ({
    "bg-gray-500 text-white hover:bg-gray-600": props.color === "gray",
    "bg-blue-500 text-white hover:bg-blue-600": props.color === "blue",
    "bg-red-500 text-white hover:bg-red-600": props.color === "red",
    "bg-green-500 text-white hover:bg-green-600": props.color === "green",
    "bg-transparent text-gray-700 hover:bg-gray-300 shadow-none border border-gray-300": props.color === "ghost",
    "bg-transparent text-blue-500 hover:text-gray-800 shadow-none !p-0": props.color === "text",
}));

const size_classes = computed(() => ({
    "px-4 py-3": props.size === "lg",
    "px-3 py-2": props.size === "md",
    "px-2 py-1": props.size === "sm",
}));
</script>
