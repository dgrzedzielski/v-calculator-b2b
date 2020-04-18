import VueRouter from 'vue-router';
import { BillingPeriod } from './../types/calculator-model';
import { ref } from '@vue/composition-api';

export const useBillingPeriod = ($router: VueRouter) => {
    const isChangeBillingPeriodVisible = ref<boolean>(false);

    const changeBillingPeriod = (newValue: BillingPeriod) => {
        $router.push({ name: 'calculator', params: { ...newValue } });
    };

    return { isChangeBillingPeriodVisible, changeBillingPeriod };
};
