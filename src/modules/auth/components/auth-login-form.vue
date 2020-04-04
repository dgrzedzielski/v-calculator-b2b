<template>
    <section class="card auth-card">
        <h2 class="section__heading">
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
                    primary
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
    import { Vue, Component } from 'vue-property-decorator';
    import AuthService from '@/modules/auth/auth-service';
    import ButtonWithLoader from '@/core/components/ui/button-with-loader.vue';

    @Component({
        components: { ButtonWithLoader }
    })
    export default class AuthLoginForm extends Vue {
        email = '';
        password = '';
        loading = false;

        async onSubmit() {
            this.loading = true;
            this.$toast.clear();

            try {
                await AuthService.login(this.email, this.password);
                this.$toast.success('Logowanie udane');
                this.$router.replace('/');
            } catch (e) {
                this.$toast.error('Logowanie nieudane');
            } finally {
                this.loading = false;
            }
        }
    };
</script>
