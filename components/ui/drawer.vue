<template>
    <div
        :class="`fixed top-0 z-50 h-full shadow-lg ${drawerSide === 'left' ? 'left-0' : 'right-0'} transform ${isOpen ? (drawerSide === 'left' ? '-translate-x-0' : 'translate-x-0') : drawerSide === 'left' ? '-translate-x-full' : 'translate-x-full'}`"
        class="w-64 bg-white text-gray-700 transition-transform duration-300"
    >
        <button @click="toggleDrawer" class="p-4">Close</button>
        This is some drawer content.
    </div>
</template>

<script setup>
const emit = defineEmits(["update:isOpen"]);

const props = defineProps({
    isOpen: Boolean,
    drawerSide: {
        type: String,
        default: "left",
        validator: (value) => ["left", "right"].includes(value),
    },
});

const toggleDrawer = () => {
    emit("update:isOpen", !props.isOpen);
};
</script>
