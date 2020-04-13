<template>
    <div class="base-calculator">
        <div class="base-calculator__form">
            <calculator-form v-model="form">
                <base-button
                    outline
                    theme="success"
                    type="button"
                    aria-keyshortcuts="ctrl+i"
                    @click="isAddExpenseModalVisible = true"
                >
                    <v-icon
                        name="plus-circle"
                        class="btn__icon"
                    />
                    <span class="btn__text">Dodaj wydatek</span>
                </base-button>
            </calculator-form>
        </div>
        <div class="base-calculator__summary">
            <cash-result
                :value="result"
                label="Wypłata"
                icon="hand-holding-usd"
                theme="primary-gradient"
            />
            <cash-result
                v-if="expenses.length > 0"
                :value="profit"
                :theme="profit > 0 ? 'success' : 'danger'"
                label="Zysk"
                icon="chart-line"
            />
            <cash-result
                :value="grossIncome"
                class="mt-30"
                theme="success"
                label="Kwota brutto"
            />
            <cash-result
                :value="vatCost"
                theme="danger"
                label="VAT"
            />
            <cash-result
                :value="insuranceTotalCost"
                theme="danger"
                label="ZUS"
            />
            <cash-result
                :value="revenueTax"
                theme="danger"
                label="Podatek dochodowy"
            />
            <cash-result
                :value="taxSavings"
                theme="success"
                label="Zaoszczędzono"
            />
            <cash-result
                :value="expensesTotal"
                theme="danger"
                label="Wydatki"
            />
            <calculator-expenses-list
                v-if="expenses.length > 0"
                :expenses="expenses"
                @open-expense-edit="openExpenseEdit"
            />
        </div>
        <calculator-expense-form
            v-if="isAddExpenseModalVisible"
            :expense-to-edit="expenseToEdit"
            @add-expense="addExpense"
            @edit-expense="editExpense"
            @remove-expense="removeExpense"
            @close="closeExpenseForm"
        />
    </div>
</template>

<script lang="ts">
    import {
        computed,
        defineComponent,
        onBeforeUnmount,
        onMounted,
    } from '@vue/composition-api';
    import CalculatorForm from '@/modules/calculator/components/calculator-form.vue';
    import CalculatorExpenseForm from '@/modules/calculator/components/calculator-expense-form.vue';
    import CalculatorExpensesList from '@/modules/calculator/components/calculator-expenses-list.vue';
    import CashResult from '@/core/components/ui/cash-result';
    import FloatingButton from '@/core/components/buttons/floating-button';
    import useCalculations from '@/modules/calculator/composition-functions/use-calculations';
    import useExpenses from '@/modules/calculator/composition-functions/use-expenses';
    import useLocalPersist from '@/modules/calculator/composition-functions/use-local-persist';
    import { CalculatorModel } from '@/modules/calculator/types/calculator-model';
    import {
        createKeyboardShortcut,
        KeyboardModifier,
        useKeyboardShortcuts
    } from '@/core/composition-functions/use-keyboard-shortcuts';

    const BaseCalculator = defineComponent({
        components: {
            CalculatorForm,
            FloatingButton,
            CalculatorExpensesList,
            CalculatorExpenseForm,
            CashResult
        },
        setup() {
            const {
                removeExpense,
                openExpenseEdit,
                expenseToEdit,
                expenses,
                editExpense,
                closeExpenseForm,
                addExpense,
                isAddExpenseModalVisible
            } = useExpenses();

            const {
                profit,
                result,
                insuranceTotalCost,
                taxSavings,
                revenueTax,
                grossIncome,
                vatCost,
                expensesTotal,
                form
            } = useCalculations(expenses);

            const data = computed<CalculatorModel>({
                get: () => ({ ...form.value, expenses: expenses.value }),
                set: (val: CalculatorModel) => {
                    const { expenses: savedExpenses, ...savedValues } = val;
                    expenses.value = savedExpenses;
                    form.value = savedValues;
                }
            });

            const { loadData, saveData } = useLocalPersist(data);
            const { handleKeyboardShortcuts } = useKeyboardShortcuts([
                {
                    shortcut: createKeyboardShortcut(KeyboardModifier.CTRL, 's'),
                    callback: saveData
                },
                {
                    shortcut: createKeyboardShortcut(KeyboardModifier.CTRL, 'i'),
                    callback: () => { isAddExpenseModalVisible.value = true; }
                }
            ]);

            onMounted(() => {
                loadData();
                document.addEventListener('keydown', handleKeyboardShortcuts);
            });

            onBeforeUnmount(() => {
                document.removeEventListener('keydown', handleKeyboardShortcuts);
            });

            return {
                removeExpense,
                openExpenseEdit,
                expenseToEdit,
                editExpense,
                closeExpenseForm,
                addExpense,
                expenses,
                form,
                isAddExpenseModalVisible,
                saveData,
                insuranceTotalCost,
                revenueTax,
                grossIncome,
                vatCost,
                result,
                expensesTotal,
                taxSavings,
                profit
            };
        }
    });

    export default BaseCalculator;
</script>

<style lang="scss" src="./base-calculator.scss" />
