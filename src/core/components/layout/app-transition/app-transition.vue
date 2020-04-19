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
    import { defineComponent } from '@vue/composition-api';

    const AppTransition = defineComponent({
        setup() {
            const onBeforeLeave = () => {
                document.body.style.overflow = 'hidden';
            };

            const onAfterEnter = () => {
                document.body.style.overflow = '';
            };

            return {
                onBeforeLeave,
                onAfterEnter
            };
        }
    });

    export default AppTransition;
</script>
