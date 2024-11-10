export const useAuthStore = defineStore("auth", () => {
    const dialogVisible = ref(false);
    const dialogTab = ref(0);
    const authData = ref<AuthData>({});
    const loading = ref(false);
    const response = ref<{ success: CommonObject; error: CommonObject }>({ success: {}, error: {} });

    const logined = computed(() => !!authData.value?.token);

    const headers = computed(() => {
        const headers: CommonObject = { Accept: "application/json" };

        if (logined.value) {
            headers.Authorization = `Bearer ${authData.value.token}`;
        }

        return headers;
    });

    async function onRequest() {
        if (authData.value.tokenExp && isTokenExpires()) {
            await refresh();
        }
    }

    async function onResponseError({ request, response, options }: any) {
        /**
         * 403 = access токен просрочен,
         * делаем запрос на обнавление
         */
        if (response.status === 403) {
            await refresh();
            options.headers = headers.value;
        }

        /**
         * Админские маршруты выдают 404,
         * если у пользователя нет прав.
         * А 401 значит, что токен невалиден,
         * или юзер не вошел. Поэтому выкидываем
         * на страницу входа.
         */
        if (response.status === 401) {
            authData.value = {};
            removeFromLocalStorage("auth");
            navigateTo("/login");
        }
    }

    function init() {
        authData.value = loadObjFromLocalStorage("auth");
    }

    const apiFetch = $fetch.create({
        baseURL: addApiBase(""),
        credentials: "include",
        retryStatusCodes: [403, 408, 409, 425, 429, 500, 502, 503, 504],
        onRequest,
        onResponseError,
    });

    /**
     * Данные ответа в корне, вида resp.user_id
     * Инфа об ошибках - error.response._data (с подчеркиванием)
     */
    async function login(payload: LoginData) {
        loading.value = true;
        response.value.success = response.value.error = {};

        try {
            const resp = await $fetch<UserCredentials>(addApiBase("auth/login"), {
                method: "POST",
                body: payload,
                credentials: "include",
                headers: headers.value,
            });

            response.value.success = resp;

            if (resp.access) {
                authData.value = {
                    userId: resp.user_id,
                    token: resp.access,
                    tokenExp: resp.access_exp,
                };

                saveToLocalStorage("auth", authData.value);

                navigateTo("/personal");
                dialogVisible.value = false;
            }
        } catch (error: any) {
            response.value.error = { ...error.response };
        }

        loading.value = false;
    }

    async function signUp(payload: SignupData) {
        loading.value = true;
        response.value.success = response.value.error = {};

        try {
            const resp = await apiFetch<UserCredentials>("users", {
                method: "POST",
                body: payload,
                headers: headers.value,
            });

            response.value.success = resp;

            if (resp.access) {
                authData.value = {
                    userId: resp.user_id,
                    token: resp.access,
                    tokenExp: resp.access_exp,
                };

                saveToLocalStorage("auth", authData.value);

                navigateTo("/personal");
                dialogVisible.value = false;
            }
        } catch (error: any) {
            response.value.error = { ...error.response };
        }

        loading.value = false;
    }

    async function checkAccess() {
        loading.value = true;
        response.value.success = response.value.error = {};

        try {
            const resp = await apiFetch<CommonObject>("auth/checkacc", {
                headers: headers.value,
            });

            response.value.success = resp;
        } catch (error: any) {
            response.value.error = { ...error.response };
        }

        loading.value = false;
    }

    async function checkRefresh() {
        loading.value = true;
        response.value.success = response.value.error = {};

        try {
            const resp = await apiFetch<CommonObject>("auth/checkref", {
                headers: headers.value,
            });
            response.value.success = resp;
        } catch (error: any) {
            response.value.error = { ...error.response };
        }

        loading.value = false;
    }

    async function refresh() {
        // loading.value = true;
        response.value.success = response.value.error = {};

        try {
            const resp = await $fetch<UserCredentials>(addApiBase("auth/refresh"), {
                headers: headers.value,
                credentials: "include",
            });
            // response.value.success = resp;

            if (resp.access) {
                authData.value = {
                    userId: resp.user_id,
                    token: resp.access,
                    tokenExp: resp.access_exp,
                };

                saveToLocalStorage("auth", authData.value);
            }
        } catch (error: any) {
            // response.value.error = { ...error.response };

            if (error.response?.status == 401 || error.response?.status == 403) {
                authData.value = {};
                removeFromLocalStorage("auth");
                navigateTo("/login");
            }
        }

        // loading.value = false;
    }

    async function logout() {
        loading.value = true;

        response.value.success = response.value.error = {};

        try {
            const resp = await apiFetch<CommonObject>("auth/logout", {
                headers: headers.value,
            });
            response.value.success = resp;
        } catch (error: any) {
            response.value.error = { ...error.response };
        } finally {
            authData.value = {};
            removeFromLocalStorage("auth");
            navigateTo("/catalog");
            dialogVisible.value = false;
        }

        loading.value = false;
    }

    function isTokenExpires() {
        if (!authData.value.tokenExp) return true;

        if (Date.now() / 1000 > authData.value.tokenExp) {
            return true;
        }

        const timeToExpired = Math.floor(authData.value.tokenExp - Date.now() / 1000);
        return false;
    }

    function dialogOpen(index: number) {
        dialogTab.value = 0;
        dialogVisible.value = true;

        // Криво отображается без этого
        setTimeout(() => {
            dialogTab.value = index;
        }, 300);
    }

    return {
        dialogVisible,
        dialogTab,
        authData,
        loading,
        response,
        logined,
        headers,
        apiFetch,
        init,
        login,
        signUp,
        checkAccess,
        checkRefresh,
        refresh,
        logout,
        isTokenExpires,
        dialogOpen,
    };
});
