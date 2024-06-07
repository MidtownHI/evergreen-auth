<template>
    <div class="grid min-h-screen grid-cols-1 md:grid-cols-6">
        <div class="relative md:col-span-4">
            <NuxtImg src="/eg.jpg" alt="Background Image" layout="fill" objectFit="cover" class="absolute inset-0 h-full w-full" />
        </div>

        <div class="col-span-2 my-auto p-6">
            <div class="flex flex-row items-center">
                <svg class="m-0 h-24 w-24 fill-green-600 p-0" viewBox="0 0 24 24">
                    <path d="M10,21V18H3L8,13H5L10,8H7L12,3L17,8H14L19,13H16L21,18H14V21H10Z" />
                </svg>
                <div class="mt-3.5 text-6xl text-white">Evergreen</div>
            </div>

            <u-card>
                <div class="space-y-6">
                    <u-form-group label="Username">
                        <u-input aria-autocomplete="none" size="xl" block v-model="form.username" data-test="username" placeholder="First Initial + Last Name" type="text" />
                    </u-form-group>

                    <u-form-group label="Password">
                        <u-input aria-autocomplete="none" size="xl" block @keyup.enter="login" v-model="form.password" data-test="password" placeholder="Your Password" type="password" />
                    </u-form-group>

                    <u-button :loading="isLoading" block testing="login" secondary type="success" @click="login"> Sign In </u-button>
                </div>
            </u-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
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

async function login() {
    isLoading.value = true;

    const resp = await $fetch<UserObject>(`https://users.evergreenmhi.net/auth/login`, {
        method: "POST",
        body: JSON.stringify(form),
    });

    const old_resp = await $fetch("https://api.evergreenmhi.com/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
    });

    localStorage.setItem("eg_user", JSON.stringify(old_resp));

    isLoading.value = false;

    const inProduction = computed(() => {
        return process.env.NODE_ENV === "production";
    });

    const userTokenCookie = useCookie("evergreen_u", {
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
        ...(inProduction.value && { domain: ".evergreenmhi.com" }),
        ...(inProduction.value && { secure: true }),
        sameSite: "lax",
    });

    const apps: { [key: string]: string } = {
        inbox: "https://inbox.evergreenmhi.com",
        five: "https://five.evergreenmhi.com",
        reporting: "https://reporting.evergreenmhi.com",
    };

    userTokenCookie.value = JSON.stringify({ token: resp.token, user: resp.user });

    const redirectUrl: string = route.query.redirect as string;

    if (redirectUrl in apps) {
        window.location.href = apps[redirectUrl];
    }
}
</script>
