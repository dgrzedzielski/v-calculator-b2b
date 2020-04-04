<template>
    <base-button
        :class="{ 'btn--loading': loading }"
        v-bind="{ ...$props, disabled: disabled || loading }"
        v-on="$listeners"
    >
        <base-loader
            v-if="loading"
            :theme="loaderTheme"
            class="btn__loader"
        />
        <span class="btn__content">
            <slot />
        </span>
    </base-button>
</template>

<script lang="ts">
    import { Component, Prop, Mixins } from 'vue-property-decorator';
    import ButtonMixin from '@/core/mixins/button-mixin';

    @Component
    export default class ButtonWithLoader extends Mixins(ButtonMixin) {
        @Prop({ type: Boolean, default: false }) loading!: boolean;

        get loaderTheme() {
            if (this.primary) return 'primary';
            if (this.success) return 'success';
            if (this.danger) return 'danger';
        }
    };
</script>
