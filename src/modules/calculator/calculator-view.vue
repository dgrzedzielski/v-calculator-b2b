<template>
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100%;">
        <base-calculator />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import BaseCalculator from '@/modules/calculator/base-calculator.vue';

    @Component({
        components: { BaseCalculator }
    })
    export default class CalculatorView extends Vue {};
</script>
