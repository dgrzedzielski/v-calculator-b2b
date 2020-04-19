<template>
    <transition
        mode="out-in"
        name="fade-slide-x"
        @after-enter="onAfterEnter"
        @before-leave="onBeforeLeave"
    >
        <slot />
    </transition>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from '@vue/composition-api';

    const AppTransition = defineComponent({
        setup() {
            let appElement: HTMLElement;

            onMounted(() => {
                appElement = document.querySelector('.app') as HTMLElement;
            });

            const onBeforeLeave = () => {
                appElement.style.overflow = 'hidden';
            };

            const onAfterEnter = () => {
                appElement.style.overflow = '';
            };

            return {
                onBeforeLeave,
                onAfterEnter
            };
        }
    });

    export default AppTransition;
</script>
