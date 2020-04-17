<template>
    <div class="base-calculator">
        <header class="base-calculator__header">
            <h2 class="base-calculator__heading">
                Kalkulator wynagrodzenia
            </h2>
            <div class="flex-wrap align-center justify-between">
                <div class="flex align-center mr-10">
                    <p class="m-0">
                        Aktualnie wybrany okres rozliczeniowy: <strong>{{ dataSaveKey }}</strong>
                    </p>
                    <base-button
                        v-if="loggedUser"
                        theme="primary"
                        size="small"
                        outline
                        class="ml-20"
                    >
                        Zmień
                    </base-button>
                </div>
                <div class="base-calculator__status">
                    <template v-if="status === 'loading'">
                        Wczytywanie...
                    </template>
                    <template v-else-if="status === 'loaded'">
                        Wczytano
                    </template>
                    <template v-else-if="status === 'nothing-to-load'">
                        Brak zapisanych danych
                    </template>
                    <template v-else-if="status === 'saving'">
                        Zapisywanie...
                    </template>
                    <template v-else-if="status === 'saved'">
                        Zapisano
                    </template>
                    <template v-else-if="status === 'will-save'">
                        Zmiany zostaną zapisane
                    </template>
                </div>
            </div>
        </header>
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
        onMounted,
        watch,
    } from '@vue/composition-api';
    import CalculatorForm from '@/modules/calculator/components/calculator-form.vue';
    import CalculatorExpenseForm from '@/modules/calculator/components/calculator-expense-form.vue';
    import CalculatorExpensesList from '@/modules/calculator/components/calculator-expenses-list.vue';
    import CashResult from '@/core/components/ui/cash-result';
    import useCalculations from '@/modules/calculator/composition-functions/use-calculations';
    import useExpenses from '@/modules/calculator/composition-functions/use-expenses';
    import useLocalPersist from '@/modules/calculator/composition-functions/use-local-persist';
    import { CalculatorModel } from '@/modules/calculator/types/calculator-model';
    import {
        createKeyboardShortcut,
        KeyboardModifier,
        useKeyboardShortcuts
    } from '@/core/composition-functions/use-keyboard-shortcuts';
    import { useStore } from '@/core/composition-functions/use-store';
    import { useDbPersist } from '../composition-functions/use-db-persist';
    import User from '@/modules/auth/types/user';
    import { PersistStatus, usePersist } from '../composition-functions/use-persist';

    const BaseCalculator = defineComponent({
        components: {
            CalculatorForm,
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
                    expenses.value = [...savedExpenses];
                    form.value = savedValues;
                }
            });

            const $store = useStore();
            const loggedUser = computed<User | null>(() => $store.state.auth.user);

            const {
                status,
                savedData,
                loadData,
                saveData,
                debouncedSave,
                dataSaveKey
            } = usePersist(data, loggedUser);

            useKeyboardShortcuts([
                {
                    shortcut: createKeyboardShortcut(KeyboardModifier.CTRL, 's'),
                    callback: saveData
                },
                {
                    shortcut: createKeyboardShortcut(KeyboardModifier.CTRL, 'i'),
                    callback: () => { isAddExpenseModalVisible.value = true; }
                }
            ]);

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
                profit,
                debouncedSave,
                dataSaveKey,
                loggedUser,
                status
            };
        }
    });

    export default BaseCalculator;
</script>

<style lang="scss" src="./base-calculator.scss" />
