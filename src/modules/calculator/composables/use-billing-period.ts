import { ref, computed } from '@vue/composition-api';
import { useMonths } from '@/core/composables/use-months';
import { useRouter } from '@/core/composables/use-router';
import { useCalculatorStore } from '@/modules/calculator/calculator-store';
import { BillingPeriod } from '../types/calculator-model';

export const useBillingPeriod = () => {
    const $router = useRouter();

    const { billingPeriod } = useCalculatorStore();
    const isChangeBillingPeriodVisible = ref<boolean>(false);
    const { getMonthName } = useMonths();

    const changeBillingPeriod = (newValue: BillingPeriod) => {
        $router.push({ name: 'calculator', params: { ...newValue } });
    };

    const monthName = computed(() => getMonthName(billingPeriod.value.month));

    return { isChangeBillingPeriodVisible, changeBillingPeriod, monthName };
};
