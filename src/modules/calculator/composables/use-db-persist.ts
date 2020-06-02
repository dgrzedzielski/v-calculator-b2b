import { Ref, ref } from '@vue/composition-api';
import { User } from '@/modules/auth/types/user';
import {
    BaseCalculatorFormModel,
    CalculatorModel,
} from '../types/calculator-model';
import CalculatorService from '../calculator-service';
import { PersistStatus } from './use-persist';

export const useDbPersist = (status: Ref<PersistStatus>) => {
    const savedData = ref<CalculatorModel | BaseCalculatorFormModel | null>(
        null
    );

    const saveData = async (data: CalculatorModel, id: string, user: User) => {
        status.value = PersistStatus.SAVING;
        await CalculatorService.saveData(data, id, user);
        savedData.value = { ...data };
        status.value = PersistStatus.SAVED;
    };

    const loadData = async (user: User, id: string) => {
        return CalculatorService.loadData(user, id);
    };

    return {
        loadData,
        saveData,
        savedData,
        status,
    };
};
