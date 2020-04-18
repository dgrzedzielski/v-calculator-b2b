import Vue from 'vue';
import Router from 'vue-router';
import CalculatorView from '@/modules/calculator/calculator-view.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: CalculatorView
        },
        {
            path: '/auth',
            component: () => import('@/modules/auth/auth-view.vue'),
            children: [
                {
                    path: '',
                    name: 'auth.login',
                    component: () => import('@/modules/auth/components/auth-login-form.vue')
                },
                {
                    path: 'register/:step?',
                    name: 'auth.register',
                    component: () => import('@/modules/auth/components/auth-register-form.vue')
                },
            ]
        },
        {
            path: '/calculator/:month/:year',
            name: 'calculator',
            component: CalculatorView
            // TODO ONLY FOR LOGGED USERS
        }
    ]
});
