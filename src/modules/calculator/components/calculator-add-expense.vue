<template>
    <base-modal @close="$emit('close')">
        <template slot="heading">
            Dodaj koszt
        </template>
        <form
            class="add-cost__form"
            @submit.prevent="addExpense"
        >
            <input-form-group
                ref="valueInput"
                v-model="grossValue"
                label="Kwota kosztu brutto"
                name="costGrossValue"
                type="number"
                min="0"
                step="0.01"
            />
            <input-form-group
                v-model="name"
                label="Nazwa"
                name="name"
                type="text"
            />
            <form-switch
                v-model="isCarExpense"
                name="isCarExpense"
                type="switch"
                label="Koszt samochodowy"
            />
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
        </form>
    </base-modal>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import BaseModal from '@/core/components/ui/base-modal.vue';
    import InputFormGroup from '@/core/components/forms/input-form-group.vue';
    import FormSwitch from '@/core/components/forms/form-switch.vue';
    import Expense from '@/modules/calculator/types/expense';

    @Component({
        components: { FormSwitch, InputFormGroup, BaseModal }
    })
    export default class AddExpense extends Vue {
        isCarExpense = false;
        name = '';
        grossValue: number | null = null;

        mounted() {
            const inputRef = this.$refs['valueInput'] as InputFormGroup;
            const inputEl = inputRef.$el.lastChild as HTMLInputElement;
            inputEl.focus();
        }

        addExpense() {
            if (!this.grossValue) return;

            const expense: Expense = {
                isCarExpense: this.isCarExpense,
                grossValue: Number(this.grossValue),
                name: this.name
            };

            this.$emit('add-expense', expense);
        }
    };
</script>
