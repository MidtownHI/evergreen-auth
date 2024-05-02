<template>
    <div class="flex items-center justify-center">
        <label for="toggle" class="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" value="" id="toggle" class="peer sr-only" v-model="isToggled" />
            <div
                class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:peer-focus:ring-blue-800"
            ></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300" v-text="isToggled ? 'Enabled' : 'Disabled'"></span>
        </label>
    </div>
</template>

<script setup lang="ts">
const isToggled = defineModel({ default: false, type: Boolean });
</script>
