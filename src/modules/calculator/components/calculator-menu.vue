<template>
    <div class="calculator-menu">
        <list-menu :items="menuItems">
            <template v-slot:trigger="{ setIsOpen, isOpen }">
                <button
                    class="calculator-menu__button"
                    @click="setIsOpen(!isOpen)"
                >
                    <v-icon name="ellipsis-v" />
                </button>
            </template>
        </list-menu>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import ListMenu from '@/core/components/ui/list-menu.vue';
    import CalculatorService from '@/modules/calculator/calculator-service';
    import CalculatorFormModel from '@/modules/calculator/types/calculator-form-model';

    @Component({
        components: { ListMenu }
    })
    export default class CalculatorMenu extends Vue {
        @Prop({ type: Object, required: true }) formData!: CalculatorFormModel;

        get menuItems() {
            return [
                {
                    title: 'Zapisz',
                    onClick: () => CalculatorService.save(this.formData)
                },
                {
                    title: 'Zapisz jako...',
                    onClick: () => console.log('saving as') // TODO SAVING AS FEATURE
                }
            ];
        }
    };
</script>

<style lang="scss" src="./calculator-menu.scss" />
