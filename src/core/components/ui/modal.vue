<template>
    <transition
        appear
        mode="out-in"
        name="modal-transition"
    >
        <div
            class="modal"
            role="dialog"
        >
            <div
                class="modal__overlay"
                @click.stop="$emit('close')"
            />
            <div class="modal__content">
                <header
                    v-if="$slots.heading"
                    class="modal__header"
                >
                    <h3 class="modal__heading">
                        <slot name="heading" />
                    </h3>
                </header>
                <div class="modal__body">
                    <slot />
                </div>
                <footer
                    v-if="$slots.footer"
                    class="modal__footer"
                >
                    <slot name="footer" />
                </footer>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    @Component
    export default class Modal extends Vue {};
</script>
