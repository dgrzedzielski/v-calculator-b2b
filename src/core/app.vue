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
    import { defineComponent, computed } from '@vue/composition-api';
    import { provideStore } from '@/core/composition-functions/use-store';
    import { provideRouter } from '@/core/composition-functions/use-router';
    import store from '@/core/store';
    import router from '@/core/lib/router';
    import AppLayout from '@/core/components/layout/app-layout';
    import AppTransition from '@/core/components/layout/app-transition';

    const App = defineComponent({
        components: { AppLayout, AppTransition },
        setup() {
            provideStore(store);
            provideRouter(router);
            const isAuthReady = computed<boolean>(() => store.state.auth.isReady);

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
