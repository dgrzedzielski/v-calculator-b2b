import Vue from 'vue';
import { computed } from '@vue/composition-api';
import { TaxForm } from '@/modules/calculator/types/tax-form-options';
import { InsuranceVariant } from '@/modules/calculator/types/insurance-options';
import CalculatorService from '@/modules/calculator/calculator-service';
import {
    BaseCalculatorFormModel,
    BillingPeriod,
    CalculatorModel,
} from '@/modules/calculator/types/calculator-model';
import { Expense } from '@/modules/calculator/types/expense';

const FORM_DEFAULT_VALUE: BaseCalculatorFormModel = {
    netIncome: 5000,
    taxForm: TaxForm.LINEAR,
    insuranceVariant: InsuranceVariant.START,
    optionalSicknessInsurance: false,
};

interface CalculatorState {
    form: BaseCalculatorFormModel;
    expenses: Expense[];
    billingPeriod: BillingPeriod;
}

const state = Vue.observable<CalculatorState>({
    form: FORM_DEFAULT_VALUE,
    expenses: [],
    billingPeriod: CalculatorService.defaultBillingPeriod,
});

export const useCalculatorStore = () => {
    const form = computed<BaseCalculatorFormModel>(() => state.form);
    const expenses = computed(() => state.expenses);
    const billingPeriod = computed<BillingPeriod>(() => state.billingPeriod);

    const setForm = (newValue: BaseCalculatorFormModel) => {
        state.form = { ...newValue };
    };

    const setBillingPeriod = (newValue: BillingPeriod) => {
        state.billingPeriod = newValue;
    };

    const setExpenses = (expenses: Expense[]) => {
        state.expenses = expenses;
    };

    const data = computed<CalculatorModel>(() => ({
        expenses: state.expenses,
        ...form.value,
        ...billingPeriod.value,
    }));

    const setData = (newValue: CalculatorModel) => {
        const { month, year, expenses, ...form } = newValue;
        state.expenses = [...expenses];
        state.form = form;
        state.billingPeriod = { month, year };
    };

    const id = computed(
        () => `${billingPeriod.value.month}.${billingPeriod.value.year}`
    );

    return {
        form,
        expenses,
        billingPeriod,
        data,
        id,
        setForm,
        setBillingPeriod,
        setData,
        setExpenses,
    };
};
