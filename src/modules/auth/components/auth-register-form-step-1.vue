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
                outline
                theme="primary"
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
    import Vue from 'vue';
    import { defineComponent, ref, computed } from '@vue/composition-api';
    import { useRouter } from '@/core/composables/use-router';
    import AuthService from '@/modules/auth/auth-service';

    type FeedbackMessages = { [key: string]: string }

    const FEEDBACK_MESSAGES: FeedbackMessages = {
        'auth/invalid-email': 'Podany email jest niepoprawny',
        'auth/email-already-in-use': 'Podany email jest już w użyciu',
        'auth/weak-password': 'Hasło powinno mieć co najmniej 6 znaków',
    };

    const AuthRegisterFormStep1 = defineComponent({
        setup() {
            const email = ref<string>('');
            const password = ref<string>('');
            const retypePassword = ref<string>('');
            const loading = ref<boolean>(false);

            const $router = useRouter();

            const isFormValid = computed(() => password.value === retypePassword.value);
            const onSubmit = async () => {
                Vue.$toast.clear();

                if (!isFormValid.value) {
                    Vue.$toast.error('Błąd walidacji. Hasła nie zgadzają się');
                    return;
                }

                loading.value = true;

                try {
                    await AuthService.register(email.value, password.value);
                    $router.replace({ name: 'auth.register', params: { step: '2' } });
                } catch (e) {
                    Vue.$toast.error(`Rejestracja nieudana. ${FEEDBACK_MESSAGES[e.code]}`);
                } finally {
                    loading.value = false;
                }
            };

            return {
                email,
                password,
                retypePassword,
                loading,
                onSubmit
            };
        }
    });

    export default AuthRegisterFormStep1;
</script>
