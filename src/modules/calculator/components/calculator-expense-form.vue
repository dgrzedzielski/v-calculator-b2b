<template>
    <base-modal
        name="calculator-expense-form-modal"
        @close="$emit('close')"
    >
        <template slot="heading">
            <template v-if="expenseToEdit">
                Edytuj koszt
            </template>
            <template v-else>
                Dodaj koszt
            </template>
        </template>
        <form
            @submit.prevent="onSubmit"
        >
            <input-form-group
                v-model="expense.grossValue"
                label="Kwota kosztu brutto"
                name="costGrossValue"
                type="number"
                min="0"
                step="0.01"
                required
            />
            <input-form-group
                v-model="expense.name"
                label="Nazwa"
                name="name"
                type="text"
                autocomplete="off"
                required
            />
            <form-switch
                v-model="expense.isCarExpense"
                name="isCarExpense"
                type="switch"
                label="Koszt samochodowy"
            />
            <div class="flex align-center justify-between">
                <base-button
                    outline
                    theme="success"
                    type="submit"
                >
                    <v-icon
                        class="btn__icon"
                        name="check"
                    />
                    <span class="btn__text">
                        Potwierdź
                    </span>
                </base-button>
                <base-button
                    v-if="expenseToEdit"
                    outline
                    theme="danger"
                    type="button"
                    @click="$emit('remove-expense', expenseToEdit.id)"
                >
                    <v-icon
                        class="btn__icon"
                        name="trash-alt"
                    />
                    <span class="btn__text">
                        Usuń
                    </span>
                </base-button>
            </div>
        </form>
    </base-modal>
</template>

<script lang="ts">
    import { defineComponent, ref } from '@vue/composition-api';
    import { uuid } from '@/core/utils/uuid';
    import BaseModal from '@/core/components/ui/base-modal';
    import FormSwitch from '@/core/components/forms/form-switch';
    import Expense from '@/modules/calculator/types/expense';
    import ExpenseFormModel from '@/modules/calculator/types/expense-form-model';

    type CalculatorExpenseFormProps = {
        expenseToEdit?: Expense
    }

    const CalculatorExpenseForm = defineComponent<CalculatorExpenseFormProps>({
        components: { FormSwitch, BaseModal },
        props: {
            expenseToEdit: {
                type: Object,
                default: undefined
            }
        },
        setup(props, { emit }) {
            const expense = ref<ExpenseFormModel>({
                isCarExpense: false,
                name: '',
                grossValue: null
            });

            if (props.expenseToEdit) {
                expense.value = { ...props.expenseToEdit };
            }

            const onSubmit = () => {
                expense.value.grossValue = Number(expense.value.grossValue);
                expense.value.name = expense.value.name.trim();

                if (!expense.value.grossValue || !expense.value.name) return;

                if (props.expenseToEdit) {
                    emit('edit-expense', expense.value);
                } else {
                    expense.value.id = uuid();
                    emit('add-expense', expense.value);
                }
            };

            return {
                expense,
                onSubmit
            };
        }
    });

    export default CalculatorExpenseForm;
</script>
