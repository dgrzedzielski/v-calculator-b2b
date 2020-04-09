import { auth, db } from '@/core/lib/firebase';
import { BaseCalculatorFormModel } from '@/modules/calculator/types/calculator-model';
import DbCollection from '@/core/types/db-collections';
import User from '@/modules/auth/types/user';

class AuthService {
    static async login(email: string, password: string) {
        await auth.signInWithEmailAndPassword(email, password);
    }

    static async register(email: string, password: string) {
        await auth.createUserWithEmailAndPassword(email, password);
    }

    static async updateSettings(payload: BaseCalculatorFormModel, user: User | null): Promise<Error | undefined> {
        const settingsRef = db.collection(DbCollection.USER_SETTINGS);

        if (!user) return new Error('Brak zalogowanego użytkownika');

        try {
            await settingsRef.doc(user.uid).set(payload);
        } catch (e) {
            return e;
        }
    }

    static async fetchSettings(user: User): Promise<BaseCalculatorFormModel | undefined> {
        const settingsRef = db.collection(DbCollection.USER_SETTINGS);

        try {
            const doc = await settingsRef.doc(user.uid).get();

            if (doc.exists) {
                return doc.data() as (BaseCalculatorFormModel | undefined);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default AuthService;
