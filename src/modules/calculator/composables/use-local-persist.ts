import CalculatorService from '@/modules/calculator/calculator-service';
import { CalculatorModel } from '@/modules/calculator/types/calculator-model';
import { Ref, ref } from '@vue/composition-api';
import { PersistStatus } from './use-persist';
import CalculatorData from '../calculator-data';
import { useCalculatorStore } from '@/modules/calculator/use-calculator-store';

export const useLocalPersist = (status: Ref<PersistStatus>) => {
    const { data, setData } = useCalculatorStore();
    const savedData = ref<CalculatorModel | null>(null);

    const saveData = () => {
        CalculatorService.saveDataLocally(data.value);
        savedData.value = { ...data.value };
        status.value = PersistStatus.SAVED;
    };

    const loadData = () => {
        const result = CalculatorService.loadLocalData();

        if (result) {
            setData(result);
            return result;
        }
    };

    return {
        loadData,
        saveData,
        savedData,
    };
};
