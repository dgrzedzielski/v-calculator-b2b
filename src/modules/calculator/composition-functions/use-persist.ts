import debounce from 'debounce';
import useLocalPersist from './use-local-persist';
import { useDbPersist } from './use-db-persist';
import { Ref, onMounted, ref, watch, computed } from '@vue/composition-api';
import { CalculatorModel } from '../types/calculator-model';
import User from '@/modules/auth/types/user';
import isEqual from 'lodash.isequal';

export enum PersistStatus {
    LOADING = 'loading',
    LOADED = 'loaded',
    SAVING = 'saving',
    SAVED = 'saved',
    WILL_SAVE = 'will-save',
    ERROR = 'error',
    NOTHING_TO_LOAD = 'nothing-to-load'
}

export const usePersist = (data: Ref<CalculatorModel>, loggedUser: Ref<Readonly<User | null>>) => {
    const status = ref<PersistStatus>(PersistStatus.LOADING);

    const {
        loadData: loadLocalData,
        saveData: saveDataLocally,
        savedData: localSavedData
    } = useLocalPersist(status);

    const {
        loadData: loadDbData,
        saveData: saveDataToDb,
        saveKey: dataSaveKey,
        savedData: dbSavedData,
    } = useDbPersist(status);

    const savedData = computed<CalculatorModel>({
        get: () => loggedUser.value ? dbSavedData.value : localSavedData.value,
        set: (newValue: CalculatorModel) => {
            if (loggedUser.value) {
                dbSavedData.value = newValue;
            } else {
                localSavedData.value = newValue;
            }
        }
    });

    const loadData = async () => {
        status.value = PersistStatus.LOADING;

        const loadedResult = loggedUser.value
            ? await loadDbData(loggedUser.value)
            : loadLocalData();

        if (loadedResult) {
            data.value = { ...loadedResult };
            savedData.value = { ...loadedResult };
            status.value = PersistStatus.LOADED;
        } else {
            status.value = PersistStatus.NOTHING_TO_LOAD;
        }
    };

    const saveData = () => {
        if (loggedUser.value) {
            saveDataToDb(data.value, loggedUser.value);
        } else {
            saveDataLocally(data.value);
        }
    };

    const debouncedSave = debounce(saveData, 2000);

    const handleDataChange = () => {
        if (isEqual(data.value, savedData.value)) {
            if (status.value === PersistStatus.WILL_SAVE) status.value = PersistStatus.SAVED;
            return;
        }

        status.value = PersistStatus.WILL_SAVE;
        debouncedSave();
    };

    watch(data, handleDataChange, { lazy: true });

    onMounted(() => {
        loadData();
    });

    return {
        status,
        savedData,
        loadData,
        saveData,
        dataSaveKey,
        debouncedSave
    };
};
