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
        <div class="app-header__nav-container">
            <app-nav-mobile
                v-if="isMobile"
                :nav-items="navItems"
            />
            <app-nav
                v-else
                :nav-items="navItems"
            />
            <base-button
                v-if="isUserLogged"
                outline
                size="small"
                theme="primary"
                @click="logout"
            >
                Wyloguj
            </base-button>
            <base-button
                v-else
                outline
                size="small"
                theme="primary"
                :to="{ name: 'auth.login' }"
            >
                Zaloguj
            </base-button>
        </div>
    </header>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from '@vue/composition-api';
    import { useMobileCheck } from '@/core/composition-functions/use-mobile-check';
    import { ToPropType } from '@/core/types/to-prop-type';
    import { useStore } from '../../../composition-functions/use-store';
    import AppNavMobile from '../app-nav-mobile';
    import AppNav from '../app-nav';
    import AuthService from '../../../../modules/auth/auth-service';

    type NavItem = {
        to: string | ToPropType;
        title: string;
        icon: string;
    }

    const AppHeader = defineComponent({
        components: { AppNavMobile, AppNav },
        setup() {
            const { isMobile } = useMobileCheck();
            const navItems: NavItem[] = [
                {
                    to: '/dashboard',
                    title: 'Dashboard',
                    icon: 'chart-line'
                },
                {
                    to: '/',
                    title: 'Kalkulator',
                    icon: 'calculator'
                },
                {
                    to: '/settings',
                    title: 'Ustawienia',
                    icon: 'sliders-h'
                }
            ];
            const $store = useStore();

            const isUserLogged = computed(() => $store.getters['auth/isUserLogged']);

            const logout = () => {
                AuthService.logout();
            };

            return { isMobile, navItems, isUserLogged, logout };
        }
    });

    export default AppHeader;
</script>

<style lang="scss" src="./app-header.scss" />
