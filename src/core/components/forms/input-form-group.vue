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
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import BaseFormGroup from './base-form-group.vue';
    import BaseFormGroupMixin from '@/core/mixins/base-form-group-mixin';

    @Component({
        components: { BaseFormGroup },
        inheritAttrs: false
    })
    export default class InputFormGroup extends Mixins(BaseFormGroupMixin) {
        @Prop({ required: true }) value!: string | number;
    };
</script>
