<template>
    <ul class="calculator-expenses-list">
        <li
            v-for="expense in expenses"
            :key="expense.name"
            class="calculator-expenses-list__item"
        >
            <button
                class="calculator-expenses-list__clickable"
                @click="$emit('open-expense-edit', expense)"
            >
                <span class="calculator-expenses-list__name">
                    {{ expense.name }}
                </span>
                <span class="calculator-expenses-list__value">
                    {{ expense.grossValue | currency }} PLN
                </span>
            </button>
        </li>
    </ul>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import Expense from '@/modules/calculator/types/expense';

    @Component
    export default class CalculatorExpensesList extends Vue {
        @Prop({ required: true, type: Array }) expenses!: Expense[];
    };
</script>

<style lang="scss" src="./calculator-expenses-list.scss" />
