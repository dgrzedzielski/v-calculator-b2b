import {
    CAR_EXPENSE_COST_RATE,
    CAR_EXPENSE_VAT_RATE,
    GROSS_BASE,
    HEALTH_INSURANCE_TAX_DEDUCTION,
    PROGRESSIVE_TAX_RATE_OVER_THRESHOLD,
    PROGRESSIVE_TAX_THRESHOLD
} from '@/modules/calculator/tax-rates';
import NumberUtils from '@/core/utils/number-utils';
import { TaxForm, TaxFormOption } from '@/modules/calculator/types/tax-form-options';
import { CalculatorModel } from '@/modules/calculator/types/calculator-model';

class CalculatorService {
    static getGrossFromNet = (netValue: number, grossBase = GROSS_BASE) =>
        netValue * grossBase;

    static getNetFromGross = (grossValue: number, grossBase = GROSS_BASE) =>
        grossValue / grossBase;

    static getReduction = (grossValue: number, isCarExpense: boolean) => {
        const netValue = CalculatorService.getNetFromGross(grossValue);
        let costReduction = netValue;
        let vatReduction = (grossValue - netValue);

        if (isCarExpense) {
            costReduction = costReduction * CAR_EXPENSE_COST_RATE;
            vatReduction = vatReduction * CAR_EXPENSE_VAT_RATE;
        }

        return {
            costReduction: NumberUtils.asStandardFormat(costReduction),
            vatReduction: NumberUtils.asStandardFormat(vatReduction)
        };
    };

    static getTaxOverThreshold = (revenue: number) => {
        return Math.max(0, revenue - PROGRESSIVE_TAX_THRESHOLD) *
            PROGRESSIVE_TAX_RATE_OVER_THRESHOLD;
    };

    static getRevenueTax = (revenue: number, taxForm: TaxFormOption) => {
        let baseValue = revenue * taxForm.baseRate;

        if (taxForm.id === TaxForm.PROGRESSIVE && revenue > PROGRESSIVE_TAX_THRESHOLD) {
            baseValue = PROGRESSIVE_TAX_THRESHOLD * taxForm.baseRate;
            baseValue += CalculatorService.getTaxOverThreshold(revenue);
        }

        return baseValue - HEALTH_INSURANCE_TAX_DEDUCTION;
    };

    static getSaveKey(month: string, year: number) {
        return `${month}.${year}`;
    }

    static getCurrentMonthKey() {
        const date = new Date();

        return CalculatorService.getSaveKey(
            NumberUtils.as2Digits(date.getMonth() + 1),
            date.getFullYear()
        );
    }

    static save = (data: CalculatorModel) => {
        localStorage.setItem(
            CalculatorService.getCurrentMonthKey(),
            JSON.stringify(data)
        );
    };

    static load = (): CalculatorModel | null => {
        const result = localStorage.getItem(CalculatorService.getCurrentMonthKey());

        if (result) {
            return JSON.parse(result);
        }

        return null;
    }
}

export default CalculatorService;
