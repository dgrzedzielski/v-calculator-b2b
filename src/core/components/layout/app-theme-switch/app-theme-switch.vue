<template>
    <button
        class="theme-switch"
        @click="toggleTheme"
    >
        <transition
            mode="out-in"
            name="switch-transition"
        >
            <v-icon
                v-if="currentTheme === Theme.DARK"
                key="sun"
                name="sun"
                title="Przełącz motyw na jasny"
            />
            <v-icon
                v-else
                key="moon"
                name="moon"
                title="Przełącz motyw na ciemny"
            />
        </transition>
    </button>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from '@vue/composition-api';

    enum Theme {
        DARK = 'dark',
        LIGHT = 'light'
    }

    const AppThemeSwitch = defineComponent({
        setup() {
            const currentTheme = ref<Theme>(Theme.DARK);

            onMounted(() => {
                currentTheme.value = document.body.getAttribute('data-theme') as Theme;
            });

            const setTheme = (theme: Theme) => {
                currentTheme.value = theme;
                localStorage.setItem('theme', theme);
                document.body.setAttribute('data-theme', theme);
            };

            const toggleTheme = () => {
                if (currentTheme.value === Theme.DARK) {
                    setTheme(Theme.LIGHT);
                } else {
                    setTheme(Theme.DARK);
                }
            };

            return {
                currentTheme,
                toggleTheme,
                Theme
            };
        }
    });

    export default AppThemeSwitch;
</script>

<style lang="scss" src="./app-theme-switch.scss" />
