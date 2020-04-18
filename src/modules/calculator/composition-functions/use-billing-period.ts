import VueRouter from 'vue-router';
import { BillingPeriod } from './../types/calculator-model';
import { ref, computed } from '@vue/composition-api';
import CalculatorData from '../calculator-data';
import { useMonths } from '@/core/composition-functions/use-months';

export const useBillingPeriod = (data: CalculatorData, $router: VueRouter) => {
    const isChangeBillingPeriodVisible = ref<boolean>(false);

    const changeBillingPeriod = (newValue: BillingPeriod) => {
        $router.push({ name: 'calculator', params: { ...newValue } });
    };

    const { getMonthName } = useMonths();

    const monthName = computed(() => getMonthName(data.billingPeriod.month));

    return { isChangeBillingPeriodVisible, changeBillingPeriod, monthName };
};
