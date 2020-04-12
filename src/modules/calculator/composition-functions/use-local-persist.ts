import CalculatorService from '@/modules/calculator/calculator-service';
import Vue from 'vue';
import { CalculatorModel } from '@/modules/calculator/types/calculator-model';
import { Ref } from '@vue/composition-api';

const useLocalPersist = (data: Ref<CalculatorModel>) => {
    const saveData = () => {
        CalculatorService.save(data.value);
        Vue.$toast.success('Zapisano pomyślnie');
    };

    const loadData = () => {
        const loadedResult = CalculatorService.load();

        if (loadedResult) {
            data.value = loadedResult;
        }
    };

    return {
        loadData,
        saveData
    };
};

export default useLocalPersist;
