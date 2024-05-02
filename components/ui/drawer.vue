<template>
    <div
        :class="`fixed top-0 h-full z-50 shadow-lg ${drawerSide === 'left' ? 'left-0' : 'right-0'} transform ${isOpen ? (drawerSide === 'left' ? '-translate-x-0' : 'translate-x-0') : drawerSide === 'left' ? '-translate-x-full' : 'translate-x-full'}`"
        class="bg-white w-64 transition-transform duration-300 text-gray-700"
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
