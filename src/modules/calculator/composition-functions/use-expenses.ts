import Vue from 'vue';
import { ref } from '@vue/composition-api';
import { Expense } from '@/modules/calculator/types/expense';
import CalculatorData from '../calculator-data';

const useExpenses = (data: CalculatorData) => {
    const expenseToEdit = ref<Expense | null>(null);
    const isAddExpenseModalVisible = ref<boolean>(false);

    const openExpenseEdit = (expense: Expense) => {
        isAddExpenseModalVisible.value = true;
        expenseToEdit.value = expense;
    };

    const closeExpenseForm = () => {
        isAddExpenseModalVisible.value = false;
        expenseToEdit.value = null;
    };

    const addExpense = (expense: Expense) => {
        data.expenses.push(expense);
        closeExpenseForm();
    };

    const editExpense = (expense: Expense) => {
        const index = data.expenses.findIndex(({ id }) => id === expense.id);
        Vue.set(data.expenses, index, expense);
        closeExpenseForm();
    };

    const removeExpense = (expenseId: string) => {
        data.expenses = data.expenses.filter(({ id }) => id !== expenseId);
        closeExpenseForm();
    };

    return {
        addExpense,
        closeExpenseForm,
        editExpense,
        expenseToEdit,
        isAddExpenseModalVisible,
        openExpenseEdit,
        removeExpense
    };
};

export default useExpenses;
