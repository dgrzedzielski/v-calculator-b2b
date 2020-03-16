<template>
    <transition
        appear
        mode="out-in"
        name="modal-transition"
    >
        <div class="modal__container">
            <div
                class="modal__overlay"
                @click.stop="$emit('close')"
            />
            <div
                :aria-labelledby="`${modalName}-heading`"
                class="modal"
                role="dialog"
                aria-modal="true"
                @keydown.esc="$emit('close')"
                @keydown.tab="trappedFocusHandler"
            >
                <header
                    class="modal__header"
                >
                    <h3
                        :id="`${modalName}-heading`"
                        class="modal__heading"
                    >
                        <slot name="heading" />
                    </h3>
                    <button
                        class="modal__close"
                        aria-label="Zamknij"
                        @click="$emit('close')"
                    >
                        <v-icon name="times" />
                    </button>
                </header>
                <div
                    ref="modal-body"
                    class="modal__body"
                >
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
    import { getFocusableElements } from '@/core/utils/dom-utils';

    @Component
    export default class BaseModal extends Vue {
        previousFocusedElement: HTMLElement | null = null;
        focusableElements: HTMLElement[] = [];

        mounted() {
            this.previousFocusedElement = document.activeElement as HTMLElement;
            this.focusableElements = getFocusableElements(this.$refs['modal-body'] as HTMLElement);
            if (this.focusableElements.length) {
                this.focusableElements[0].focus();
            }
        }

        beforeDestroy() {
            if (this.previousFocusedElement) {
                this.previousFocusedElement.focus();
            }
        }

        get modalName() {
            return this.$parent.$options.name + '-modal';
        }

        trappedFocusHandler(event: KeyboardEvent) {
            if (this.focusableElements.length === 0) return;

            const lastFocusableElement =
                this.focusableElements[this.focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === this.focusableElements[0]) {
                lastFocusableElement.focus();
                event.preventDefault();
            } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
                this.focusableElements[0].focus();
                event.preventDefault();
            }
        }
    };
</script>

<style lang="scss" src="./base-modal.scss" />
