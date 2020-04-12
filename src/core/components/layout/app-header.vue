<template>
    <header class="app-header">
        <h1 class="app-header__heading">
            <router-link
                to="/"
                class="app-header__link"
            >
                VCalcB2B
            </router-link>
        </h1>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';

    const AppHeader = defineComponent({});

    export default AppHeader;
</script>

<style lang="scss" src="./app-header.scss" />
