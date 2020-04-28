import NumberUtils from '@/core/utils/number-utils';
import { CalculatorModel, BaseCalculatorFormModel } from '@/modules/calculator/types/calculator-model';
import { User } from '../auth/types/user';
import { db } from '@/core/lib/firebase';
import { DbCollection, UserDataCollection } from '@/core/types/db-collections';
import CalculatorData from './calculator-data';

class CalculatorService {
    static getSaveKey(month: string, year: number): string {
        return `${month}.${year}`;
    }

    static getCurrentMonthKey(): string {
        const date = new Date();

        return CalculatorService.getSaveKey(
            NumberUtils.as2Digits(date.getMonth() + 1),
            date.getFullYear()
        );
    }

    static saveDataLocally(data: CalculatorModel) {
        localStorage.setItem(
            CalculatorService.getCurrentMonthKey(),
            JSON.stringify(data)
        );
    };

    static loadLocalData(): CalculatorModel | undefined {
        const result = localStorage.getItem(CalculatorService.getCurrentMonthKey());

        if (result) {
            return JSON.parse(result);
        }
    }

    static async saveDefaultData(
        payload: BaseCalculatorFormModel,
        user: User | null
    ): Promise<Error | undefined> {
        const ref = db.collection(DbCollection.USER_DATA);

        if (!user) return new Error('Brak zalogowanego użytkownika');

        try {
            await ref
                .doc(user.uid)
                .set({ defaultPreset: payload });
        } catch (e) {
            return e;
        }
    }

    static async loadDefaultData(user: User): Promise<BaseCalculatorFormModel | undefined> {
        const ref = db.collection(DbCollection.USER_DATA);

        try {
            const doc = await ref
                .doc(user.uid)
                .get();

            if (doc.exists) {
                const data = doc.data();
                return data?.defaultPreset as BaseCalculatorFormModel;
            }
        } catch (e) {
            console.log(e);
        }
    }

    static async saveData(payload: CalculatorModel, saveKey: string, user: User) {
        const ref = db.collection(DbCollection.USER_DATA);

        try {
            await ref
                .doc(user.uid)
                .collection(UserDataCollection.SAVED_CALCULATIONS)
                .doc(saveKey)
                .set(payload);
        } catch (e) {
            return e;
        }
    }

    static async loadData(data: CalculatorData, user: User): Promise<CalculatorModel | BaseCalculatorFormModel | undefined> {
        const ref = db.collection(DbCollection.USER_DATA);

        try {
            const doc = await ref
                .doc(user.uid)
                .collection(UserDataCollection.SAVED_CALCULATIONS)
                .doc(data.id)
                .get();

            if (doc.exists) {
                const result = doc.data() as CalculatorModel;
                data.value = result;
                return result;
            } else {
                const defaultData = await CalculatorService.loadDefaultData(user);

                if (defaultData) {
                    data.form = defaultData;
                    return defaultData;
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default CalculatorService;
