<template>
    <div class="form-radio-group">
        <fieldset class="form-radio-group__fieldset">
            <legend class="form-radio-group__legend">
                {{ label }}
            </legend>
            <div class="form-radio-group__options">
                <div
                    v-for="(item, index) in options"
                    :key="item[optionValueKey]"
                    :class="{ 'form-radio-group__option--checked': item[optionValueKey] === value }"
                    class="form-radio-group__option"
                >
                    <input
                        :id="`${name}-${index}`"
                        :name="name"
                        :value="item[optionValueKey]"
                        :checked="item[optionValueKey] === value"
                        type="radio"
                        class="form-radio-group__input"
                        @change="$emit('input', item[optionValueKey])"
                    >
                    <label
                        :for="`${name}-${index}`"
                        class="form-radio-group__label"
                    >
                        <span
                            class="form-radio-group__label-text"
                            v-html="item[optionLabelKey]"
                        />
                    </label>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import BaseFormGroupMixin, { BaseFormGroupProps } from '@/core/components/forms/base-form-group-mixin';

    interface FormRadioGroupProps extends BaseFormGroupProps {
        value: string | number;
        options: Array<unknown>;
        optionValueKey: string;
        optionLabelKey: string;
    }

    const FormRadioGroup = defineComponent<FormRadioGroupProps>({
        mixins: [BaseFormGroupMixin],
        props: {
            value: {
                type: [String, Number],
                required: true
            },
            options: {
                type: Array,
                required: true
            },
            optionValueKey: {
                type: String,
                default: 'id'
            },
            optionLabelKey: {
                type: String,
                default: 'label'
            }
        }
    });

    export default FormRadioGroup;
</script>

<style lang="scss" src="./form-radio-group.scss" />
