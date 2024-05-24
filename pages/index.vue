<template>
    <div class="grid grid-cols-1 md:grid-cols-6 min-h-screen">
        <div class="relative md:col-span-4">
            <NuxtImg
                src="/eg.jpg"
                alt="Background Image"
                layout="fill"
                objectFit="cover"
                class="absolute inset-0 w-full h-full"
            />
        </div>

        <div class="col-span-2 p-6 my-auto">

            <div class="flex flex-row items-center">
                <svg class="h-24 w-24 fill-green-600 m-0 p-0" viewBox="0 0 24 24">
                    <path d="M10,21V18H3L8,13H5L10,8H7L12,3L17,8H14L19,13H16L21,18H14V21H10Z" />
                </svg>
                <div class="text-6xl text-white mt-3.5">
                    Evergreen
                </div>
            </div>



                <u-card>
                    <div class="space-y-6">
                            <u-form-group label="Username">
                            <u-input aria-autocomplete="none" size="xl" block v-model="form.username" data-test="username" placeholder="First Initial + Last Name" type="text" />
                            </u-form-group>

                            <u-form-group label="Password">
                                <u-input aria-autocomplete="none" size="xl" block @keyup.enter="login" v-model="form.password" data-test="password" placeholder="Your Password" type="password" />
                            </u-form-group>

                        <u-button :loading="isLoading" block testing="login" secondary type="success" @click="login">
                            Sign In
                        </u-button>
                    </div>
                </u-card>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { ref, reactive } from "vue";

const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const form = reactive({ username: "", password: "" });

interface UserObject {
    ok: boolean;
    token: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        name: string;
        email: string;
        mobile: string;
        active: boolean;
        branchTag: string;
    };
}

const login = async () => {
    isLoading.value = true;

    try {
        const { data, error } = await useFetch<UserObject>(`https://users.evergreenmhi.net/auth/login`, {
            method: "POST",
            body: JSON.stringify(form)
        });

        isLoading.value = false;

        const inProduction = computed(() => {
            return process.env.NODE_ENV === "production";
        });

        if (data.value?.ok) {
            const userTokenCookie = useCookie("evergreen_u", {
                path: "/",
                maxAge: 60 * 60 * 24, // 24 hours
                ...(inProduction.value && { domain: ".evergreenmhi.com" }),
                ...(inProduction.value && { secure: true }),
                sameSite: "lax"
            });

            userTokenCookie.value = JSON.stringify({ token: data.value.token, user: data.value.user });

            const redirectUrl: string = (route.query.redirect as string) || "https://five.evergreenmhi.com";

            // Check if the URL is external
            const isExternal = (url: string) => {
                try {
                    const u = new URL(url);
                    return u.origin !== window.location.origin;
                } catch {
                    // If URL isn't valid return false
                    return false;
                }
            };

            if (isExternal(redirectUrl)) {
                // If the URL is external, set window.location.href
                window.location.replace(decodeURIComponent(redirectUrl));
            } else {
                // Otherwise, use router.push for internal navigation
                await router.replace(decodeURIComponent(redirectUrl));
            }
        } else {
            console.error(error.value?.message);
        }
    } catch (err) {
        isLoading.value = false;
        console.trace(err);
    }
};
</script>
