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
    import { computed, defineComponent } from '@vue/composition-api';
    import { BaseButtonProps } from '@/core/components/buttons/button-types';
    import ButtonMixin from '@/core/components/buttons/button-mixin';

    const BaseButton = defineComponent<BaseButtonProps>({
        mixins: [ButtonMixin],
        setup(
            { theme, disabled, outline, size }: BaseButtonProps,
            { emit }
        ) {
            const classes = computed(() => {
                const result: string[] = ['btn', `btn--${theme}`];

                if (outline) {
                    result.push('btn--outline');
                }

                if (size) {
                    result.push(`btn--${size}`);
                }

                return result;
            });

            const handleClick = (event: Event) => {
                if (disabled) return;
                emit('click', event);
            };

            return { classes, handleClick };
        }
    });

    export default BaseButton;
</script>

<style lang="scss" src="./base-button.scss" />
