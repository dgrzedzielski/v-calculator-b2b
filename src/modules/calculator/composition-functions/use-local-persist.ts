import CalculatorService from '@/modules/calculator/calculator-service';
import { CalculatorModel } from '@/modules/calculator/types/calculator-model';
import { Ref, ref } from '@vue/composition-api';
import { PersistStatus } from './use-persist';

const useLocalPersist = (data: Ref<CalculatorModel>, status: Ref<PersistStatus>) => {
    const savedData = ref<CalculatorModel>({});

    const saveData = () => {
        CalculatorService.saveDataLocally(data.value);
        savedData.value = { ...data.value };
        status.value = PersistStatus.SAVED;
    };

    const loadData = () => {
        const loadedResult = CalculatorService.loadLocalData();

        if (loadedResult) {
            data.value = loadedResult;
            savedData.value = { ...loadedResult };
            status.value = PersistStatus.LOADED;
        }
    };

    return {
        loadData,
        saveData,
        savedData
    };
};

export default useLocalPersist;
