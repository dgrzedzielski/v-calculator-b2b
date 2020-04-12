<template>
    <base-form-group
        :name="name"
        :label="label"
    >
        <input
            :id="name"
            :name="name"
            :value="value"
            v-bind="$attrs"
            class="form-group__control"
            @input="$emit('input', $event.target.value)"
        >
    </base-form-group>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import BaseFormGroup from '@/core/components/forms/base-form-group';
    import BaseFormGroupMixin, { BaseFormGroupProps } from '@/core/components/forms/base-form-group-mixin';

    interface InputFormGroupProps extends BaseFormGroupProps {
        value: string | number;
    }

    const InputFormGroup = defineComponent<InputFormGroupProps>({
        mixins: [BaseFormGroupMixin],
        components: { BaseFormGroup },
        inheritAttrs: false,
        props: {
            value: {
                required: true,
                type: [String, Number]
            }
        }
    });

    export default InputFormGroup;
</script>
