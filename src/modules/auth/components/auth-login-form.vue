<template>
    <section class="card auth-card">
        <h2 class="card__heading">
            Logowanie
        </h2>
        <form @submit.prevent="onSubmit">
            <input-form-group
                v-model="email"
                label="Email"
                name="login-email"
                type="email"
                required
            />
            <input-form-group
                v-model="password"
                label="Hasło"
                name="login-password"
                type="password"
                required
            />
            <div class="flex justify-between align-center">
                <button-with-loader
                    :loading="loading"
                    theme="primary"
                    outline
                >
                    Zaloguj
                </button-with-loader>
                <base-link :to="{ name: 'auth.register' }">
                    Stwórz konto
                </base-link>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AuthService from '@/modules/auth/auth-service';
    import { defineComponent, ref } from '@vue/composition-api';
    import { useRouter } from '@/core/composables/use-router';

    const AuthLoginForm = defineComponent({
        setup() {
            const email = ref<string>('');
            const password = ref<string>('');
            const loading = ref<boolean>(false);
            const $router = useRouter();

            const onSubmit = async () => {
                loading.value = true;
                Vue.$toast.clear();

                try {
                    await AuthService.login(email.value, password.value);
                    Vue.$toast.success('Logowanie udane');
                    $router.replace('/');
                } catch (e) {
                    Vue.$toast.error('Logowanie nieudane');
                } finally {
                    loading.value = false;
                }
            };

            return {
                email,
                password,
                loading,
                onSubmit
            };
        }
    });

    export default AuthLoginForm;
</script>
