<template>
    <router-link
        class="link"
        :to="to"
    >
        <slot />
    </router-link>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    interface ToPropType {
        path?: string;
        name?: string;
        params: { [key: string]: string }
    }

    @Component
    export default class BaseLink extends Vue {
        @Prop({ type: [String, Object], required: true }) to!: string | ToPropType;
    };
</script>

<style lang="scss" src="./base-link.scss" />
