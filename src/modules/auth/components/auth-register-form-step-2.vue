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
            <div class="text-right">
                <button-with-loader
                    :loading="loading"
                    type="submit"
                    primary
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
    import { Vue, Component } from 'vue-property-decorator';
    import CalculatorForm from '@/modules/calculator/components/calculator-form.vue';
    import { TaxForm } from '@/modules/calculator/types/tax-form-options';
    import { InsuranceVariant } from '@/modules/calculator/types/insurance-options';
    import { BaseCalculatorFormModel } from '@/modules/calculator/types/calculator-form-model';
    import AuthService from '@/modules/auth/auth-service';

    @Component({
        components: { CalculatorForm }
    })
    export default class AuthRegisterFormStep2 extends Vue {
        form: BaseCalculatorFormModel = {
            netIncome: 0,
            taxForm: TaxForm.LINEAR,
            insuranceVariant: InsuranceVariant.START,
            optionalSicknessInsurance: false
        };
        loading = false;

        async onSubmit() {
            this.loading = true;
            const error = await AuthService.updateSettings(this.form, this.$store.state.auth.user);

            if (error) {
                console.log(error);
                this.$toast.error(error.message);
                this.loading = false;
            } else {
                this.$toast.success('Rejestracja pomyślna');
                this.$router.replace('/');
            }
        }
    };
</script>
