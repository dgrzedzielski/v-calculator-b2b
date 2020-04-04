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
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import ThemeVariant from '@/core/components/ui/ui-theme';

    @Component
    export default class BaseLoader extends Vue {
        @Prop({ default: '25px' }) width!: string;
        @Prop({ default: ThemeVariant.PRIMARY, type: String }) theme!: ThemeVariant;
    }
</script>
<style lang="scss" src="./base-loader.scss"></style>
