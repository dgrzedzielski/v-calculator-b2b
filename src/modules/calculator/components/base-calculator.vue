<template>
    <div class="base-calculator">
        <header class="base-calculator__header">
            <h2 class="base-calculator__heading">
                Kalkulator wynagrodzenia
            </h2>
            <div class="flex-wrap align-center justify-between">
                <div class="flex align-center mr-10">
                    <p class="m-0">
                        Aktualnie wybrany okres rozliczeniowy:
                        <strong>{{ monthName }} {{ billingPeriod.year }}</strong>
                    </p>
                    <base-button
                        v-if="isUserLogged"
                        theme="primary"
                        size="small"
                        outline
                        class="ml-20"
                        @click="isChangeBillingPeriodVisible = true"
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
            <calculator-form
                :value="form"
                @input="setForm"
            >
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
                :value="revenue"
                theme="success"
                label="Dochód"
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
        <calculator-change-billing-period
            v-if="isChangeBillingPeriodVisible"
            :current-billing-period="billingPeriod"
            @change="changeBillingPeriod"
            @close="isChangeBillingPeriodVisible = false"
        />
    </div>
</template>

<script lang="ts">
    import {
        defineComponent,
    } from '@vue/composition-api';
    import {
        createKeyboardShortcut,
        KeyboardModifier,
        useKeyboardShortcuts
    } from '@/core/composables/use-keyboard-shortcuts';
    import { useRouter } from '@/core/composables/use-router';
    import CashResult from '@/core/components/ui/cash-result';
    import CalculatorForm from './calculator-form.vue';
    import CalculatorExpenseForm from './calculator-expense-form.vue';
    import CalculatorExpensesList from './calculator-expenses-list.vue';
    import CalculatorChangeBillingPeriod from './calculator-change-billing-period.vue';
    import { useCalculations } from '../composables/use-calculations';
    import { useExpenses } from '../composables/use-expenses';
    import { usePersist } from '../composables/use-persist';
    import { useBillingPeriod } from '../composables/use-billing-period';
    import { useCalculatorStore } from '@/modules/calculator/calculator-store';
    import { useAuthStore } from '@/modules/auth/auth-store';

    const BaseCalculator = defineComponent({
        components: {
            CalculatorForm,
            CalculatorExpensesList,
            CalculatorExpenseForm,
            CalculatorChangeBillingPeriod,
            CashResult
        },
        setup() {
            const { isUserLogged } = useAuthStore();
            const $router = useRouter();
            const {
                expenses,
                form,
                billingPeriod,
                setBillingPeriod,
                setForm
            } = useCalculatorStore();

            if ($router.currentRoute.params.month && $router.currentRoute.params.year) {
                const loadedBillingPeriod = {
                    month: $router.currentRoute.params.month,
                    year: $router.currentRoute.params.year
                };
                setBillingPeriod(loadedBillingPeriod);
            }

            const {
                removeExpense,
                openExpenseEdit,
                expenseToEdit,
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
                revenue
            } = useCalculations();

            const {
                status,
                saveData,
                debouncedSave,
            } = usePersist();

            const {
                isChangeBillingPeriodVisible,
                changeBillingPeriod,
                monthName
            } = useBillingPeriod();

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
                billingPeriod,
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
                isUserLogged,
                status,
                isChangeBillingPeriodVisible,
                changeBillingPeriod,
                monthName,
                setForm,
                revenue
            };
        }
    });

    export default BaseCalculator;
</script>

<style lang="scss" src="./base-calculator.scss" />
