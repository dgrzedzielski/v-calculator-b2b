<template>
    <base-button
        :class="{ 'btn--loading': loading }"
        v-bind="{ ...$props, disabled: disabled || loading }"
        v-on="$listeners"
    >
        <base-loader
            v-if="loading"
            :theme="theme"
            class="btn__loader"
        />
        <span class="btn__content">
            <slot />
        </span>
    </base-button>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import ButtonMixin from '@/core/components/buttons/button-mixin';
    import { BaseButtonProps } from '@/core/components/buttons/button-types';

    interface ButtonWithLoader extends BaseButtonProps {
        loading: boolean;
    }

    const ButtonWithLoader = defineComponent<ButtonWithLoader>({
        mixins: [ButtonMixin],
        props: {
            loading: {
                required: true,
                type: Boolean
            }
        }
    });

    export default ButtonWithLoader;
</script>
