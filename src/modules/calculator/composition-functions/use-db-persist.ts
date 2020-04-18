import { BaseCalculatorFormModel } from './../types/calculator-model';
import isEqual from 'lodash.isequal';
import { Ref, ref } from '@vue/composition-api';
import { CalculatorModel } from '../types/calculator-model';
import CalculatorService from '../calculator-service';
import { User } from '@/modules/auth/types/user';
import { PersistStatus } from './use-persist';
import CalculatorData from '../calculator-data';

export const useDbPersist = (status: Ref<PersistStatus>) => {
    const savedData = ref<CalculatorModel | BaseCalculatorFormModel | null>(null);

    const saveData = async (data: CalculatorModel, id: string, user: User) => {
        status.value = PersistStatus.SAVING;
        await CalculatorService.saveData(data, id, user);
        savedData.value = data;
        status.value = PersistStatus.SAVED;
    };

    const loadData = async (data: CalculatorData, user: User) => {
        return CalculatorService.loadData(data, user);
    };

    return {
        loadData,
        saveData,
        savedData,
        status
    };
};
