import { TaxForm } from '@/modules/calculator/types/tax-form-options';
import { InsuranceVariant } from '@/modules/calculator/types/insurance-options';
import Expense from '@/modules/calculator/types/expense';

interface CalculatorFormModel {
    netIncome: number;
    taxForm: TaxForm;
    insuranceVariant: InsuranceVariant;
    optionalSicknessInsurance: boolean;
    expenses: Expense[];
}

export default CalculatorFormModel;
