<template>
    <div
        class="app"
    >
        <router-view v-if="isAuthReady" />
        <div
            v-else
            class="view view--centered"
        >
            <base-loader width="100px" />
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from '@vue/composition-api';
    import { provideStore } from '@/core/composition-functions/use-store';
    import { provideRouter } from '@/core/composition-functions/use-router';
    import store from '@/core/store';
    import router from '@/core/lib/router';

    const App = defineComponent({
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
