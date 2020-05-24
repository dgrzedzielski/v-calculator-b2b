<template>
    <div class="view view--centered">
        <base-calculator />
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from '@vue/composition-api';
    import BaseCalculator from './components/base-calculator.vue';

    const CalculatorView = defineComponent({
        components: {
            BaseCalculator
        }
    });

    export default CalculatorView;
</script>
