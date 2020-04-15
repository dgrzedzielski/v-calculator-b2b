import isEqual from 'lodash.isequal';
import { Ref, ref } from '@vue/composition-api';
import { CalculatorModel } from '../types/calculator-model';
import CalculatorService from '../calculator-service';
import User from '@/modules/auth/types/user';
import { PersistStatus } from './use-persist';

export const useDbPersist = (data: Ref<CalculatorModel>, status: Ref<PersistStatus>) => {
    const savedData = ref<CalculatorModel>({});
    const saveKey = ref<string>(CalculatorService.getCurrentMonthKey());

    const saveData = async (user: User) => {
        if (isEqual(data.value, savedData.value)) {
            if (status.value === PersistStatus.WILL_SAVE) status.value = PersistStatus.SAVED;
            return;
        }

        status.value = PersistStatus.SAVING;
        await CalculatorService.saveData(data.value, saveKey.value, user);
        savedData.value = data.value;
        status.value = PersistStatus.SAVED;
    };

    const loadData = async (user: User) => {
        status.value = PersistStatus.LOADING;
        const loadedResult = await CalculatorService.loadData(saveKey.value, user);

        if (loadedResult) {
            data.value = { ...loadedResult };
            savedData.value = { ...loadedResult };
        }
        status.value = PersistStatus.LOADED;
    };

    return {
        loadData,
        saveData,
        saveKey,
        savedData,
        status
    };
};
