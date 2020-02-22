<template functional>
    <ul class="calculator-expenses-list">
        <li
            v-for="expense in props.expenses"
            :key="expense.name"
            class="calculator-expenses-list__item"
        >
            <span class="calculator-expenses-list__name">{{ expense.name }}</span>
            <span class="calculator-expenses-list__value">{{ expense.grossValue | currency }} PLN</span>
        </li>
    </ul>
</template>

<style lang="scss" src="./calculator-expenses-list.scss" />
