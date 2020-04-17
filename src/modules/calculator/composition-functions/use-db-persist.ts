import isEqual from 'lodash.isequal';
import { Ref, ref } from '@vue/composition-api';
import { CalculatorModel } from '../types/calculator-model';
import CalculatorService from '../calculator-service';
import User from '@/modules/auth/types/user';
import { PersistStatus } from './use-persist';

export const useDbPersist = (status: Ref<PersistStatus>) => {
    const savedData = ref<CalculatorModel>({});
    const saveKey = ref<string>(CalculatorService.getCurrentMonthKey());

    const saveData = async (data: CalculatorModel, user: User) => {
        if (isEqual(data, savedData.value)) {
            if (status.value === PersistStatus.WILL_SAVE) status.value = PersistStatus.SAVED;
            return;
        }

        status.value = PersistStatus.SAVING;
        await CalculatorService.saveData(data, saveKey.value, user);
        savedData.value = data;
        status.value = PersistStatus.SAVED;
    };

    const loadData = async (user: User) => {
        return CalculatorService.loadData(saveKey.value, user);
    };

    return {
        loadData,
        saveData,
        saveKey,
        savedData,
        status
    };
};
