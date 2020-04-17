import CalculatorService from '@/modules/calculator/calculator-service';
import { CalculatorModel } from '@/modules/calculator/types/calculator-model';
import { Ref, ref } from '@vue/composition-api';
import { PersistStatus } from './use-persist';

const useLocalPersist = (status: Ref<PersistStatus>) => {
    const savedData = ref<CalculatorModel>({});

    const saveData = (data: CalculatorModel) => {
        CalculatorService.saveDataLocally(data);
        savedData.value = { ...data };
        status.value = PersistStatus.SAVED;
    };

    const loadData = () => {
        return CalculatorService.loadLocalData();
    };

    return {
        loadData,
        saveData,
        savedData
    };
};

export default useLocalPersist;
