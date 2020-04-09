<template>
    <div
        :class="classes"
        class="cash-result"
    >
        <div
            v-if="icon"
            class="cash-result__icon-container"
        >
            <v-icon
                :name="icon"
                class="cash-result__icon"
            />
        </div>
        <span
            v-else
            class="cash-result__indicator"
            aria-hidden="true"
        />
        <dl class="cash-result__text-container">
            <dt class="cash-result__label">
                {{ label }}
            </dt>
            <dd class="cash-result__value-container">
                <span class="cash-result__value">{{ value | currency }}</span>
                <span class="cash-result__unit">&nbsp;{{ currency }}</span>
            </dd>
        </dl>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, PropType } from '@vue/composition-api';
    import { Themable, ThemeVariant } from '@/core/components/ui/ui-theme';

    interface CashResultProps extends Themable {
        label: string;
        value: string;
        currency: string;
        icon: string;
    }

    const CashResult = defineComponent<CashResultProps>({
        props: {
            theme: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            },
            value: {
                type: [String, Number],
                required: true
            },
            currency: {
                type: String,
                default: 'PLN'
            },
            icon: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            const classes = computed(() => {
                const result = [`cash-result--${props.theme}`];

                if (props.icon) {
                    result.push('cash-result--with-icon');
                }

                return result;
            });

            return {
                classes
            };
        }
    });

    export default CashResult;
</script>

<style lang="scss" src="./cash-result.scss" />
