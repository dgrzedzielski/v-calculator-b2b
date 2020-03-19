<template>
    <div class="list-menu__container">
        <transition name="scale-slide-down">
            <ul
                v-show="isOpen"
                class="list-menu"
            >
                <li
                    v-for="item in items"
                    :key="item.title"
                    class="list-menu__item"
                >
                    <button
                        class="list-menu__button"
                        @click="() => item.onClick() + setIsOpen(false)"
                    >
                        {{ item.title }}
                    </button>
                </li>
            </ul>
        </transition>
        <slot
            name="trigger"
            v-bind="{ setIsOpen, isOpen }"
        />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import DomUtils from '@/core/utils/dom-utils';

    type ListItem = {
        title: string;
        onClick: Function;
    }

    @Component
    export default class ListMenu extends Vue {
        @Prop({ type: Array, required: true }) items!: Array<ListItem>;
        isOpen = false;

        mounted() {
            document.addEventListener('click', this.closeMenuOnClickOutside);
        }

        beforeDestroy() {
            document.removeEventListener('click', this.closeMenuOnClickOutside);
        }

        closeMenuOnClickOutside(event: MouseEvent) {
            if (DomUtils.isClickOutsideElement(this.$el, event)) {
                this.setIsOpen(false);
            }
        }

        setIsOpen(value: boolean) {
            this.isOpen = value;
        }
    };
</script>

<style lang="scss" src="./list-menu.scss" />
