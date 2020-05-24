import { TaxForm } from '@/modules/calculator/types/tax-form-options';
import { InsuranceVariant } from '@/modules/calculator/types/insurance-options';
import { Expense } from '@/modules/calculator/types/expense';

export interface BaseCalculatorFormModel {
    netIncome: number;
    taxForm: TaxForm;
    insuranceVariant: InsuranceVariant;
    optionalSicknessInsurance: boolean;
}

export interface CalculatorModel extends BaseCalculatorFormModel {
    expenses: Expense[];
    month: string;
    year: string;
}

export type BillingPeriod = {
    month: string;
    year: string;
};
