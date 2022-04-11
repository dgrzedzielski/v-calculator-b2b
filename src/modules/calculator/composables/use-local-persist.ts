import CalculatorService from '@/modules/calculator/calculator-service';
import { CalculatorModel } from '@/modules/calculator/types/calculator-model';
import { Ref, ref } from '@vue/composition-api';
import { PersistStatus } from './use-persist';

export const useLocalPersist = (status: Ref<PersistStatus>) => {
    const savedData = ref<CalculatorModel | null>(null);

    const saveData = (data: CalculatorModel) => {
        localStorage.setItem(
            CalculatorService.getCurrentMonthKey(),
            JSON.stringify(data)
        );
        savedData.value = { ...data };
        status.value = PersistStatus.SAVED;
    };

    const loadData = (): CalculatorModel | null => {
        const result = localStorage.getItem(
            CalculatorService.getCurrentMonthKey()
        );

        if (result) return JSON.parse(result);

        return null;
    };

    return {
        loadData,
        saveData,
        savedData,
    };
};
