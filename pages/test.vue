<template>
    <div class="grid min-h-screen grid-cols-1 md:grid-cols-4">
        <div class="relative md:col-span-3">
            <NuxtImg src="/eg.jpg" alt="Background Image" layout="fill" objectFit="cover" class="absolute inset-0 h-full w-full" />
        </div>
        <div class="col-span-1 bg-white p-6">
            <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="mb-16 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <div class="space-y-6">
                        <div>
                            <label class="block font-medium text-gray-700" for="username"> Username </label>
                            <ui-input block v-model="form.username" data-test="username" placeholder="First Initial + Last Name" type="text" />
                        </div>

                        <div>
                            <label class="block font-medium text-gray-700" for="password"> Password </label>
                            <ui-input block @keyup.enter="login" v-model="form.password" data-test="password" placeholder="Your Password" type="password" />
                        </div>

                        <ui-button :loading="isLoading" block testing="login" secondary type="success" @click="login"> Sign In </ui-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
