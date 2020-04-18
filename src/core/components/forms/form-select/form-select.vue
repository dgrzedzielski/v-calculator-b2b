<template>
    <base-form-group
        :label="label"
        :name="name"
    >
        <select
            :id="name"
            :name="name"
            :value="value"
            class="form-group__control form-group__control--select"
            @input="$emit('input', $event.target.value)"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </base-form-group>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import BaseFormGroup from '@/core/components/forms/base-form-group';
    import BaseFormGroupMixin, { BaseFormGroupProps } from '../base-form-group-mixin';

    type Option = {
        value: unknown;
        label: string;
    }

    interface FormSelectProps extends BaseFormGroupProps {
        options: Option[];
        value: unknown;
    }

    const FormSelect = defineComponent({
        mixins: [BaseFormGroupMixin],
        components: { BaseFormGroup },
        props: {
            value: {
                required: true
            },
            options: {
                required: true,
                type: Array
            }
        }
    });

    export default FormSelect;
</script>

<style scoped>

</style>
