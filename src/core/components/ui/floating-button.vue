<template>
    <button
        class="floating-button"
        v-on="$listeners"
    >
        <slot>
            <v-icon :name="icon" />
            <span class="floating-button__title">{{ title }}</span>
        </slot>
    </button>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export default class FloatingButton extends Vue {
        @Prop({ type: String, default: '' }) icon!: string;
        @Prop({ type: String, default: '' }) title!: string;
    };
</script>

<style lang="scss" src="./floating-button.scss" />
