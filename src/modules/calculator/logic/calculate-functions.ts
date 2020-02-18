import { InsuranceOption } from '@/modules/calculator/types/insurance-options';
import {
    CAR_EXPENSE_COST_RATE,
    CAR_EXPENSE_VAT_RATE,
    GROSS_BASE,
    HEALTH_INSURANCE_TAX_DEDUCTION,
} from '@/modules/calculator/logic/tax-rates';
import Expense from '@/modules/calculator/types/expense';
import { ProgressiveTaxFormOption, TaxForm, TaxFormOption } from '@/modules/calculator/types/tax-form-options';

export const getGrossFromNet = (netValue: number, grossBase = GROSS_BASE) => netValue * grossBase;

export const getNetFromGross = (grossValue: number, grossBase = GROSS_BASE) => grossValue / grossBase;

export const getReduction = (grossValue: number, isCarExpense: boolean) => {
    const netValue = getNetFromGross(grossValue);
    let costReduction = netValue;
    let vatReduction = (grossValue - netValue);

    if (isCarExpense) {
        costReduction = costReduction * CAR_EXPENSE_COST_RATE;
        vatReduction = vatReduction * CAR_EXPENSE_VAT_RATE;
    }

    return {
        costReduction: parseFloat(costReduction.toFixed(2)),
        vatReduction: parseFloat(vatReduction.toFixed(2))
    };
};

export const getReductions = (expenses: Expense[]) => {
    const result = { vatReduction: 0, costReduction: 0 };
    expenses.forEach(({ grossValue, isCarExpense }) => {
        const { costReduction, vatReduction } = getReduction(grossValue, isCarExpense);
        result.vatReduction += vatReduction;
        result.costReduction += costReduction;
    });

    return result;
};

export const getSocialContributionCost = (insuranceOption: InsuranceOption, optionalSicknessInsurance: boolean) => {
    let result = insuranceOption.value.socialContribution;

    if (insuranceOption.value.additional) {
        result += insuranceOption.value.additional;
    }

    if (optionalSicknessInsurance) {
        result += insuranceOption.value.optionalSicknessInsurance;
    }

    return result;
};

export const getInsuranceTotalCost = (insuranceOption: InsuranceOption, optionalSicknessInsurance: boolean) => {
    return getSocialContributionCost(insuranceOption, optionalSicknessInsurance) +
        insuranceOption.value.healthInsurance;
};

const getTaxOverThreshold = (revenue: number, taxForm: ProgressiveTaxFormOption) => {
    return Math.max(0, revenue - taxForm.threshold) * taxForm.rateOverThreshold;
};

export const getRevenue = (netIncome: number, costs: number, socialContributionCost: number) => {
    return netIncome - costs - socialContributionCost;
};

export const getRevenueTax = (revenue: number, taxForm: TaxFormOption) => {
    let baseValue = revenue * taxForm.baseRate;

    if (taxForm.id === TaxForm.PROGRESSIVE) {
        baseValue += getTaxOverThreshold(revenue, taxForm as ProgressiveTaxFormOption);
    }

    return baseValue - HEALTH_INSURANCE_TAX_DEDUCTION;
};
