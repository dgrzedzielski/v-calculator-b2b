<template>
    <nav class="app-nav-mobile">
        <ul class="app-nav-mobile__list">
            <li
                v-for="navItem in navItems"
                :key="navItem.title"
                class="app-nav-mobile__list-item"
            >
                <router-link
                    :to="navItem.to"
                    class="app-nav-mobile__link"
                    active-class="app-nav-mobile__link--active"
                    exact
                >
                    <v-icon
                        :name="navItem.icon"
                        class="app-nav-mobile__icon"
                    />
                    <span>{{ navItem.title }}</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import { ToPropType } from '@/core/types/nav';
    import NavMixin, { NavProps } from '../nav-mixin';

    const AppNavMobile = defineComponent<NavProps>({
        mixins: [NavMixin]
    });

    export default AppNavMobile;
</script>

<style lang="scss" src="./app-nav-mobile.scss" />
