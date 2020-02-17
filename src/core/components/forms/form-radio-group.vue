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
    import { Component, Prop, Mixins } from 'vue-property-decorator';
    import BaseFormGroupMixin from '@/core/mixins/base-form-group-mixin';

    @Component
    export default class FormRadioGroup extends Mixins(BaseFormGroupMixin) {
        @Prop({ required: true, type: [String, Number] }) value!: string | number;
        @Prop({ required: true, type: Array }) options!: Array<any>;
        @Prop({ default: 'id', type: String }) optionValueKey!: string;
        @Prop({ default: 'label', type: String }) optionLabelKey!: string;
    };
</script>

<style lang="scss" src="./form-radio-group.scss" />
