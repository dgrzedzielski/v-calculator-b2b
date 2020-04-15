import { auth } from '@/core/lib/firebase';

class AuthService {
    static async login(email: string, password: string) {
        await auth.signInWithEmailAndPassword(email, password);
    }

    static async register(email: string, password: string) {
        await auth.createUserWithEmailAndPassword(email, password);
    }

    static async logout() {
        await auth.signOut();
    }
}

export default AuthService;
