import CalculatorService from '@/modules/calculator/calculator-service';
import { CalculatorModel } from '@/modules/calculator/types/calculator-model';
import { Ref, ref } from '@vue/composition-api';
import { PersistStatus } from './use-persist';
import CalculatorData from '../calculator-data';

export const useLocalPersist = (status: Ref<PersistStatus>) => {
    const savedData = ref<CalculatorModel | null>(null);

    const saveData = (data: CalculatorModel) => {
        CalculatorService.saveDataLocally(data);
        savedData.value = { ...data };
        status.value = PersistStatus.SAVED;
    };

    const loadData = (data: CalculatorData) => {
        const result = CalculatorService.loadLocalData();

        if (result) {
            data.value = result;
            return result;
        }
    };

    return {
        loadData,
        saveData,
        savedData
    };
};
