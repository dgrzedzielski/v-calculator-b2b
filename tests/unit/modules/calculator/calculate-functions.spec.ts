import * as calculations from '@/modules/calculator/logic/calculate-functions';
import Expense from '@/modules/calculator/types/expense';
import {
    CAR_EXPENSE_COST_RATE,
    CAR_EXPENSE_VAT_RATE,
    GROSS_BASE,
    HEALTH_INSURANCE_TAX_DEDUCTION,
    PROGRESSIVE_TAX_RATE_OVER_THRESHOLD,
    PROGRESSIVE_TAX_THRESHOLD,
} from '@/modules/calculator/logic/tax-rates';
import { INSURANCE_OPTIONS } from '@/modules/calculator/types/insurance-options';
import { TAX_FORM_OPTIONS, TaxForm } from '@/modules/calculator/types/tax-form-options';

describe('calculate functions', () => {
    describe('getGrossFromNet(netValue)', () => {
        it('properly returns gross value after passing positive net value', () => {
            let netValue = 100;
            expect(calculations.getGrossFromNet(netValue)).toEqual(netValue * GROSS_BASE);

            netValue = 123456;
            expect(calculations.getGrossFromNet(netValue)).toEqual(netValue * GROSS_BASE);
        });

        it('returns value = 0 after passing net value = 0', () => {
            const netValue = 0;
            expect(calculations.getGrossFromNet(netValue)).toEqual(0);
        });
    });

    describe('getNetFromGross(grossValue)', () => {
        it('properly returns net value after passing positive gross value', () => {
            let grossValue = 100;
            expect(calculations.getNetFromGross(grossValue)).toEqual(grossValue / GROSS_BASE);

            grossValue = 123456;
            expect(calculations.getNetFromGross(grossValue)).toEqual(grossValue / GROSS_BASE);
        });

        it('returns value = 0 after passing net value = 0', () => {
            const grossValue = 0;
            expect(calculations.getNetFromGross(grossValue)).toEqual(0);
        });
    });

    describe('getReduction(grossValue, isCarExpense)', () => {
        it('should return proper values after passing car unrelated expense', () => {
            const result: { vatReduction: number, costReduction: number } = {
                vatReduction: 123 - (123 / GROSS_BASE),
                costReduction: 123 / GROSS_BASE
            };
            expect(calculations.getReduction(123, false)).toMatchObject(result);
        });

        it('should return proper values after passing car related expense', () => {
            const result: { vatReduction: number, costReduction: number } = {
                vatReduction: 23 * CAR_EXPENSE_VAT_RATE,
                costReduction: 100 * CAR_EXPENSE_COST_RATE
            };
            expect(calculations.getReduction(123, true)).toMatchObject(result);
        });
    });

    describe('getReductions(expenses)', () => {
        it('should return total cost and vat reduction from all expenses', () => {
            const expenses: Expense[] = [
                {
                    name: 'expense1',
                    isCarExpense: false,
                    grossValue: 123
                },
                {
                    name: 'expense2',
                    isCarExpense: false,
                    grossValue: 250
                },
                {
                    name: 'car expense',
                    isCarExpense: true,
                    grossValue: 300
                }
            ];

            const result = { vatReduction: 0, costReduction: 0 };
            expenses.forEach(({ grossValue, isCarExpense }) => {
                const { costReduction, vatReduction } = calculations.getReduction(grossValue, isCarExpense);
                result.vatReduction += vatReduction;
                result.costReduction += costReduction;
            });

            expect(calculations.getReductions(expenses)).toMatchObject(result);
        });
    });

    describe('getSocialContributionCost(insuranceOption, optionalSicknessInsurance)', () => {
        it('should return proper cost for every option', () => {
            INSURANCE_OPTIONS.forEach(option => {
                const result = option.value.socialContribution + (option.value.additional || 0);

                expect(calculations.getSocialContributionCost(option, false)).toEqual(result);
                expect(calculations.getSocialContributionCost(option, true))
                    .toEqual(result + option.value.optionalSicknessInsurance);
            });
        });
    });

    describe('getInsuranceTotalCost(insuranceOption, optionalSicknessInsurance)', () => {
        it('should return proper total insurance cost', () => {
            INSURANCE_OPTIONS.forEach(option => {
                const result = calculations.getSocialContributionCost(option, false) +
                    option.value.healthInsurance;
                expect(calculations.getInsuranceTotalCost(option, false)).toEqual(result);

                const resultWithSicknessInsurance = calculations.getSocialContributionCost(option, true) +
                    option.value.healthInsurance;
                expect(calculations.getInsuranceTotalCost(option, true)).toEqual(resultWithSicknessInsurance);
            });
        });
    });

    describe('getTaxOverThreshold(revenue, taxForm)', () => {
        it('should return 0 if revenue is not greater than threshold', () => {
            const revenueBelowThreshold = PROGRESSIVE_TAX_THRESHOLD - 15000;

            expect(calculations.getTaxOverThreshold(revenueBelowThreshold))
                .toEqual(0);
        });

        it('should return proper tax if revenue is over threshold', () => {
            const revenueOverThreshold = PROGRESSIVE_TAX_THRESHOLD + 15000;
            const result = (revenueOverThreshold - PROGRESSIVE_TAX_THRESHOLD) * PROGRESSIVE_TAX_RATE_OVER_THRESHOLD;

            expect(calculations.getTaxOverThreshold(revenueOverThreshold))
                .toEqual(result);
        });
    });

    describe('getRevenueTax(revenue, taxForm)', () => {
        it('should return proper tax for every taxForm', () => {
            TAX_FORM_OPTIONS.forEach(option => {
                const revenueBelowThreshold = PROGRESSIVE_TAX_THRESHOLD - 25000;
                let result = revenueBelowThreshold * option.baseRate - HEALTH_INSURANCE_TAX_DEDUCTION;

                expect(calculations.getRevenueTax(revenueBelowThreshold, option)).toEqual(result);

                const revenueOverThreshold = PROGRESSIVE_TAX_THRESHOLD + 25000;
                if (option.id === TaxForm.PROGRESSIVE) {
                    result = PROGRESSIVE_TAX_THRESHOLD * option.baseRate + calculations.getTaxOverThreshold(revenueOverThreshold);
                } else if (option.id === TaxForm.LINEAR) {
                    result = revenueOverThreshold * option.baseRate;
                }
                result -= HEALTH_INSURANCE_TAX_DEDUCTION;

                expect(calculations.getRevenueTax(revenueOverThreshold, option)).toEqual(result);
            });
        });
    });
});
