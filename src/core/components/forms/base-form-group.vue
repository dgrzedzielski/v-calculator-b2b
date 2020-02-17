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
    import { Component, Mixins } from 'vue-property-decorator';
    import BaseFormGroupMixin from '@/core/mixins/base-form-group-mixin';

    @Component
    export default class BaseFormGroup extends Mixins(BaseFormGroupMixin) {}
</script>

<style lang="scss" src="./base-form-group.scss" />
