<template>
    <button
        class="floating-button"
        v-on="$listeners"
    >
        <slot>
            <v-icon
                v-if="icon"
                :name="icon"
            />
            <span class="floating-button__title">{{ title }}</span>
        </slot>
    </button>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';

    interface FloatingButtonProps {
        icon: string;
        title: string;
    }

    const FloatingButton = defineComponent<FloatingButtonProps>({
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        }
    });

    export default FloatingButton;
</script>

<style lang="scss" src="./floating-button.scss" />
