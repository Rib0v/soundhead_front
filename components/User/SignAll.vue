<template>
    <TabView v-model:active-index="useAuthStore().dialogTab" id="sign-tabview">
        <TabPanel>
            <template #header> <div class="tab">Вход</div> </template>
            <UserSignIn />
        </TabPanel>
        <TabPanel>
            <template #header> <div class="tab">Регистрация</div> </template>
            <UserSignUp />
        </TabPanel>
    </TabView>
</template>

<style scoped>
.tab {
    width: 7.75rem;
    text-align: center;
}
</style>
