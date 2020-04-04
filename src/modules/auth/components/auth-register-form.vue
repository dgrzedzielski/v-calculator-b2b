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
    import { Vue, Component } from 'vue-property-decorator';
    import AuthRegisterFormStep1 from '@/modules/auth/components/auth-register-form-step-1.vue';
    import AuthRegisterFormStep2 from '@/modules/auth/components/auth-register-form-step-2.vue';

    @Component({
        components: { AuthRegisterFormStep2, AuthRegisterFormStep1 }
    })
    export default class AuthRegisterForm extends Vue {
        get step(): number {
            if (!this.$route.params.step) return 1;

            return Number(this.$route.params.step);
        }
    };
</script>

<style lang="scss" src="./auth-register-form.scss" />
