<template>
    <base-modal
        name="calculator-change-billing-period"
        @close="$emit('close')"
    >
        <template slot="heading">
            Zmień okres rozliczeniowy
        </template>
        <form @submit.prevent="onSubmit">
            <div class="flex">
                <form-select
                    v-model="month"
                    label="Miesiąc"
                    name="change-billing-month"
                    :options="monthOptions"
                />
                <input-form-group
                    v-model="year"
                    label="Rok"
                    class="ml-20"
                    name="change-billing-year"
                />
            </div>
            <base-button
                theme="primary"
                outline
            >
                Zmień
            </base-button>
        </form>
    </base-modal>
</template>

<script lang="ts">
    import { defineComponent, ref } from '@vue/composition-api';
    import BaseModal from '@/core/components/ui/base-modal';
    import FormSelect from '@/core/components/forms/form-select';
    import { BillingPeriod } from '../types/calculator-model';
    import { useMonths } from '../../../core/composition-functions/use-months';

    interface CalculatorChangeBillingPeriodProps {
        currentBillingPeriod: BillingPeriod;
    }

    const CalculatorChangeBillingPeriod = defineComponent<CalculatorChangeBillingPeriodProps>({
        components: { BaseModal, FormSelect },
        props: {
            currentBillingPeriod: {
                required: true,
                type: Object
            }
        },
        setup(props, { emit }) {
            const month = ref<string>(props.currentBillingPeriod.month);
            const year = ref<string>(props.currentBillingPeriod.year);

            const { months: monthOptions } = useMonths();

            const onSubmit = () => {
                emit('change', { month: month.value, year: year.value });
                emit('close');
            };

            return { onSubmit, month, year, monthOptions };
        }
    });

    export default CalculatorChangeBillingPeriod;
</script>
