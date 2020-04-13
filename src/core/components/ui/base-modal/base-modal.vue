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
                :aria-labelledby="`${name}-heading`"
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
                        :id="`${name}-heading`"
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
                    ref="modalBody"
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
    import { defineComponent, onBeforeUnmount, onMounted, ref } from '@vue/composition-api';
    import DomUtils from '@/core/utils/dom-utils';

    interface BaseModalProps {
        name: string;
    }

    const BaseModal = defineComponent<BaseModalProps>({
        props: {
            name: {
                type: String,
                required: true
            }
        },
        setup() {
            const previousFocusedElement = ref<HTMLElement | null>(null);
            const focusableElements = ref<HTMLElement[]>([]);
            const modalBody = ref<HTMLElement | null>(null);

            onMounted(() => {
                previousFocusedElement.value = document.activeElement as HTMLElement;
                focusableElements.value = DomUtils.getFocusableElements(modalBody.value!);

                if (focusableElements.value.length) {
                    focusableElements.value[0].focus();
                }
            });

            onBeforeUnmount(() => {
                if (previousFocusedElement.value) {
                    previousFocusedElement.value.focus();
                }
            });

            const trappedFocusHandler = (event: KeyboardEvent) => {
                if (focusableElements.value.length === 0) return;

                const lastFocusableElement =
                    focusableElements.value[focusableElements.value.length - 1];

                if (event.shiftKey && document.activeElement === focusableElements.value[0]) {
                    lastFocusableElement.focus();
                    event.preventDefault();
                } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
                    focusableElements.value[0].focus();
                    event.preventDefault();
                }
            };

            return {
                trappedFocusHandler,
                modalBody
            };
        }
    });

    export default BaseModal;
</script>

<style lang="scss" src="./base-modal.scss" />
