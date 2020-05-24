import { ref } from '@vue/composition-api';
import { Expense } from '@/modules/calculator/types/expense';
import { useCalculatorStore } from '@/modules/calculator/use-calculator-store';

export const useExpenses = () => {
    const { setExpenses, expenses } = useCalculatorStore();
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

    const updateExpenses = (expenses: Expense[]) => {
        setExpenses(expenses);
        closeExpenseForm();
    };

    const addExpense = (expense: Expense) => {
        updateExpenses([...expenses.value, expense]);
    };

    const editExpense = (expense: Expense) => {
        const index = expenses.value.findIndex(({ id }) => id === expense.id);
        const updatedExpenses = [...expenses.value];
        updatedExpenses[index] = expense;
        updateExpenses(updatedExpenses);
    };

    const removeExpense = (expenseId: string) => {
        updateExpenses(
            expenses.value.filter((expense) => expense.id !== expenseId)
        );
    };

    return {
        addExpense,
        closeExpenseForm,
        editExpense,
        expenseToEdit,
        isAddExpenseModalVisible,
        openExpenseEdit,
        removeExpense,
    };
};
