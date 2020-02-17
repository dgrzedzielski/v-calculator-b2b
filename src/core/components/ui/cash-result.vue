<template>
    <div
        :class="[`cash-result--${type}`]"
        class="cash-result"
    >
        <div
            v-if="icon"
            class="cash-result__icon-container"
        >
            <v-icon
                :name="icon"
                class="cash-result__icon"
            />
        </div>
        <span
            v-else
            class="cash-result__indicator"
            aria-hidden="true"
        />
        <dl class="cash-result__text-container">
            <dt class="cash-result__label">
                {{ label }}
            </dt>
            <dd class="cash-result__value-container">
                <span class="cash-result__value">{{ value | currency }}</span>
                <span class="cash-result__unit">&nbsp;{{ unit }}</span>
            </dd>
        </dl>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export default class CashResult extends Vue {
        @Prop({ required: true, type: String }) label!: string;
        @Prop({ required: true, type: Number }) value!: number;
        @Prop({ default: 'PLN', type: String }) unit!: string;
        @Prop({ default: 'primary', type: String }) type!: string;
        @Prop({ default: '', type: String }) icon!: string;
    };
</script>

<style lang="scss" src="./cash-result.scss" />
