<template>
    <div class="bg-slate-900">
        <div class="container mx-auto flex min-h-[100vh] flex-col justify-center p-6">
            <div class="mx-auto flex flex-row items-center gap-3">
                <svg class="h-12 w-12 fill-green-600" viewBox="0 0 24 24">
                    <path d="M10,21V18H3L8,13H5L10,8H7L12,3L17,8H14L19,13H16L21,18H14V21H10Z" />
                </svg>
                <div class="text-[2.5em] text-white">Evergreen</div>
            </div>
            <!--            <h2 class="text-center text-3xl font-medium tracking-tight text-white mt-3">Sign in to your account</h2>-->

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

<script lang="ts" setup>
import type { User } from "@/types/app.types";

const router = useRouter();
const route = useRoute();

const isLoading = ref(false);
const form = reactive({
    username: "",
    password: "",
});

interface UserObject {
    "ok": boolean,
    "token": string,
    "user": {
        "id": string,
        "firstName": string,
        "lastName": string,
        "name": string,
        "email": string,
        "mobile": string,
        "active": boolean,
        "branchTag": string
    }
}

const login = async () => {
    isLoading.value = true;

    try {
        const { data, error } = await useFetch<UserObject>(`https://users.evergreenmhi.net/auth/login`, {
            method: "POST",
            body: JSON.stringify(form),
        });

        isLoading.value = false;

        if (data.value?.user?.id) {
            localStorage.setItem("eg_user_v5", JSON.stringify(data.value.user));

            const redirectUrl: string = (route.query.redirect as string) || "/";
            await router.push(decodeURIComponent(redirectUrl));

        } else {
            console.error(error.value?.data.message);
        }
    } catch (err) {
        isLoading.value = false;
        console.trace(err);
    }
};
</script>
