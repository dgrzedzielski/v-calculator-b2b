<template>
    <section>
        <h3 class="register__step-title">
            Podaj domyślne dane dla kalkulatora
        </h3>
        <div class="register__step-description">
            <p class="m-0">
                Będą one przypisywane domyślnie do wyliczeń, aby użycie kalkulatora było wygodniejsze.
            </p>
            <p>
                Po stworzeniu konta w ustawieniach użytkownika będzie można zmienić podane wartości.
            </p>
        </div>
        <calculator-form
            v-model="form"
            @submit="onSubmit"
        >
            <div class="flex justify-end">
                <button-with-loader
                    :loading="loading"
                    type="submit"
                    theme="primary"
                    outline
                >
                    <span class="btn__text">Potwierdź</span>
                    <v-icon
                        name="check"
                        class="btn__icon"
                    />
                </button-with-loader>
            </div>
        </calculator-form>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import CalculatorForm from '@/modules/calculator/components/calculator-form.vue';
    import { TaxForm } from '@/modules/calculator/types/tax-form-options';
    import { InsuranceVariant } from '@/modules/calculator/types/insurance-options';
    import { BaseCalculatorFormModel } from '@/modules/calculator/types/calculator-model';
    import { defineComponent, ref } from '@vue/composition-api';
    import { useRouter } from '@/core/composables/use-router';
    import CalculatorService from '@/modules/calculator/calculator-service';
    import { useAuthStore } from '@/modules/auth/auth-store';

    const AuthRegisterFormStep2 = defineComponent({
        components: {
            CalculatorForm
        },
        setup() {
            const form = ref<BaseCalculatorFormModel>({
                netIncome: 0,
                taxForm: TaxForm.LINEAR,
                insuranceVariant: InsuranceVariant.START,
                optionalSicknessInsurance: false
            });
            const loading = ref<boolean>(false);

            const $router = useRouter();
            const { user } = useAuthStore();

            const onSubmit = async () => {
                loading.value = true;

                const error = await CalculatorService.saveDefaultData(form.value, user.value);
                if (error) {
                    console.log(error);
                    Vue.$toast.error(error.message);
                    loading.value = false;
                } else {
                    Vue.$toast.success('Rejestracja pomyślna');
                    $router.replace('/');
                }
            };

            return {
                form,
                loading,
                onSubmit
            };
        }
    });

    export default AuthRegisterFormStep2;
</script>
