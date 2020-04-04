<template>
    <form
        class="calculator-form"
        @submit.prevent="$emit('submit')"
    >
        <input-form-group
            :value="value.netIncome"
            type="text"
            name="netIncome"
            inputmode="numeric"
            min="0"
            maxlength="12"
            label="Przychód netto"
            placholder="Wpisz wartość"
            @input="$e => updateValue({ netIncome: Number($e) })"
        />
        <form-radio-group
            :value="value.taxForm"
            :options="taxFormOptions"
            name="taxForm"
            label="Forma opodatkowania"
            @input="$e => updateValue({ taxForm: $e })"
        />
        <form-radio-group
            :value="value.insuranceVariant"
            :options="insuranceOptions"
            name="insuranceVariant"
            label="Składka ZUS"
            @input="$e => updateValue({ insuranceVariant: $e })"
        />
        <form-switch
            :value="value.optionalSicknessInsurance"
            name="optionalSicknessInsurance"
            label="Opcjonalne ubezpieczenie chorobowe"
            @input="$e => updateValue({ optionalSicknessInsurance: $e })"
        />
        <slot />
    </form>
</template>

<script lang="ts">
    import { Component, Prop, Mixins } from 'vue-property-decorator';
    import { BaseCalculatorFormModel } from '@/modules/calculator/types/calculator-form-model';
    import FormSwitch from '@/core/components/forms/form-switch.vue';
    import FormRadioGroup from '@/core/components/forms/form-radio-group.vue';
    import CalculatorOptionsMixin from '@/modules/calculator/components/calculator-options-mixin';

    const copyObjectSimple = <T extends {}>(obj: T): T => JSON.parse(JSON.stringify(obj));

    @Component({
        components: {
            FormSwitch,
            FormRadioGroup
        }
    })
    export default class CalculatorForm extends Mixins(CalculatorOptionsMixin) {
        @Prop({ type: Object, required: true }) value!: BaseCalculatorFormModel;

        updateValue(updatedValue: { [key: string]: any }) {
            const newValue = { ...copyObjectSimple(this.value), ...updatedValue };
            this.$emit('input', newValue);
        }
    };
</script>
