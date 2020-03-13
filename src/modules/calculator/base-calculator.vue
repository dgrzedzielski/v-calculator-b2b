<template>
    <div class="base-calculator">
        <form
            class="base-calculator__form"
            @submit.prevent="() => {}"
        >
            <input-form-group
                v-model="form.netIncome"
                type="text"
                name="netIncome"
                inputmode="numeric"
                min="0"
                maxlength="12"
                label="Przychód netto"
                placholder="Wpisz wartość"
            />
            <form-radio-group
                v-model="form.taxForm"
                :options="taxFormOptions"
                name="taxForm"
                label="Forma opodatkowania"
            />
            <form-radio-group
                v-model="form.insuranceVariant"
                :options="insuranceOptions"
                name="insuranceVariant"
                label="Składka ZUS"
            />
            <form-switch
                v-model="form.optionalSicknessInsurance"
                name="optionalSicknessInsurance"
                label="Opcjonalne ubezpieczenie chorobowe"
            />
            <base-button
                success
                outline
                type="button"
                @click="isAddExpenseModalVisible = true"
            >
                <v-icon
                    name="plus-circle"
                    class="btn__icon"
                />
                <span class="btn__text">Dodaj wydatek</span>
            </base-button>
        </form>
        <div class="base-calculator__summary">
            <cash-result
                :value="result"
                label="Wypłata"
                icon="hand-holding-usd"
                type="primary-gradient"
            />
            <cash-result
                v-if="form.expenses.length > 0"
                :value="profit"
                :type="profit > 0 ? 'success' : 'danger'"
                label="Zysk"
                icon="chart-line"
            />
            <cash-result
                :value="grossIncome"
                class="mt-30"
                type="success"
                label="Kwota brutto"
            />
            <cash-result
                :value="vatCost"
                type="danger"
                label="VAT"
            />
            <cash-result
                :value="insuranceTotalCost"
                type="danger"
                label="ZUS"
            />
            <cash-result
                :value="revenueTax"
                type="danger"
                label="Podatek dochodowy"
            />
            <cash-result
                :value="taxSavings"
                type="success"
                label="Zaoszczędzono"
            />
            <cash-result
                :value="expensesTotal"
                type="danger"
                label="Wydatki"
            />
            <calculator-expenses-list
                v-if="form.expenses.length > 0"
                :expenses="form.expenses"
                @open-expense-edit="openExpenseEdit"
            />
        </div>
        <calculator-expense-form
            v-if="isAddExpenseModalVisible"
            :expense-to-edit="expenseToEdit"
            @add-expense="addExpense"
            @edit-expense="editExpense"
            @remove-expense="removeExpense"
            @close="closeExpenseForm"
        />
        <floating-button
            icon="save"
            title="Zapisz"
            @click="saveData"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import InputFormGroup from '@/core/components/forms/input-form-group.vue';
    import FormRadioGroup from '@/core/components/forms/form-radio-group.vue';
    import FormSwitch from '@/core/components/forms/form-switch.vue';
    import CashResult from '@/core/components/ui/cash-result.vue';
    import CalculatorExpenseForm from '@/modules/calculator/components/calculator-expense-form.vue';
    import CalculatorExpensesList from '@/modules/calculator/components/calculator-expenses-list.vue';
    import CalculatorService from '@/modules/calculator/calculator-service';
    import CalculatorFormModel from '@/modules/calculator/types/calculator-form-model';
    import Expense from './types/expense';
    import { TAX_FORM_OPTIONS, TaxForm } from './types/tax-form-options';
    import { INSURANCE_OPTIONS, InsuranceVariant } from './types/insurance-options';
    import FloatingButton from '@/core/components/ui/floating-button.vue';

    @Component({
        components: {
            FloatingButton,
            CalculatorExpensesList,
            CalculatorExpenseForm,
            CashResult,
            FormSwitch,
            FormRadioGroup,
            InputFormGroup
        }
    })
    export default class BaseCalculator extends Vue {
        form: CalculatorFormModel = {
            netIncome: 10000,
            taxForm: TaxForm.LINEAR,
            insuranceVariant: InsuranceVariant.START,
            optionalSicknessInsurance: false,
            expenses: []
        };
        isAddExpenseModalVisible = false;
        expenseToEdit: Expense | null = null;

        mounted() {
            const loadedResult = CalculatorService.load();

            if (loadedResult) {
                this.form = loadedResult;
            }
        }

        get insuranceOptions() {
            return INSURANCE_OPTIONS;
        }

        get taxFormOptions() {
            return TAX_FORM_OPTIONS;
        }

        get selectedInsuranceOption() {
            return this.insuranceOptions
                .find(option => option.id === this.form.insuranceVariant)!;
        }

        get selectedTaxForm() {
            return this.taxFormOptions
                .find(option => option.id === this.form.taxForm)!;
        }

        get socialContributionCost() {
            let result = this.selectedInsuranceOption.value.socialContribution;

            if (this.selectedInsuranceOption.value.additional) {
                result += this.selectedInsuranceOption.value.additional;
            }

            if (this.form.optionalSicknessInsurance) {
                result += this.selectedInsuranceOption.value.optionalSicknessInsurance;
            }

            return result;
        }

        get insuranceTotalCost() {
            return this.socialContributionCost +
                this.selectedInsuranceOption.value.healthInsurance;
        }

        get reductions() {
            const result = { vatReduction: 0, costReduction: 0 };

            this.form.expenses.forEach(({ grossValue, isCarExpense }) => {
                const { costReduction, vatReduction } =
                    CalculatorService.getReduction(grossValue, isCarExpense);
                result.vatReduction += vatReduction;
                result.costReduction += costReduction;
            });

            return result;
        }

        get revenue() {
            return this.form.netIncome -
                this.reductions.costReduction -
                this.socialContributionCost;
        }

        get revenueTax() {
            return CalculatorService.getRevenueTax(this.revenue, this.selectedTaxForm);
        }

        get grossIncome() {
            return CalculatorService.getGrossFromNet(this.form.netIncome);
        }

        get vatCost() {
            return Math.max(
                0,
                this.grossIncome - this.form.netIncome - this.reductions.vatReduction
            );
        }

        get result() {
            return (
                this.grossIncome -
                this.vatCost -
                this.insuranceTotalCost -
                this.revenueTax
            );
        }

        get expensesTotal() {
            return this.reductions.vatReduction + this.reductions.costReduction;
        }

        get taxSavings() {
            const baseRevenue = this.form.netIncome - this.socialContributionCost;

            return (CalculatorService.getRevenueTax(baseRevenue, this.selectedTaxForm) -
                this.revenueTax) +
                this.reductions.vatReduction;
        }

        get profit() {
            return this.result - this.expensesTotal;
        }

        openExpenseEdit(expense: Expense) {
            this.isAddExpenseModalVisible = true;
            this.expenseToEdit = expense;
        }

        closeExpenseForm() {
            this.isAddExpenseModalVisible = false;
            this.expenseToEdit = null;
        }

        addExpense(expense: Expense) {
            this.form.expenses.push(expense);
            this.closeExpenseForm();
        }

        editExpense(expense: Expense) {
            const index = this.form.expenses.findIndex(({ id }) => id === expense.id);
            this.$set(this.form.expenses, index, expense);
            this.closeExpenseForm();
        }

        removeExpense(expenseId: string) {
            this.form.expenses = this.form.expenses.filter(({ id }) => id !== expenseId);
            this.closeExpenseForm();
        }

        saveData() {
            CalculatorService.save(this.form);
            this.$toast.success('Zapisano pomyślnie');
        }
    };
</script>

<style lang="scss" src="./base-calculator.scss" />
