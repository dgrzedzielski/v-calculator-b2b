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
                        v-if="loggedUser"
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
        computed,
        defineComponent,
        onMounted,
        watch,
    } from '@vue/composition-api';
    import CalculatorForm from './calculator-form.vue';
    import CalculatorExpenseForm from './calculator-expense-form.vue';
    import CalculatorExpensesList from './calculator-expenses-list.vue';
    import CashResult from '@/core/components/ui/cash-result';
    import CalculatorChangeBillingPeriod from './calculator-change-billing-period.vue';
    import useCalculations from '../composition-functions/use-calculations';
    import useExpenses from '../composition-functions/use-expenses';
    import useLocalPersist from '../composition-functions/use-local-persist';
    import { CalculatorModel, BillingPeriod } from '../types/calculator-model';
    import {
        createKeyboardShortcut,
        KeyboardModifier,
        useKeyboardShortcuts
    } from '@/core/composition-functions/use-keyboard-shortcuts';
    import { useStore } from '@/core/composition-functions/use-store';
    import { useDbPersist } from '../composition-functions/use-db-persist';
    import { User } from '@/modules/auth/types/user';
    import { PersistStatus, usePersist } from '../composition-functions/use-persist';
    import CalculatorData from '../calculator-data';
    import { useBillingPeriod } from '../composition-functions/use-billing-period';
    import { useRouter } from '@/core/composition-functions/use-router';

    const BaseCalculator = defineComponent({
        components: {
            CalculatorForm,
            CalculatorExpensesList,
            CalculatorExpenseForm,
            CalculatorChangeBillingPeriod,
            CashResult
        },
        setup() {
            const $router = useRouter();
            let loadedBillingPeriod: BillingPeriod | undefined;

            if ($router.currentRoute.params.month && $router.currentRoute.params.year) {
                loadedBillingPeriod = {
                    month: $router.currentRoute.params.month,
                    year: $router.currentRoute.params.year
                };
            }

            const data = new CalculatorData({
                billingPeriod: loadedBillingPeriod
            });

            const {
                removeExpense,
                openExpenseEdit,
                expenseToEdit,
                editExpense,
                closeExpenseForm,
                addExpense,
                isAddExpenseModalVisible
            } = useExpenses(data);

            const {
                profit,
                result,
                insuranceTotalCost,
                taxSavings,
                revenueTax,
                grossIncome,
                vatCost,
                expensesTotal,
            } = useCalculations(data);

            const $store = useStore();
            const loggedUser = computed<User | null>(() => $store.state.auth.user);

            const {
                status,
                savedData,
                loadData,
                saveData,
                debouncedSave,
            } = usePersist(data, loggedUser);

            const {
                isChangeBillingPeriodVisible,
                changeBillingPeriod,
                monthName
            } = useBillingPeriod(data, $router);

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
                expenses: data.expensesRef,
                form: data.formRef,
                billingPeriod: data.billingPeriodRef,
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
                loggedUser,
                status,
                isChangeBillingPeriodVisible,
                changeBillingPeriod,
                monthName
            };
        }
    });

    export default BaseCalculator;
</script>

<style lang="scss" src="./base-calculator.scss" />
