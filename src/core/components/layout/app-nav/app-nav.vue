<template>
    <nav class="app-nav">
        <ul class="app-nav__list">
            <li
                v-for="navItem in navItems"
                :key="navItem.title"
                class="app-nav__list-item"
            >
                <router-link
                    :to="navItem.to"
                    class="app-nav__link"
                    active-class="app-nav__link--active"
                    exact
                >
                    <v-icon
                        :name="navItem.icon"
                        class="app-nav__icon"
                    />
                    <span>{{ navItem.title }}</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import { ToPropType } from '@/core/types/to-prop-type';

    const AppNav = defineComponent({
        props: {
            navItems: {
                required: true,
                type: Array
            }
        }
    });

    export default AppNav;
</script>

<style lang="scss" src="./app-nav.scss" />
