import isEqual from 'lodash.isequal';
import debounce from 'debounce';
import {
    Ref,
    onMounted,
    ref,
    watch,
    computed,
    onBeforeUnmount,
} from '@vue/composition-api';
import { User } from '@/modules/auth/types/user';
import { BaseCalculatorFormModel } from './../types/calculator-model';
import { useLocalPersist } from './use-local-persist';
import { useDbPersist } from './use-db-persist';
import { CalculatorModel } from '../types/calculator-model';
import CalculatorData from '../calculator-data';

export enum PersistStatus {
    LOADING = 'loading',
    LOADED = 'loaded',
    SAVING = 'saving',
    SAVED = 'saved',
    WILL_SAVE = 'will-save',
    ERROR = 'error',
    NOTHING_TO_LOAD = 'nothing-to-load',
}

export const usePersist = (
    data: CalculatorData,
    loggedUser: Ref<Readonly<User | null>>
) => {
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
        get: () =>
            loggedUser.value ? dbSavedData.value : localSavedData.value,
        set: (newValue: CalculatorModel | BaseCalculatorFormModel | null) => {
            if (loggedUser.value) {
                dbSavedData.value = newValue;
            } else {
                localSavedData.value = newValue as CalculatorModel | null;
            }
        },
    });

    const loadData = async () => {
        status.value = PersistStatus.LOADING;

        const loadedResult = loggedUser.value
            ? await loadDbData(data, loggedUser.value)
            : loadLocalData(data);

        if (loadedResult) {
            savedData.value = loadedResult;
            status.value = PersistStatus.LOADED;
        } else {
            status.value = PersistStatus.NOTHING_TO_LOAD;
        }
    };

    const saveData = () => {
        if (loggedUser.value) {
            saveDataToDb(data.value, data.id, loggedUser.value);
        } else {
            saveDataLocally(data.value);
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
        stopHandle = watch([data.formRef, data.expensesRef], handleDataChange, {
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
