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
    import { computed, defineComponent, toRefs } from '@vue/composition-api';
    import { BaseButtonProps } from '@/core/components/buttons/button-types';
    import ButtonMixin from '@/core/components/buttons/button-mixin';

    const BaseButton = defineComponent<BaseButtonProps>({
        mixins: [ButtonMixin],
        setup(
            props: BaseButtonProps,
            { emit }
        ) {
            const classes = computed(() => {
                const result: string[] = ['btn', `btn--${props.theme}`];

                if (props.outline) {
                    result.push('btn--outline');
                }

                if (props.size) {
                    result.push(`btn--${props.size}`);
                }

                return result;
            });

            const handleClick = (event: Event) => {
                if (props.disabled) return;
                emit('click', event);
            };

            return { classes, handleClick };
        }
    });

    export default BaseButton;
</script>

<style lang="scss" src="./base-button.scss" />
