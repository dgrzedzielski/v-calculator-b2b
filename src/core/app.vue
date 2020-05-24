<template>
    <app-layout v-if="isAuthReady">
        <app-transition>
            <router-view :key="$route.fullPath" />
        </app-transition>
    </app-layout>
    <div
        v-else
        class="view view--centered"
    >
        <base-loader width="100px" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import { provideRouter } from '@/core/composables/use-router';
    import router from '@/core/lib/router';
    import AppLayout from '@/core/components/layout/app-layout';
    import AppTransition from '@/core/components/layout/app-transition';
    import { useAuthStore } from '@/modules/auth/auth-store';

    const App = defineComponent({
        components: { AppLayout, AppTransition },
        setup() {
            provideRouter(router);
            const { isReady: isAuthReady } = useAuthStore();

            return {
                isAuthReady
            };
        }
    });

    export default App;
</script>

<style lang="scss">
    @import '../../scss/styles';
</style>
