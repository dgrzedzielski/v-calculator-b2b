<template>
    <div>
        <base-calculator />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import FormSwitch from '@/core/components/forms/form-switch.vue';
    import BaseCalculator from '@/modules/calculator/base-calculator.vue';

    @Component({
        components: { BaseCalculator, FormSwitch }
    })
    export default class CalculatorView extends Vue {
        test = false;
    };
</script>
