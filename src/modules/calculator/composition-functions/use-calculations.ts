import { computed, Ref, ref } from '@vue/composition-api';
import { BaseCalculatorFormModel } from '@/modules/calculator/types/calculator-model';
import CalculationsService from '@/modules/calculator/calculations-service';
import useTaxOptions from '@/modules/calculator/composition-functions/use-tax-options';
import { TaxForm } from '@/modules/calculator/types/tax-form-options';
import { InsuranceVariant } from '@/modules/calculator/types/insurance-options';
import { Expense } from '@/modules/calculator/types/expense';
import CalculatorData from '../calculator-data';

type ReductionType = {
    costReduction: number;
    vatReduction: number;
}

const useCalculations = (data: CalculatorData) => {
    const { insuranceOptions, taxFormOptions } = useTaxOptions();

    const selectedInsuranceOption = computed(() => {
        return insuranceOptions
            .find(option => option.id === data.form.insuranceVariant)!;
    });

    const selectedTaxForm = computed(() => {
        return taxFormOptions
            .find(option => option.id === data.form.taxForm)!;
    });

    const socialContributionCost = computed(() => {
        let result = selectedInsuranceOption.value.value.socialContribution;

        if (selectedInsuranceOption.value.value.additional) {
            result += selectedInsuranceOption.value.value.additional;
        }

        if (data.form.optionalSicknessInsurance) {
            result += selectedInsuranceOption.value.value.optionalSicknessInsurance;
        }

        return result;
    });

    const insuranceTotalCost = computed(() => {
        return socialContributionCost.value +
            selectedInsuranceOption.value.value.healthInsurance;
    });

    const reductions = computed<ReductionType>(() => {
        const result = { vatReduction: 0, costReduction: 0 };
        data.expenses.forEach(({ grossValue, isCarExpense }) => {
            const { costReduction, vatReduction } =
                CalculationsService.getReduction(grossValue, isCarExpense);
            result.vatReduction += vatReduction;
            result.costReduction += costReduction;
        });

        return result;
    });

    const revenue = computed(() => {
        return data.form.netIncome -
            reductions.value.costReduction -
            socialContributionCost.value;
    });

    const revenueTax = computed(() => {
        return CalculationsService.getRevenueTax(revenue.value, selectedTaxForm.value);
    });

    const grossIncome = computed(() => {
        return CalculationsService.getGrossFromNet(data.form.netIncome);
    });

    const vatCost = computed(() => {
        return Math.max(
            0,
            grossIncome.value - data.form.netIncome - reductions.value.vatReduction
        );
    });

    const result = computed(() => {
        return (
            grossIncome.value -
            vatCost.value -
            insuranceTotalCost.value -
            revenueTax.value
        );
    });

    const expensesTotal = computed(() => {
        return reductions.value.vatReduction + reductions.value.costReduction;
    });

    const taxSavings = computed(() => {
        const baseRevenue = data.form.netIncome - socialContributionCost.value;

        return (CalculationsService.getRevenueTax(baseRevenue, selectedTaxForm.value) -
            revenueTax.value) +
            reductions.value.vatReduction;
    });

    const profit = computed(() => {
        return result.value - expensesTotal.value;
    });

    return {
        // socialContributionCost,
        insuranceTotalCost,
        // reductions,
        // revenue,
        revenueTax,
        grossIncome,
        vatCost,
        result,
        expensesTotal,
        taxSavings,
        profit
    };
};

export default useCalculations;
