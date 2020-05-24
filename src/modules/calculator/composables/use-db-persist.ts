import { BaseCalculatorFormModel } from './../types/calculator-model';
import isEqual from 'lodash.isequal';
import { Ref, ref } from '@vue/composition-api';
import { CalculatorModel } from '../types/calculator-model';
import CalculatorService from '../calculator-service';
import { User } from '@/modules/auth/types/user';
import { PersistStatus } from './use-persist';
import CalculatorData from '../calculator-data';
import { useCalculatorStore } from '@/modules/calculator/calculator-store';

export const useDbPersist = (status: Ref<PersistStatus>) => {
    const { data, id } = useCalculatorStore();
    const savedData = ref<CalculatorModel | BaseCalculatorFormModel | null>(
        null
    );

    const saveData = async (user: User) => {
        status.value = PersistStatus.SAVING;
        await CalculatorService.saveData(data.value, id.value, user);
        savedData.value = data.value;
        status.value = PersistStatus.SAVED;
    };

    const loadData = async (user: User) => {
        return CalculatorService.loadData(user);
    };

    return {
        loadData,
        saveData,
        savedData,
        status,
    };
};
