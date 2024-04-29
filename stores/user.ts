export const useUserStore = defineStore("user", () => {
    const auth = useAuthStore();

    const name = ref("");
    const email = ref("");
    const address = ref("");
    const phone = ref("");

    function logout() {
        name.value = "";
        email.value = "";
        address.value = "";
        phone.value = "";
    }

    async function getUserInfo(userId: number) {
        auth.loading = true;
        auth.response.success = auth.response.error = {};

        try {
            const resp = await auth.apiFetch<{ data: User }>(`users/${userId}`, {
                headers: auth.headers,
            });

            auth.response.success = resp;
            name.value = resp.data?.name;
            email.value = resp.data?.email;
            address.value = resp.data?.address;
            phone.value = resp.data?.phone;
        } catch (error: any) {
            auth.response.error = { ...error.response };
        }

        auth.loading = false;
    }

    async function changeUserInfo(payload: CommonObject, target: string) {
        const userId = auth.authData.userId;
        if (!userId) return false;

        auth.loading = true;
        auth.response.success = auth.response.error = {};

        try {
            const resp = await auth.apiFetch<CommonObject>(`users/${userId}/${target}`, {
                method: "PATCH",
                body: payload,
                headers: auth.headers,
            });

            auth.response.success = resp;

            if (target === "address") {
                address.value = payload.address;
            }

            if (target === "profile") {
                name.value = payload.name;
                phone.value = payload.phone;
            }

            if (target === "email") {
                email.value = payload.email;
            }

            auth.loading = false;

            return true;
        } catch (error: any) {
            auth.response.error = { ...error.response };
        }

        auth.loading = false;
        return false;
    }

    return {
        name,
        email,
        address,
        phone,
        logout,
        getUserInfo,
        changeUserInfo,
    };
});
