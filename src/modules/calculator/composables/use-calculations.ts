import { computed } from '@vue/composition-api';
import CalculationsService from '@/modules/calculator/calculations-service';
import { useTaxOptions } from '@/modules/calculator/composables/use-tax-options';
import { useCalculatorStore } from '@/modules/calculator/use-calculator-store';

type ReductionType = {
    costReduction: number;
    vatReduction: number;
};

export const useCalculations = () => {
    const { form, expenses } = useCalculatorStore();
    const { insuranceOptions, taxFormOptions } = useTaxOptions();

    const selectedInsuranceOption = computed(() => {
        return insuranceOptions.find(
            (option) => option.id === form.value.insuranceVariant
        )!;
    });

    const selectedTaxForm = computed(() => {
        return taxFormOptions.find(
            (option) => option.id === form.value.taxForm
        )!;
    });

    const socialContributionCost = computed(() => {
        let result = selectedInsuranceOption.value.value.socialContribution;

        if (selectedInsuranceOption.value.value.additional) {
            result += selectedInsuranceOption.value.value.additional;
        }

        if (form.value.optionalSicknessInsurance) {
            result +=
                selectedInsuranceOption.value.value.optionalSicknessInsurance;
        }

        return result;
    });

    const insuranceTotalCost = computed(() => {
        return (
            socialContributionCost.value +
            selectedInsuranceOption.value.value.healthInsurance
        );
    });

    const reductions = computed<ReductionType>(() => {
        const result = { vatReduction: 0, costReduction: 0 };
        expenses.value.forEach(({ grossValue, isCarExpense }) => {
            const {
                costReduction,
                vatReduction,
            } = CalculationsService.getReduction(grossValue, isCarExpense);
            result.vatReduction += vatReduction;
            result.costReduction += costReduction;
        });

        return result;
    });

    const revenue = computed(() => {
        return (
            form.value.netIncome -
            reductions.value.costReduction -
            socialContributionCost.value
        );
    });

    const revenueTax = computed(() => {
        return CalculationsService.getRevenueTax(
            revenue.value,
            selectedTaxForm.value
        );
    });

    const grossIncome = computed(() => {
        return CalculationsService.getGrossFromNet(form.value.netIncome);
    });

    const vatCost = computed(() => {
        return Math.max(
            0,
            grossIncome.value -
                form.value.netIncome -
                reductions.value.vatReduction
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
        const baseRevenue = form.value.netIncome - socialContributionCost.value;

        return (
            CalculationsService.getRevenueTax(
                baseRevenue,
                selectedTaxForm.value
            ) -
            revenueTax.value +
            reductions.value.vatReduction
        );
    });

    const profit = computed(() => {
        return result.value - expensesTotal.value;
    });

    return {
        insuranceTotalCost,
        revenue,
        revenueTax,
        grossIncome,
        vatCost,
        result,
        expensesTotal,
        taxSavings,
        profit,
    };
};
