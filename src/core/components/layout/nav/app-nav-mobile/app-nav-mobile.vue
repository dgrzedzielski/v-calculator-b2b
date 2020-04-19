<template>
    <base-nav
        v-bind="$props"
        name="app-nav-mobile"
    />
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import { ToPropType } from '@/core/types/nav';
    import BaseNav from '../base-nav';
    import NavMixin, { NavProps } from '../nav-mixin';

    const AppNavMobile = defineComponent<NavProps>({
        components: { BaseNav },
        mixins: [NavMixin]
    });

    export default AppNavMobile;
</script>

<style lang="scss" src="./app-nav-mobile.scss" />
