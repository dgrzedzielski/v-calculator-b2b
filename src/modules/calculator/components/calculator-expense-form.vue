<template>
    <base-modal @close="$emit('close')">
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
                ref="firstInput"
                v-model="expense.grossValue"
                label="Kwota kosztu brutto"
                name="costGrossValue"
                type="number"
                min="0"
                step="0.01"
            />
            <input-form-group
                v-model="expense.name"
                label="Nazwa"
                name="name"
                type="text"
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
                    success
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
                    danger
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
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import BaseModal from '@/core/components/ui/base-modal.vue';
    import InputFormGroup from '@/core/components/forms/input-form-group.vue';
    import FormSwitch from '@/core/components/forms/form-switch.vue';
    import Expense from '@/modules/calculator/types/expense';
    import ExpenseFormModel from '@/modules/calculator/types/expense-form-model';

    @Component({
        components: { FormSwitch, InputFormGroup, BaseModal }
    })
    export default class CalculatorExpenseForm extends Vue {
        @Prop({ type: Object }) expenseToEdit?: Expense;
        expense: ExpenseFormModel = {
            isCarExpense: false,
            name: '',
            grossValue: null,
        };

        created() {
            if (this.expenseToEdit) {
                this.expense = { ...this.expenseToEdit };
            }
        }

        mounted() {
            const inputRef = this.$refs['firstInput'] as InputFormGroup;
            const inputEl = inputRef.$el.lastChild as HTMLInputElement;
            inputEl.focus();
        }

        uuidv4() { // TODO REMOVE IT AFTER CONNECTING WITH SOME BACKEND
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        onSubmit() {
            this.expense.grossValue = Number(this.expense.grossValue);
            this.expense.name = this.expense.name.trim();

            if (!this.expense.grossValue || !this.expense.name) return;

            if (this.expenseToEdit) {
                this.$emit('edit-expense', this.expense);
            } else {
                this.expense.id = this.uuidv4(); // TODO REMOVE IT LIKE ABOVE
                this.$emit('add-expense', this.expense);
            }
        }
    };
</script>
