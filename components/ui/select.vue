<template>
    <div class="wrapper" ref="wrapper_ref" v-bind="$attrs">
        <div class="group relative flex w-full">
            <input v-model="input" @focus="focusHandler" class="w-full rounded-r" placeholder="Select..." />
            <icons-clear v-show="input" @click="clearInput" class="absolute right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 transform cursor-pointer group-hover:block" />
        </div>
        <div class="dropdown absolute z-40 mt-1 w-full bg-white" v-show="dropdown_visible" style="top: 100%">
            <template v-for="option in filtered_options" :key="option[props.value]">
                <div @click="selectHandler(option)" :class="[option[props.text] === prev_input ? 'rounded bg-green-200' : '']" class="option cursor-pointer p-2 hover:bg-gray-100">{{ option[props.text] }}</div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Option {
    [key: string]: string;
}

const props = defineProps({
    options: {
        type: Array as PropType<Option[]>,
        required: true,
    },
    text: {
        type: String,
        default: "text",
    },
    value: {
        type: String,
        default: "value",
    },
});

const input = ref<string>("");
const prev_input = ref<string>("");
const dropdown_visible = ref<boolean>(false);
const wrapper_ref = ref<HTMLElement | null>(null);
const value = defineModel<string>();

const focusHandler = () => {
    prev_input.value = input.value;
    input.value = "";
    dropdown_visible.value = !dropdown_visible.value;
};

const clearInput = () => {
    input.value = "";
    dropdown_visible.value = false;
};

const filtered_options = computed(() => {
    return props.options.filter((option) => option[props.text].toLowerCase().includes(input.value.toLowerCase()));
});

const selectHandler = (option: Option) => {
    input.value = option[props.text];
    prev_input.value = option[props.text];
    value.value = option[props.value];
    dropdown_visible.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
    if (wrapper_ref.value && !wrapper_ref.value.contains(event.target as Node)) {
        dropdown_visible.value = false;
        input.value = prev_input.value;
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="postcss">
.wrapper {
    @apply relative flex max-h-fit max-w-fit flex-col gap-1 text-gray-700;
    @apply rounded border border-gray-300;
}

input {
    @apply h-10 w-full rounded-l p-2;
}

button {
    @apply rounded-r bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300;
}

.dropdown {
    @apply max-h-48 w-full space-y-1 overflow-y-auto rounded border-2 border-gray-300 bg-white p-2 shadow-md;
}

.option {
    @apply p-1 hover:cursor-pointer hover:rounded hover:bg-gray-300;
}
</style>
