<template>
    <button
        :disabled="disabled"
        :class="classes"
        @click="handleClick"
    >
        <slot />
    </button>
</template>

<script lang="ts">
    import { Component, Mixins } from 'vue-property-decorator';
    import ButtonMixin from '@/core/mixins/button-mixin';

    const BUTTON_TYPES = ['primary', 'success', 'danger'];

    @Component
    export default class Button extends Mixins(ButtonMixin) {
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
