<template>
    <form @submit.prevent="onSubmit">
        <h3 class="register__step-title register__step-title--bigger-margin">
            Podaj dane podstawowe
        </h3>
        <input-form-group
            v-model="email"
            label="Email"
            name="register-email"
            type="email"
            required
        />
        <input-form-group
            v-model="password"
            label="Hasło"
            name="register-password"
            type="password"
            minlength="6"
            required
        />
        <input-form-group
            v-model="retypePassword"
            label="Powtórz hasło"
            name="register-retype-password"
            type="password"
            minlength="6"
            required
        />
        <div class="flex justify-between align-center">
            <base-link :to="{ name: 'auth.login' }">
                Mam już konto
            </base-link>
            <button-with-loader
                :loading="loading"
                primary
                outline
                type="submit"
            >
                <span class="btn__text">Dalej</span>
                <v-icon
                    name="arrow-right"
                    class="btn__icon"
                />
            </button-with-loader>
        </div>
    </form>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import AuthService from '@/modules/auth/auth-service';

    type FeedbackMessages = { [key: string]: string }

    @Component
    export default class AuthRegisterFormStep1 extends Vue {
        email = '';
        password = '';
        retypePassword = '';
        loading = false;

        get signUpFeedbackMessages(): FeedbackMessages {
            return {
                'auth/invalid-email': 'Podany email jest niepoprawny',
                'auth/email-already-in-use': 'Podany email jest już w użyciu',
                'auth/weak-password': 'Hasło powinno mieć co najmniej 6 znaków',
            };
        }

        get isFormValid() {
            return this.password === this.retypePassword;
        }

        async onSubmit() {
            this.$toast.clear();

            if (!this.isFormValid) {
                this.$toast.error('Błąd walidacji. Hasła nie zgadzają się');
                return;
            }

            this.loading = true;

            try {
                await AuthService.register(this.email, this.password);
                this.$router.replace({ name: 'auth.register', params: { step: '2' } });
            } catch (e) {
                this.$toast.error(`Rejestracja nieudana. ${this.signUpFeedbackMessages[e.code]}`);
            } finally {
                this.loading = false;
            }
        }
    };
</script>
