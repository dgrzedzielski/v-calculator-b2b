<template>
    <div class="view view--centered">
        <div v-if="isUserLogged">
            kalkulatorek dla zalogowanych jest jeszcze niewdrożony XD
        </div>
        <base-calculator v-else />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import BaseCalculator from './components/base-calculator.vue';

    @Component({
        components: { BaseCalculator }
    })
    export default class CalculatorView extends Vue {
        get isUserLogged() {
            return this.$store.getters['auth/isUserLogged'];
        }
    };
</script>
