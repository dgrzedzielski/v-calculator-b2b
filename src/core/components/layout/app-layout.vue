<template>
    <div class="app">
        <app-header />
        <div class="app__content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import AppHeader from './app-header.vue';

    const AppLayout = defineComponent({
        components: { AppHeader }
    });

    export default AppLayout;
</script>

<style lang="scss" src="./app-layout.scss" />
