<template>
  <div class="relative group max-w-fit max-h-fit">
      <div class="absolute hidden max-w-48 group-hover:block z-40 p-2 bg-gray-700 text-white text-sm rounded-md" :class="tooltipLocation">
        <slot name="text"></slot>
      </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    location: {
        type: String,
        default: 'bottom',
    },
})

const tooltipLocation = computed(() => {
  return {
    'bottom-[calc(85%)]': props.location === 'top',
    'top-[calc(85%)]': props.location === 'bottom',
  };
});
</script>