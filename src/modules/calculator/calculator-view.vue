<template>
    <div class="view view--centered">
        <div v-if="isUserLogged">
            kalkulatorek dla zalogowanych jest jeszcze niewdrożony XD
        </div>
        <base-calculator v-else />
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from '@vue/composition-api';
    import { useStore } from '@/core/composition-functions/use-store';
    import BaseCalculator from './components/base-calculator.vue';

    const CalculatorView = defineComponent({
        components: {
            BaseCalculator
        },
        setup() {
            const store = useStore();
            const isUserLogged = computed<boolean>(() => store.getters['auth/isUserLogged']);

            return {
                isUserLogged
            };
        }
    });

    export default CalculatorView;
</script>
