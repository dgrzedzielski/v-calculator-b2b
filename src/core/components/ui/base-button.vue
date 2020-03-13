<template>
    <button
        :class="classes"
        @click="handleClick"
    >
        <span
            class="btn__content"
            tabindex="-1"
        >
            <slot />
        </span>
    </button>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    const BUTTON_TYPES = ['primary', 'secondary', 'success', 'danger'];

    @Component
    export default class Button extends Vue {
        @Prop({ default: false, type: Boolean }) primary!: boolean;
        @Prop({ default: false, type: Boolean }) secondary!: boolean;
        @Prop({ default: false, type: Boolean }) success!: boolean;
        @Prop({ default: false, type: Boolean }) danger!: boolean;
        @Prop({ default: false, type: Boolean }) outline!: boolean;
        @Prop({ default: false, type: Boolean }) small!: boolean;
        @Prop({ default: false, type: Boolean }) large!: boolean;
        @Prop({ default: false, type: Boolean }) disabled!: boolean;

        get classes(): string[] {
            const result: string[] = ['btn'];

            for (let buttonType of BUTTON_TYPES) {
                if (this.$props[buttonType]) {
                    result.push(`btn--${buttonType}`);
                }
            }

            if (this.outline) {
                result.push('btn--outline');
            }

            if (this.small) {
                result.push('btn--small');
            } else if (this.large) {
                result.push('btn--large');
            }

            return result;
        }

        handleClick(event: Event) {
            if (this.disabled) return null;
            this.$emit('click', event);
        }
    };
</script>

<style lang="scss" src="./base-button.scss" />
