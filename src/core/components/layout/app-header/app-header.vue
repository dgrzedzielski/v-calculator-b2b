<template>
    <header class="app-header">
        <h1 class="app-header__heading">
            <router-link
                to="/"
                class="app-header__link"
            >
                RoboMSG
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
            <app-theme-switch />
        </div>
    </header>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from '@vue/composition-api';
    import { useMobileCheck } from '@/core/composition-functions/use-mobile-check';
    import { ToPropType, NavItem } from '@/core/types/nav';
    import { useStore } from '@/core/composition-functions/use-store';
    import AuthService from '@/modules/auth/auth-service';
    import AppNav from '../nav/app-nav';
    import AppNavMobile from '../nav/app-nav-mobile';
    import AppThemeSwitch from '../app-theme-switch';

    const AppHeader = defineComponent({
        components: { AppNavMobile, AppNav, AppThemeSwitch },
        setup() {
            const { isMobile } = useMobileCheck();
            const navItems: NavItem[] = [
                {
                    to: '/dashboard',
                    title: 'Estatística',
                    icon: 'chart-line'
                },
                {
                    to: '/calculator',
                    title: 'Disparo',
                    icon: 'message'
                },
                {
                    to: '/settings',
                    title: 'Robôs',
                    icon: 'robot'
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
