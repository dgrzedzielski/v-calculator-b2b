import { BaseCalculatorFormModel, BillingPeriod, CalculatorModel } from './types/calculator-model';
import { ref } from '@vue/composition-api';
import { Expense } from './types/expense';
import { TaxForm } from './types/tax-form-options';
import { InsuranceVariant } from './types/insurance-options';
import NumberUtils from '@/core/utils/number-utils';

interface ConstructorInput {
    form?: BaseCalculatorFormModel,
    expenses?: Expense[],
    billingPeriod?: BillingPeriod
}

class CalculatorData {
    public formRef = ref<BaseCalculatorFormModel>({
        netIncome: 10000,
        taxForm: TaxForm.LINEAR,
        insuranceVariant: InsuranceVariant.START,
        optionalSicknessInsurance: false,
    });

    public expensesRef = ref<Expense[]>([]);

    public billingPeriodRef = ref<BillingPeriod>(CalculatorData.defaultBillingPeriod);

    constructor({ form, expenses, billingPeriod }: ConstructorInput) {
        if (form) {
            this.formRef.value = { ...form };
        }

        if (expenses) {
            this.expensesRef.value = [...expenses];
        }

        if (billingPeriod) {
            this.billingPeriodRef.value = { ...billingPeriod };
        }
    }

    get id(): string {
        return `${this.billingPeriod.month}.${this.billingPeriod.year}`;
    }

    get form(): BaseCalculatorFormModel {
        return this.formRef.value;
    }

    set form(newValue: BaseCalculatorFormModel) {
        this.formRef.value = newValue;
    }

    get billingPeriod(): BillingPeriod {
        return this.billingPeriodRef.value;
    }

    set billingPeriod(newValue: BillingPeriod) {
        this.billingPeriodRef.value = newValue;
    }

    get expenses(): Expense[] {
        return this.expensesRef.value;
    }

    set expenses(newValue: Expense[]) {
        this.expensesRef.value = newValue;
    }

    get value(): CalculatorModel {
        return {
            ...this.form,
            ...this.billingPeriod,
            expenses: this.expenses
        };
    }

    set value(newValue: CalculatorModel) {
        const { month, year, expenses, ...form } = newValue;
        this.expenses = [...expenses];
        this.form = form;
        this.billingPeriod = { month, year };
    }

    static get defaultBillingPeriod(): BillingPeriod {
        const date = new Date();

        return {
            month: NumberUtils.as2Digits(date.getMonth() + 1),
            year: date.getFullYear().toString()
        };
    }

    static getValuesWithDefaults(formValue: BaseCalculatorFormModel): CalculatorModel {
        return {
            ...formValue,
            expenses: [],
            ...CalculatorData.defaultBillingPeriod
        };
    }
}

export default CalculatorData;
