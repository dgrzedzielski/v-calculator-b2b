import NumberUtils from '@/core/utils/number-utils';
import { CalculatorModel, BaseCalculatorFormModel } from '@/modules/calculator/types/calculator-model';
import User from '../auth/types/user';
import { db } from '@/core/lib/firebase';
import { DbCollection, UserDataCollection } from '@/core/types/db-collections';

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

    static loadLocalData(): CalculatorModel | null {
        const result = localStorage.getItem(CalculatorService.getCurrentMonthKey());

        if (result) {
            return JSON.parse(result);
        }

        return null;
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
                .collection(UserDataCollection.SAVED_CALCULTIONS)
                .doc('default')
                .set(payload);
        } catch (e) {
            return e;
        }
    }

    static async loadDefaultData(user: User): Promise<BaseCalculatorFormModel | undefined> {
        const ref = db.collection(DbCollection.USER_DATA);

        try {
            const doc = await ref
                .doc(user.uid)
                .collection(UserDataCollection.SAVED_CALCULTIONS)
                .doc('default')
                .get();

            if (doc.exists) {
                return doc.data() as BaseCalculatorFormModel;
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
                .collection(UserDataCollection.SAVED_CALCULTIONS)
                .doc(saveKey)
                .set(payload);
        } catch (e) {
            return e;
        }
    }

    static async loadData(savedKey: string, user: User): Promise<CalculatorModel | undefined> {
        const ref = db.collection(DbCollection.USER_DATA);

        try {
            const doc = await ref
                .doc(user.uid)
                .collection(UserDataCollection.SAVED_CALCULTIONS)
                .doc(savedKey)
                .get();

            if (doc.exists) {
                return doc.data() as CalculatorModel;
            } else {
                const defaultData = await CalculatorService.loadDefaultData(user);

                if (defaultData) {
                    return { ...defaultData, expenses: [] };
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default CalculatorService;
