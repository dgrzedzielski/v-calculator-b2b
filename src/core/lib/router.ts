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
            name: 'calculator',
            component: CalculatorView
        },
    ]
});
