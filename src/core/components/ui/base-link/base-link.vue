<template>
    <router-link
        class="link"
        :to="to"
    >
        <slot />
    </router-link>
</template>

<script lang="ts">
    import { defineComponent, PropType } from '@vue/composition-api';
    import { ToPropType } from '@/core/types/nav';

    interface BaseLinkProps {
        to: string | ToPropType
    }

    const BaseLink = defineComponent<BaseLinkProps>({
        props: {
            to: {
                type: [String, Object],
                required: true
            }
        }
    });

    export default BaseLink;
</script>

<style lang="scss" src="./base-link.scss" />
