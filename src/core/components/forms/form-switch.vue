<template>
    <div class="form-group">
        <div
            :class="{ 'form-switch--checked': value }"
            class="form-switch"
        >
            <input
                :id="name"
                :value="value"
                :name="name"
                type="checkbox"
                class="form-switch__input"
                @input="$emit('input', !value)"
            >
            <label
                :for="name"
                class="form-switch__label"
            >
                <span
                    class="form-switch__indicator-container"
                    aria-hidden="true"
                >
                    <span class="form-switch__indicator" />
                </span>
                <span class="form-switch__label-text">
                    {{ label }}
                </span>
            </label>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import BaseFormGroupMixin from '@/core/mixins/base-form-group-mixin';

    @Component
    export default class FormSwitch extends Mixins(BaseFormGroupMixin) {
        @Prop({ required: true }) value!: boolean;
    };
</script>
