import NumberUtils from '@/core/utils/number-utils';
import {
    CalculatorModel,
    BaseCalculatorFormModel,
    BillingPeriod,
} from '@/modules/calculator/types/calculator-model';
import { db } from '@/core/lib/firebase';
import { DbCollection, UserDataCollection } from '@/core/types/db-collections';
import { useCalculatorStore } from '@/modules/calculator/calculator-store';
import { User } from '../auth/types/user';

class CalculatorService {
    static get defaultBillingPeriod(): BillingPeriod {
        const date = new Date();

        return {
            month: NumberUtils.as2Digits(date.getMonth() + 1),
            year: date.getFullYear().toString(),
        };
    }

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

    static async saveDefaultData(
        payload: BaseCalculatorFormModel,
        user: User | null
    ): Promise<Error | undefined> {
        const ref = db.collection(DbCollection.USER_DATA);

        if (!user) return new Error('Brak zalogowanego użytkownika');

        try {
            await ref.doc(user.uid).set({ defaultPreset: payload });
        } catch (e) {
            return e;
        }
    }

    static async loadDefaultData(
        user: User
    ): Promise<BaseCalculatorFormModel | undefined> {
        const ref = db.collection(DbCollection.USER_DATA);

        try {
            const doc = await ref.doc(user.uid).get();

            if (doc.exists) {
                const data = doc.data();
                return data?.defaultPreset as BaseCalculatorFormModel;
            }
        } catch (e) {
            console.log(e);
        }
    }

    static async saveData(payload: CalculatorModel, id: string, user: User) {
        const ref = db.collection(DbCollection.USER_DATA);

        try {
            await ref
                .doc(user.uid)
                .collection(UserDataCollection.SAVED_CALCULATIONS)
                .doc(id)
                .set(payload);
        } catch (e) {
            return e;
        }
    }

    static async loadData(
        user: User,
        id: string
    ): Promise<CalculatorModel | BaseCalculatorFormModel | undefined> {
        const ref = db.collection(DbCollection.USER_DATA);

        try {
            const doc = await ref
                .doc(user.uid)
                .collection(UserDataCollection.SAVED_CALCULATIONS)
                .doc(id)
                .get();

            if (doc.exists) {
                return doc.data() as CalculatorModel;
            }

            return await CalculatorService.loadDefaultData(user);
        } catch (e) {
            console.log(e);
        }
    }
}

export default CalculatorService;
