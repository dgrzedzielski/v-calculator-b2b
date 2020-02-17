<template>
    <div class="base-calculator">
        <form
            class="base-calculator__form"
            @submit.prevent="() => {}"
        >
            <input-form-group
                v-model="netIncome"
                type="number"
                name="netIncome"
                inputmode="numeric"
                min="0"
                label="Przychód netto"
                placholder="Wpisz wartość"
            />
            <form-radio-group
                v-model="taxForm"
                :options="taxFormOptions"
                name="taxForm"
                label="Forma opodatkowania"
            />
            <form-radio-group
                v-model="insuranceVariant"
                :options="insuranceOptions"
                name="insuranceVariant"
                label="Składka ZUS"
            />
            <form-switch
                v-model="optionalSicknessInsurance"
                name="optionalSicknessInsurance"
                label="Opcjonalne ubezpieczenie chorobowe"
            />
        </form>
        <div class="base-calculator__summary">
            <cash-result
                label="Na rękę"
                icon="hand-holding-usd"
                :value="result"
            />
            <!--<cash-result
                label="Zysk"
                icon="chart-line"
                :value="result"
                type="success"
            />-->
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import InputFormGroup from '@/core/components/forms/input-form-group.vue';
    import FormRadioGroup from '@/core/components/forms/form-radio-group.vue';
    import FormSwitch from '@/core/components/forms/form-switch.vue';
    import { TAX_FORM_OPTIONS, TaxForm } from '@/modules/calculator/types/tax-form-options';
    import { INSURANCE_OPTIONS, InsuranceVariant } from '@/modules/calculator/types/insurance-options';
    import CashResult from '@/core/components/ui/cash-result.vue';
    import {
        getReductions,
        getInsuranceCost,
        getRevenueTax,
        getGrossFromNet
    } from '@/modules/calculator/logic/calculate-functions';
    import Expense from '@/modules/calculator/types/expense';
    import { VAT } from '@/modules/calculator/logic/tax-rates';

    @Component({
        components: { CashResult, FormSwitch, FormRadioGroup, InputFormGroup }
    })
    export default class BaseCalculator extends Vue {
        netIncome = 9000;
        taxForm = TaxForm.LINEAR;
        insuranceVariant = InsuranceVariant.START;
        optionalSicknessInsurance = false;
        expenses: Expense[] = [];

        get insuranceOptions() {
            return INSURANCE_OPTIONS;
        }

        get taxFormOptions() {
            return TAX_FORM_OPTIONS;
        }

        get selectedInsuranceOption() {
            return this.insuranceOptions.find(option => option.id === this.insuranceVariant);
        }

        get selectedTaxForm() {
            return this.taxFormOptions.find(option => option.id === this.taxForm);
        }

        get insuranceCost() {
            if (!this.selectedInsuranceOption) return 0;

            return getInsuranceCost(this.selectedInsuranceOption, this.optionalSicknessInsurance);
        }

        get reductions() {
            return getReductions(this.expenses);
        }

        get revenue() {
            return this.netIncome - this.insuranceCost - this.reductions.costReduction;
        }

        get revenueTax() {
            if (!this.selectedTaxForm) return 0;

            return getRevenueTax(this.revenue, this.selectedTaxForm);
        }

        get grossIncome() {
            return getGrossFromNet(this.netIncome);
        }

        get vatCost() {
            return VAT * this.netIncome - this.reductions.vatReduction;
        }

        get result() {
            return (
                this.grossIncome -
                this.vatCost -
                this.insuranceCost -
                this.revenueTax
            );
        }
    };
</script>

<style lang="scss" src="./base-calculator.scss" />
