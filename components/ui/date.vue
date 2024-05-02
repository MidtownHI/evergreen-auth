<template>
    <div class="group relative flex w-full">
        <input type="date" v-model="selected_date" class="h-11 w-48 rounded border border-gray-300 px-2 text-gray-700 focus:outline-none" />
        <icons-clear v-show="selected_date" @click="clearInput" class="absolute right-10 top-1/2 hidden h-4 w-4 -translate-y-1/2 transform cursor-pointer group-hover:block" />
    </div>
</template>

<script setup lang="ts">
const selected_date = defineModel<string>();

const clearInput = () => {
    selected_date.value = "";
};
</script>
