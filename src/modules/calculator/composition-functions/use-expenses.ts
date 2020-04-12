import Vue from 'vue';
import { ref } from '@vue/composition-api';
import Expense from '@/modules/calculator/types/expense';

const useExpenses = () => {
    const expenses = ref<Expense[]>([]);
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
        expenses.value.push(expense);
        closeExpenseForm();
    };

    const editExpense = (expense: Expense) => {
        const index = expenses.value.findIndex(({ id }) => id === expense.id);
        Vue.set(expenses.value, index, expense);
        closeExpenseForm();
    };

    const removeExpense = (expenseId: string) => {
        expenses.value = expenses.value.filter(({ id }) => id !== expenseId);
        closeExpenseForm();
    };

    return {
        addExpense,
        closeExpenseForm,
        editExpense,
        expenses,
        expenseToEdit,
        isAddExpenseModalVisible,
        openExpenseEdit,
        removeExpense
    };
};

export default useExpenses;
