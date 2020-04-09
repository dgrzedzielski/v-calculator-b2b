<template>
    <section class="card auth-card register">
        <h2 class="section__heading">
            Rejestracja
        </h2>
        <span class="register__steps">Krok {{ step }} / 2</span>
        <auth-register-form-step-1
            v-if="step === 1"
        />
        <auth-register-form-step-2
            v-if="step === 2"
        />
    </section>
</template>

<script lang="ts">
    import AuthRegisterFormStep1 from '@/modules/auth/components/auth-register-form-step-1.vue';
    import AuthRegisterFormStep2 from '@/modules/auth/components/auth-register-form-step-2.vue';
    import { computed, defineComponent } from '@vue/composition-api';
    import { useRouter } from '@/core/composition-functions/use-router';

    const AuthRegisterForm = defineComponent({
        components: { AuthRegisterFormStep2, AuthRegisterFormStep1 },
        setup() {
            const $router = useRouter();
            const step = computed(() => {
                if (!$router.currentRoute.params.step) return 1;

                return Number($router.currentRoute.params.step);
            });

            return {
                step
            };
        }
    });

    export default AuthRegisterForm;
</script>

<style lang="scss" src="./auth-register-form.scss" />
