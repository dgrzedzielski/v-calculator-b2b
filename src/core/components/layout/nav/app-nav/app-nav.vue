<template>
    <base-nav
        v-bind="$props"
        name="app-nav"
    />
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import { ToPropType } from '@/core/types/nav';
    import NavMixin, { NavProps } from '../nav-mixin';
    import BaseNav from '../base-nav';

    const AppNav = defineComponent<NavProps>({
        components: { BaseNav },
        mixins: [NavMixin]
    });

    export default AppNav;
</script>

<style lang="scss" src="./app-nav.scss" />
