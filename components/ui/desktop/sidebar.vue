<template>
    <aside class="sidebar">
        <div class="mb-6 flex h-16 shrink-0 items-end">
            <svg class="mr-5 h-12 w-12 text-white" viewBox="0 0 24 24">
                <path d="M10,21V18H3L8,13H5L10,8H7L12,3L17,8H14L19,13H16L21,18H14V21H10Z" fill="currentColor" />
            </svg>
            <span class="text-xl font-bold text-white">Evergreen</span>
        </div>

        <nav class="flex flex-1 flex-col">
            <ul class="flex flex-1 flex-col gap-y-4" role="list">
                <li>
                    <ul role="list" class="-mx-2">
                        <template v-for="link in navigation" :key="link.name">
                            <li>
                                <NuxtLink :href="link.href" class="link group">{{ link.name }}</NuxtLink>
                            </li>
                        </template>
                    </ul>
                </li>
                <li>
                    <div class="text-xs font-semibold text-green-200">Reporting</div>
                    <ul role="list" class="-mx-2 mt-1">
                        <template v-for="link in reporting" :key="link.name">
                            <li>
                                <NuxtLink :href="link.href" class="link group">{{ link.name }}</NuxtLink>
                            </li>
                        </template>
                    </ul>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
const navigation = computed(() => [
    { name: "Dashboard", href: "/", icon: "-", permission: true },
    { name: "Helpdesk", href: "/helpdesk", icon: "-", permission: true },
]);

const reporting = computed(() => [
    { name: "Appointments", href: "/reporting/appts", icon: "-", permission: true },
    { name: "Leads", href: "/reporting/leads", icon: "-", permission: true },
]);
</script>

<style scoped lang="postcss">
.sidebar {
    @apply hidden w-64 flex-shrink-0 bg-green-600 p-4 text-white lg:block;
}

.link {
    @apply flex p-2 hover:cursor-pointer hover:rounded hover:bg-green-700;
}
</style>
