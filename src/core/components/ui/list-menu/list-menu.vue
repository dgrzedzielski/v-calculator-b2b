<template>
    <div
        ref="$el"
        class="list-menu__container"
    >
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
    import {
        defineComponent,
        onBeforeUnmount,
        onMounted,
        ref
    } from '@vue/composition-api';
    import DomUtils from '@/core/utils/dom-utils';

    export type ListItem = {
        title: string;
        onClick: Function;
    }

    interface ListItemProps {
        items: ListItem[]
    }

    const ListMenu = defineComponent<ListItemProps>({
        props: {
            items: {
                required: true,
                type: Array
            }
        },
        setup() {
            const $el = ref<HTMLElement | null>(null);
            const isOpen = ref<boolean>(false);

            const closeMenuOnClickOutside = (event: MouseEvent) => {
                if (DomUtils.isClickOutsideElement($el.value!, event)) {
                    setIsOpen(false);
                }
            };

            const setIsOpen = (value: boolean) => {
                isOpen.value = value;
            };

            onMounted(() => {
                document.addEventListener('click', closeMenuOnClickOutside);
            });

            onBeforeUnmount(() => {
                document.removeEventListener('click', closeMenuOnClickOutside);
            });

            return { isOpen, setIsOpen };
        }
    });

    export default ListMenu;
</script>

<style lang="scss" src="list-menu.scss" />
