<template>
    <div class="form-group">
        <label
            :for="name"
            class="form-group__label"
        >
            {{ label }}
        </label>
        <slot />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import BaseFormGroupMixin, { BaseFormGroupProps } from '@/core/components/forms/base-form-group-mixin';

    const BaseFormGroup = defineComponent<BaseFormGroupProps>({
        mixins: [BaseFormGroupMixin]
    });

    export default BaseFormGroup;
</script>

<style lang="scss" src="./base-form-group.scss" />
