<template>
    <ui-tooltip location="bottom">
        <ui-button color="ghost" @click="show = !show">{{ buttonText }}</ui-button>
        <template #text>
            <span v-for="(text, index) in selectedTexts" :key="index">{{ text }}<br v-if="index < selectedTexts.length - 1" /></span>
            <span v-if="selectedTexts.length === 0">None Selected</span>
        </template>
    </ui-tooltip>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="modal-content rounded-lg bg-white p-4 shadow-lg">
            <div class="grid grid-cols-3 gap-4">
                <div v-for="option in options" :key="option[props.value]" class="flex items-center">
                    <input type="checkbox" :id="option[props.value]" :value="option[props.value]" v-model="currentSelectedValues" class="mr-2 h-4 w-4" />
                    <label :for="option[props.value]">{{ option[props.text] }}</label>
                </div>
            </div>
            <div class="mt-4 flex flex-row items-end justify-between gap-2">
                <ui-button color="text" @click="clearSelection">Clear</ui-button>
                <div class="space-x-2">
                    <ui-button color="green" @click="saveSelection">Save</ui-button>
                    <ui-button @click="cancelSelection">Cancel</ui-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, type PropType } from "vue";

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
    title: {
        type: String,
        default: "Select...",
    },
});

const show = ref(false);
const selected = defineModel<string[]>("selected", { default: [], type: Array });
const initialSelectedValues = ref<string[]>([]);
const currentSelectedValues = ref<string[]>([]);
const selectedTexts = ref<string[]>([]);

const buttonText = computed(() => {
    return selectedTexts.value.length > 1 ? `${selectedTexts.value[0]} +${selectedTexts.value.length - 1}` : selectedTexts.value.length === 1 ? selectedTexts.value[0] : `${props.title} Select`;
});

watch(show, (newVal) => {
    if (newVal) {
        initialSelectedValues.value = [...selected.value];
        currentSelectedValues.value = [...selected.value];
        updateSelectedTexts();
    }
});

const updateSelectedTexts = () => {
    selectedTexts.value = props.options.filter((option) => currentSelectedValues.value.includes(option[props.value])).map((option) => option[props.text]);
};

const saveSelection = () => {
    selected.value = [...currentSelectedValues.value];
    updateSelectedTexts();
    console.log("Selected options:", selectedTexts.value);
    show.value = false;
};

const cancelSelection = () => {
    currentSelectedValues.value = [...initialSelectedValues.value];
    updateSelectedTexts();
    show.value = false;
};

const clearSelection = () => {
    currentSelectedValues.value = [];
    updateSelectedTexts();
};
</script>

<style scoped></style>
