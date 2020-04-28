<template>
    <nav
        :class="name"
        class="nav"
    >
        <ul
            :class="`${name}__list`"
            class="nav__list"
        >
            <li
                v-for="navItem in navItems"
                :key="navItem.title"
                :class="`${name}__list-item`"
                class="nav__list-item"
            >
                <router-link
                    :to="navItem.to"
                    :class="`${name}__link`"
                    :active-class="`nav__link--active ${name}__link--active`"
                    class="nav__link"
                    exact
                >
                    <v-icon
                        :name="navItem.icon"
                        :class="`${name}__icon`"
                        class="nav__icon"
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

    interface BaseNavProps extends NavProps {
        name: string;
    }

    const BaseNav = defineComponent<BaseNavProps>({
        mixins: [NavMixin],
        props: {
            name: {
                required: true,
                type: String
            }
        }
    });

    export default BaseNav;
</script>

<style lang="scss" src="./base-nav.scss" />
