<template>
    <div v-if="props.data && props.columns" class="w-[calc(100vw-3rem)] rounded bg-gray-500 p-1 lg:max-w-[calc(100vw-19rem)]">
        <div class="data-table">
            <table class="min-w-full leading-normal text-gray-700">
                <thead>
                    <tr>
                        <th @click="sortTable(headers[0].value)" class="sticky left-0 top-0 !z-20">
                            {{ headers[0].text }}
                            <span class="sort-icons">
                                <span v-show="sorted_by === headers[0].value && start_order === 'asc'" class="sort-icon">▲</span>
                                <span v-show="sorted_by === headers[0].value && start_order === 'desc'" class="sort-icon">▼</span>
                                <span v-show="sorted_by !== headers[0].value" class="sort-icon">△</span>
                                <span v-show="sorted_by !== headers[0].value" class="sort-icon" style="visibility: hidden">▼</span>
                                <!-- Hidden but occupies space -->
                            </span>
                        </th>

                        <th v-for="(header, index) in headers.slice(1)" :key="index" @click="sortTable(header.value)">
                            {{ header.text }}
                            <span class="sort-icons">
                                <span v-show="sorted_by === header.value && start_order === 'asc'" class="sort-icon">▲</span>
                                <span v-show="sorted_by === header.value && start_order === 'desc'" class="sort-icon">▼</span>
                                <span v-show="sorted_by !== header.value" class="sort-icon">△</span>
                                <span v-show="sorted_by !== header.value" class="sort-icon" style="visibility: hidden">▼</span>
                                <!-- Hidden but occupies space -->
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in virtualItems" :key="item.id" class="bg-white">
                        <td class="sticky left-0 z-10 border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            {{ headers[0].formatter ? headers[0].formatter(resolvePath(item, headers[0].value, "-")) : resolvePath(item, headers[0].value, "-") }}
                        </td>
                        <template v-for="head in headers.slice(1)">
                            <td class="border-b border-gray-200 px-5 py-5 text-sm">
                                {{ head.formatter ? head.formatter(resolvePath(item, head.value, "-")) : resolvePath(item, head.value, "-") }}
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
    columns: { type: Array as PropType<Header[]>, required: true },
    data: { type: Array as PropType<AnyObject[]>, required: true },
});

const items = toRef(props, "data");
const headers = toRef(props, "columns");

const sorted_by = ref("");
const start_order = ref("asc");

const sortTable = (column: string) => {
    if (sorted_by.value === column) {
        start_order.value = start_order.value === "asc" ? "desc" : "asc";
    } else {
        sorted_by.value = column;
        start_order.value = "asc";
    }

    items.value.sort((a, b) => {
        let aValue = resolvePath(a, column);
        let bValue = resolvePath(b, column);

        if (Array.isArray(aValue)) {
            aValue = aValue.join(", ");
        }

        if (Array.isArray(bValue)) {
            bValue = bValue.join(", ");
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
            return start_order.value === "asc" ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === "string" && typeof bValue === "string") {
            if (start_order.value === "asc") {
                return aValue.localeCompare(bValue, undefined, {
                    numeric: true,
                    sensitivity: "base",
                });
            } else {
                return bValue.localeCompare(aValue, undefined, {
                    numeric: true,
                    sensitivity: "base",
                });
            }
        }
        return 0;
    });
};

const virtualItems = computed(() => {
    return items.value;
});

function resolvePath(object: any, path: string, defaultValue: any = null) {
    return path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), object);
}

interface Header {
    text: string;
    value: string;
    formatter?: (value: any) => string;
}

type AnyObject = Record<string, any>;
</script>

<style scoped lang="postcss">
.data-table {
    @apply h-[70vh] overflow-x-auto overflow-y-auto;
}

thead th {
    @apply cursor-pointer border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600;
    @apply sticky top-0 z-10;
}

th,
td {
    min-width: min-content;
    white-space: nowrap;
}

.sort-icons {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
}

.sort-icon {
    width: 10px;
}
</style>
