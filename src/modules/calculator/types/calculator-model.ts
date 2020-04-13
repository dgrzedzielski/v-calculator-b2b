import { TaxForm } from '@/modules/calculator/types/tax-form-options';
import { InsuranceVariant } from '@/modules/calculator/types/insurance-options';
import Expense from '@/modules/calculator/types/expense';

interface BaseCalculatorFormModel {
    netIncome: number;
    taxForm: TaxForm;
    insuranceVariant: InsuranceVariant;
    optionalSicknessInsurance: boolean;
}

interface CalculatorModel extends BaseCalculatorFormModel {
    expenses: Expense[];
}

export { BaseCalculatorFormModel, CalculatorModel };
