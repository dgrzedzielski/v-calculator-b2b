import isEqual from 'lodash.isequal';
import debounce from 'debounce';
import {
    onMounted,
    ref,
    watch,
    computed,
    onBeforeUnmount,
} from '@vue/composition-api';
import { BaseCalculatorFormModel } from './../types/calculator-model';
import { useLocalPersist } from './use-local-persist';
import { useDbPersist } from './use-db-persist';
import { CalculatorModel } from '../types/calculator-model';
import { useCalculatorStore } from '@/modules/calculator/use-calculator-store';
import { useAuthStore } from '@/modules/auth/auth-store';

export enum PersistStatus {
    LOADING = 'loading',
    LOADED = 'loaded',
    SAVING = 'saving',
    SAVED = 'saved',
    WILL_SAVE = 'will-save',
    ERROR = 'error',
    NOTHING_TO_LOAD = 'nothing-to-load',
}

export const usePersist = () => {
    const { user } = useAuthStore();
    const { data, form, expenses } = useCalculatorStore();
    const status = ref<PersistStatus>(PersistStatus.LOADING);

    const {
        loadData: loadLocalData,
        saveData: saveDataLocally,
        savedData: localSavedData,
    } = useLocalPersist(status);

    const {
        loadData: loadDbData,
        saveData: saveDataToDb,
        savedData: dbSavedData,
    } = useDbPersist(status);

    const savedData = computed<
        CalculatorModel | BaseCalculatorFormModel | null
    >({
        get: () => (user.value ? dbSavedData.value : localSavedData.value),
        set: (newValue: CalculatorModel | BaseCalculatorFormModel | null) => {
            if (user.value) {
                dbSavedData.value = newValue;
            } else {
                localSavedData.value = newValue as CalculatorModel | null;
            }
        },
    });

    const loadData = async () => {
        status.value = PersistStatus.LOADING;

        const loadedResult = user.value
            ? await loadDbData(user.value)
            : loadLocalData();

        if (loadedResult) {
            savedData.value = loadedResult;
            status.value = PersistStatus.LOADED;
        } else {
            status.value = PersistStatus.NOTHING_TO_LOAD;
        }
    };

    const saveData = () => {
        if (user.value) {
            saveDataToDb(user.value);
        } else {
            saveDataLocally();
        }
    };

    const debouncedSave = debounce(saveData, 2000);

    const handleDataChange = () => {
        if (isEqual(data.value, savedData.value)) {
            if (status.value === PersistStatus.WILL_SAVE)
                status.value = PersistStatus.SAVED;
            debouncedSave.clear();
        } else {
            status.value = PersistStatus.WILL_SAVE;
            debouncedSave();
        }
    };

    let stopHandle: () => void;

    onMounted(async () => {
        await loadData();
        stopHandle = watch([form, expenses], handleDataChange, {
            lazy: true,
        });
    });

    onBeforeUnmount(() => void stopHandle());

    return {
        status,
        savedData,
        loadData,
        saveData,
        debouncedSave,
    };
};
