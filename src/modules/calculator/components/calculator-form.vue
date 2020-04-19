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
    import { defineComponent } from '@vue/composition-api';
    import FormSwitch from '@/core/components/forms/form-switch/form-switch.vue';
    import FormRadioGroup from '@/core/components/forms/form-radio-group';
    import { BaseCalculatorFormModel } from '../types/calculator-model';
    import { useTaxOptions } from '../composition-functions/use-tax-options';

    interface CalculatorFormProps {
        value: BaseCalculatorFormModel;
    }

    type UpdatedValueType = {
        [key: string]: unknown;
    }

    const CalculatorForm = defineComponent<CalculatorFormProps>({
        components: {
            FormSwitch,
            FormRadioGroup
        },
        props: {
            value: {
                required: true,
                type: Object
            }
        },
        setup(props, context) {
            const updateValue = (updatedValue: UpdatedValueType) => {
                const newValue = { ...props.value, ...updatedValue };
                context.emit('input', newValue);
            };

            const { insuranceOptions, taxFormOptions } = useTaxOptions();

            return {
                updateValue,
                insuranceOptions,
                taxFormOptions
            };
        }
    });

    export default CalculatorForm;
</script>
