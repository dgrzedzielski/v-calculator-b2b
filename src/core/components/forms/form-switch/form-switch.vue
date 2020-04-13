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
                    class="form-switch__indicator"
                    aria-hidden="true"
                />
                <span class="form-switch__label-text">
                    {{ label }}
                </span>
            </label>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import BaseFormGroupMixin, { BaseFormGroupProps } from '@/core/components/forms/base-form-group-mixin';

    interface FormSwitchProps extends BaseFormGroupProps {
        value: boolean;
    }

    const FormSwitch = defineComponent<FormSwitchProps>({
        mixins: [BaseFormGroupMixin],
        props: {
            value: {
                type: Boolean,
                required: true
            }
        }
    });

    export default FormSwitch;
</script>

<style lang="scss" src="./form-switch.scss" />
