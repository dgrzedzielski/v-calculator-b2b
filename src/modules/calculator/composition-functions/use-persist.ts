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
    ERROR = 'error'
}

export const usePersist = (data: Ref<CalculatorModel>, loggedUser: Ref<Readonly<User | null>>) => {
    const status = ref<PersistStatus>(PersistStatus.LOADING);

    const {
        loadData: loadLocalData,
        saveData: saveDataLocally,
        savedData: localSavedData
    } = useLocalPersist(data, status);

    const {
        loadData: loadDbData,
        saveData: saveDataToDb,
        saveKey: dataSaveKey,
        savedData: dbSavedData,
    } = useDbPersist(data, status);

    const savedData = computed(() => {
        if (loggedUser.value) {
            return dbSavedData.value;
        }

        return localSavedData.value;
    });

    const loadData = async () => {
        if (loggedUser.value) {
            await loadDbData(loggedUser.value);
        } else {
            loadLocalData();
        }
    };

    const saveData = () => {
        if (loggedUser.value) {
            saveDataToDb(loggedUser.value);
        } else {
            saveDataLocally();
        }
    };

    const debouncedSave = debounce(saveData, 2000);

    const handleDataChange = () => {
        console.log({ data: data.value, savedData: savedData.value });
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
