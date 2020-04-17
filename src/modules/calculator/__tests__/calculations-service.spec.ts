import {
    CAR_EXPENSE_COST_RATE,
    CAR_EXPENSE_VAT_RATE,
    GROSS_BASE,
    HEALTH_INSURANCE_TAX_DEDUCTION,
    PROGRESSIVE_TAX_RATE_OVER_THRESHOLD,
    PROGRESSIVE_TAX_THRESHOLD,
} from '@/modules/calculator/tax-rates';
import { TAX_FORM_OPTIONS, TaxForm } from '@/modules/calculator/types/tax-form-options';
import CalculationsService from '@/modules/calculator/calculations-service';

describe('Calculator service', () => {
    describe('getGrossFromNet(netValue)', () => {
        it('properly returns gross value after passing positive net value', () => {
            let netValue = 100;
            expect(CalculationsService.getGrossFromNet(netValue))
                .toEqual(netValue * GROSS_BASE);

            netValue = 123456;
            expect(CalculationsService.getGrossFromNet(netValue))
                .toEqual(netValue * GROSS_BASE);
        });

        it('returns value = 0 after passing net value = 0', () => {
            const netValue = 0;
            expect(CalculationsService.getGrossFromNet(netValue))
                .toEqual(0);
        });
    });

    describe('getNetFromGross(grossValue)', () => {
        it('properly returns net value after passing positive gross value', () => {
            let grossValue = 100;
            expect(CalculationsService.getNetFromGross(grossValue))
                .toEqual(grossValue / GROSS_BASE);

            grossValue = 123456;
            expect(CalculationsService.getNetFromGross(grossValue))
                .toEqual(grossValue / GROSS_BASE);
        });

        it('returns value = 0 after passing net value = 0', () => {
            const grossValue = 0;
            expect(CalculationsService.getNetFromGross(grossValue)).toEqual(0);
        });
    });

    describe('getReduction(grossValue, isCarExpense)', () => {
        it('should return proper values after passing car unrelated expense', () => {
            const result: { vatReduction: number, costReduction: number } = {
                vatReduction: 123 - (123 / GROSS_BASE),
                costReduction: 123 / GROSS_BASE
            };
            expect(CalculationsService.getReduction(123, false))
                .toMatchObject(result);
        });

        it('should return proper values after passing car related expense', () => {
            const result: { vatReduction: number, costReduction: number } = {
                vatReduction: 23 * CAR_EXPENSE_VAT_RATE,
                costReduction: 100 * CAR_EXPENSE_COST_RATE
            };
            expect(CalculationsService.getReduction(123, true))
                .toMatchObject(result);
        });
    });

    describe('getTaxOverThreshold(revenue, taxForm)', () => {
        it('should return 0 if revenue is not greater than threshold', () => {
            const revenueBelowThreshold = PROGRESSIVE_TAX_THRESHOLD - 15000;

            expect(CalculationsService.getTaxOverThreshold(revenueBelowThreshold))
                .toEqual(0);
        });

        it('should return proper tax if revenue is over threshold', () => {
            const revenueOverThreshold = PROGRESSIVE_TAX_THRESHOLD + 15000;
            const result = (revenueOverThreshold - PROGRESSIVE_TAX_THRESHOLD) *
                PROGRESSIVE_TAX_RATE_OVER_THRESHOLD;

            expect(CalculationsService.getTaxOverThreshold(revenueOverThreshold))
                .toEqual(result);
        });
    });

    describe('getRevenueTax(revenue, taxForm)', () => {
        it('should return proper tax for every taxForm', () => {
            TAX_FORM_OPTIONS.forEach(option => {
                const revenueBelowThreshold = PROGRESSIVE_TAX_THRESHOLD - 25000;
                let result = revenueBelowThreshold * option.baseRate -
                    HEALTH_INSURANCE_TAX_DEDUCTION;

                expect(CalculationsService.getRevenueTax(revenueBelowThreshold, option))
                    .toEqual(result);

                const revenueOverThreshold = PROGRESSIVE_TAX_THRESHOLD + 25000;
                if (option.id === TaxForm.PROGRESSIVE) {
                    result = PROGRESSIVE_TAX_THRESHOLD * option.baseRate +
                        CalculationsService.getTaxOverThreshold(revenueOverThreshold);
                } else if (option.id === TaxForm.LINEAR) {
                    result = revenueOverThreshold * option.baseRate;
                }
                result -= HEALTH_INSURANCE_TAX_DEDUCTION;

                expect(CalculationsService.getRevenueTax(revenueOverThreshold, option))
                    .toEqual(result);
            });
        });
    });
});
