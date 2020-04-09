<template>
    <span
        :style="{ width: width }"
        :class="`loader loader--${theme}`"
        aria-label="Ładowanie..."
    >
        <svg
            aria-hidden="true"
            class="loader__circular"
            viewBox="25 25 50 50"
        >
            <circle
                class="loader__path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke-width="2"
                stroke-miterlimit="10"
            />
        </svg>
    </span>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import { Themable, ThemeVariant } from '@/core/components/ui/ui-theme';

    interface BaseLoaderProps extends Themable {
        width: string;
    }

    const BaseLoader = defineComponent<BaseLoaderProps>({
        props: {
            width: {
                type: String,
                default: '25px'
            },
            theme: {
                type: String,
                default: 'primary'
            }
        }
    });

    export default BaseLoader;
</script>
<style lang="scss" src="./base-loader.scss"></style>
